import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { Transaction } from '@/types/banking';

export const getTransactions = async (): Promise<Transaction[]> => {
  const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as Transaction[];
};
