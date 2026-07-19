// src/utils/setupFirestore.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.init";
import { auth } from "../Firebase/Firebase.init";

// Function to create admin user in Firestore
export const setupAdminUser = async () => {
  const user = auth.currentUser;
  
  if (!user) {
    console.log('❌ Please login first');
    return false;
  }

  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      role: 'admin',
      displayName: user.displayName || 'Admin User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log('✅ Admin user created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    return false;
  }
};

// Function to check if Firestore is working
export const testFirestoreConnection = async () => {
  try {
    const { getDocs, collection } = await import('firebase/firestore');
    const snapshot = await getDocs(collection(db, 'users'));
    console.log('✅ Firestore connection successful! Users count:', snapshot.size);
    return true;
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    return false;
  }
};