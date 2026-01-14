import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { User, Shield, ArrowRight, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState<string | null>(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  // ---------- Validation ----------
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRules = useMemo(() => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
  }, [password]);

  const passwordScore = Object.values(passwordRules).filter(Boolean).length;

  const passwordStrength =
    passwordScore <= 1
      ? "Weak"
      : passwordScore <= 3
      ? "Medium"
      : "Strong";

  const canRegister =
    name.trim().length > 1 &&
    emailValid &&
    passwordScore === 4;

  // ---------- Handlers ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Invalid credentials.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRegister) return;
    setError(null);

    try {
      await register(email.trim(), password, name.trim());
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  // ✅ FIXED DEMO LOGIN (uses real Firebase users)
  const handleQuickLogin = async (role: "user" | "admin") => {
    setError(null);

    const demoEmail =
      role === "admin"
        ? "admin@xaibank.com"
        : "user@xaibank.com";

    // 🔴 Use the EXACT password you set in Firebase Auth
    const demoPassword = "REPLACE_WITH_REAL_PASSWORD";

    try {
      await login(demoEmail.trim(), demoPassword);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Demo login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl hero-gradient flex items-center justify-center">
                <span className="text-gold font-heading font-bold text-2xl">X</span>
              </div>
              <CardTitle className="font-heading text-2xl">
                {isRegister ? "Create your account" : "Welcome to XAI Bank"}
              </CardTitle>
              <CardDescription>
                {isRegister
                  ? "Secure registration with strong password protection"
                  : isDemo
                  ? "Quick demo access - choose a role below"
                  : "Sign in to access your personalized dashboard"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {!isRegister && (
                <>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Quick Demo Access
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={selectedRole === "user" ? "banking" : "outline"}
                        className="h-auto py-4 flex-col gap-2"
                        onClick={() => {
                          setSelectedRole("user");
                          handleQuickLogin("user");
                        }}
                      >
                        <User className="w-5 h-5" />
                        User Demo
                      </Button>

                      <Button
                        variant={selectedRole === "admin" ? "banking" : "outline"}
                        className="h-auto py-4 flex-col gap-2"
                        onClick={() => {
                          setSelectedRole("admin");
                          handleQuickLogin("admin");
                        }}
                      >
                        <Shield className="w-5 h-5" />
                        Admin Demo
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </>
              )}

              <form
                onSubmit={isRegister ? handleRegister : handleLogin}
                className="space-y-4"
              >
                {isRegister && (
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {isRegister && !emailValid && email && (
                    <p className="text-xs text-red-500">
                      Enter a valid email address
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />

                  {isRegister && password && (
                    <div className="space-y-1 text-xs">
                      <p>
                        Password strength: <b>{passwordStrength}</b>
                      </p>
                      <ul className="grid grid-cols-2 gap-x-2">
                        <li>• 8+ chars</li>
                        <li>• Uppercase</li>
                        <li>• Lowercase</li>
                        <li>• Number</li>
                      </ul>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isRegister && !canRegister}
                  variant={isRegister ? "banking" : "gold"}
                >
                  {isRegister ? "Create Account" : "Sign In"}
                  {isRegister ? (
                    <UserPlus className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </form>

              <p className="text-sm text-center text-muted-foreground">
                {isRegister ? "Already have an account?" : "New here?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="font-medium text-primary hover:underline"
                >
                  {isRegister ? "Sign in" : "Create an account"}
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
