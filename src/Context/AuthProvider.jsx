
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({Children}) => {

    const registerUser =(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const authInfo ={
        registerUser,
        signInUser,
    }
    return (
        <AuthContext value={authInfo}>
            {Children}
        </AuthContext>
    );
};

export default AuthProvider;