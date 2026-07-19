// src/utils/createAdmin.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const createAdminAccount = async () => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "admin@exclusive.com",
      "admin123"
    );
    console.log("Admin account created:", userCredential.user);
    
    // Also save to Firestore with admin role
    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("../Firebase/Firebase.init");
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: "admin@exclusive.com",
      uid: userCredential.user.uid,
      role: "admin",
      displayName: "Admin User",
      createdAt: new Date().toISOString()
    });
    
    console.log("Admin role saved to Firestore");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

// Call this function once
createAdminAccount();