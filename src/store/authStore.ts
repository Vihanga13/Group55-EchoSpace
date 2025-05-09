import { create } from 'zustand';
import { AuthState, Designer } from '../types';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>((set) => ({
  designer: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user document from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.warn('No user data found in Firestore');
        return false;
      }

      const userData = userDocSnap.data();

      set({
        designer: {
          id: user.uid,
          name: userData.name || '', // <- Fetches the `name` field from Firestore
          email: user.email ?? '',
          username: userData.username || '', // Optional
        } as Designer,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error('Firebase login error:', error);
      return false;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({
      designer: null,
      isAuthenticated: false,
    });
  },
}));
