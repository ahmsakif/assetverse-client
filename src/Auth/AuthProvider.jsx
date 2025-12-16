import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    // Create user with email and password 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

        // Sign in user with Email and Password 
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

        // Sign Out User
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

        // Update Profile Name + Photo 
    const updateUserProfile = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
    }
console.log("from auth provider ",user);
    // Forget password
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

        const authInfo = {
        user,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        forgetPassword,
        loading,
        setLoading,
    }


    return (
        <AuthContext value={(authInfo)}>
            {
                !loading 
                ? children
                : <span>Loading from AuthProvider</span>
            }
        </AuthContext>
    );
};

export default AuthProvider;