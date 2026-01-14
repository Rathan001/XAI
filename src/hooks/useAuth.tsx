import { useState, useEffect, createContext, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/types/banking";

interface AuthContextType {
  user: (UserProfile & { uid: string }) | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(UserProfile & { uid: string }) | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.warn("User document not found in Firestore");
          setUser(null);
          return;
        }

        const data = userSnap.data();

        const userProfile: UserProfile & { uid: string } = {
          id: firebaseUser.uid,          // internal id
          uid: firebaseUser.uid,         // compatibility fix ✅
          name: data.name ?? (data.role === "admin" ? "Admin User" : "User"),
          email: data.email,
          role: data.role,
          monthlyIncome: data.monthlyIncome ?? 75000,
          savingsGoal: data.savingsGoal ?? 15000,
          joinedAt: data.createdAt?.toDate?.() || new Date(),
        };

        setUser(userProfile);
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // -------- Login --------
  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);
      throw new Error("Access denied: User is not registered in the banking system.");
    }
  };

  // -------- Register --------
  const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user as FirebaseUser, {
      displayName: name,
    });

    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      name,
      email,
      role: "user",
      monthlyIncome: 75000,
      savingsGoal: 15000,
      createdAt: serverTimestamp(),
    });
  };

  // -------- Logout --------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
