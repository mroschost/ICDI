import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, query, limit, getDocsFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

console.log('Initializing Firebase with Project ID:', firebaseConfig.projectId);
console.log('Using Firestore Database ID:', firebaseConfig.firestoreDatabaseId || '(default)');

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

async function testConnection() {
  try {
    console.log('Testing Firestore connection to collection "projects"...');
    const q = query(collection(db, 'projects'), limit(1));
    await getDocsFromServer(q);
    console.log('Firestore connection test: SUCCESS');
  } catch (error) {
    console.error("Firestore connection test: FAILED");
    if(error instanceof Error) {
      console.error("Error details:", error.message);
      if (error.message.includes('permission-denied')) {
        console.error("Permission denied. Check firestore.rules.");
      }
    }
  }
}
testConnection();
