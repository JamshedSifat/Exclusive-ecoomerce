// src/Context/AuthProvider.jsx (Updated)
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase.init";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user role from Firestore
  const fetchUserRole = async (uid) => {
    try {
      console.log('🔍 Fetching role for user:', uid);
      
      if (!uid) return 'user';

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log('📄 User data:', userData);
        const role = userData.role || 'user';
        setUserRole(role);
        setIsAdmin(role === 'admin');
        return role;
      } else {
        console.log('⚠️ No user document found, creating one...');
        // Create default user document
        await setDoc(userRef, {
          email: user?.email || '',
          uid: uid,
          role: 'user',
          displayName: user?.displayName || 'User',
          createdAt: new Date().toISOString()
        });
        setUserRole('user');
        setIsAdmin(false);
        return 'user';
      }
    } catch (error) {
      console.error('❌ Error fetching user role:', error);
      return 'user';
    }
  };

  // Login
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserRole(result.user.uid);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const registerUser = async (email, password, additionalData = {}) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        uid: result.user.uid,
        role: additionalData.role || 'user',
        displayName: additionalData.displayName || '',
        phone: additionalData.phone || '',
        address: additionalData.address || '',
        createdAt: new Date().toISOString(),
        ...additionalData
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          uid: result.user.uid,
          role: 'user',
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: new Date().toISOString()
        });
      }
      
      await fetchUserRole(result.user.uid);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateUserProfile = async (updatedData) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, updatedData);
      
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, updatedData, { merge: true });
      }
      
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserRole(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Current User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserRole(currentUser.uid);
      } else {
        setUserRole(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    userRole,
    isAdmin,
    registerUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    fetchUserRole,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;