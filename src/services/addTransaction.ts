import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export const addTransaction = async () => {
  await addDoc(collection(db, 'transactions'), {
    amount: 1200,
    type: 'debit',
    description: 'Grocery',
    category: 'groceries',
    date: Timestamp.now()
  });
};
