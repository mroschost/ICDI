import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Lead } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const leadService = {
  async createLead(name: string, firstAnswer: { question: string, answer: string }) {
    const path = 'leads';
    try {
      const docRef = await addDoc(collection(db, path), {
        name,
        answers: [firstAnswer],
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return null;
    }
  },

  async updateLead(leadId: string, answers: { question: string, answer: string }[], completed: boolean = false) {
    const path = `leads/${leadId}`;
    try {
      const docRef = doc(db, 'leads', leadId);
      await updateDoc(docRef, {
        answers,
        completed,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      return false;
    }
  },

  getLeads(callback: (leads: Lead[]) => void) {
    const path = 'leads';
    const q = query(collection(db, path), orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const leads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      callback(leads);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  }
};
