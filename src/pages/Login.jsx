//todo: add error message for incorrect password and email not registered
//todo: navigate to home page after login

// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase-config";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, removeUser, selectUserRole } from "../redux/pharmacySlice";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, doc, query, where } from "firebase/firestore";
import { db } from '../firebase-config';

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userEmail = user.email;



            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', userEmail)));
            const currentUserData = querySnapshot.docs[0].data();
            // Extract necessary fields from the Firebase user object
            const userData = {
                uid: user.uid,
                email: userEmail,
                name: user.displayName || '', // Use empty string if displayName is undefined
                image: user.photoURL || '', // Use empty string if photoURL is undefined
                phone: user.phoneNumber || '',
                Role: currentUserData?.Role
            };
            if (querySnapshot.docs.length === 0) {
                console.log('User Info:', userData);

                await addDoc(usersCollectionRef, {
                    email: userEmail,
                    name: userData.displayName,
                    image: userData.photoURL,
                    phone: userData.phoneNumber,
                    Role: 'user', // Assuming a default role for new users
                });

                dispatch(addUser(userData));
            } else {
                dispatch(addUser(userData));
            }

            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Signout successful')
            dispatch(removeUser())
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h1>
            <form className="max-w-sm mx-auto">

                <button onClick={handleGoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block" style={{ marginLeft: '35px', marginTop: '30px' }}>
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg>
                    Login with Google
                </button>

                <button onClick={handleSignout} type="button" className="text-white bg-[#323232] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block" style={{ marginLeft: '35px', marginTop: '30px' }}>
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg>
                    Signout with google
                </button>
            </form>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}