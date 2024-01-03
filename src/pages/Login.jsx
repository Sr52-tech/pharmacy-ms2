import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, removeUser, selectUserRole } from "../redux/pharmacySlice";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, doc, query, where } from "firebase/firestore";
import { db } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userEmail = user.email;
    
            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', userEmail)));
    
            if (querySnapshot.docs.length === 0) {
                // User not found in the database, add them
                const userData = {
                    uid: user.uid,
                    email: userEmail,
                    name: user.displayName || '',
                    image: user.photoURL || '',
                    phone: user.phoneNumber || '',
                    Role: 'user',
                };
    
                await addDoc(usersCollectionRef, userData);
                dispatch(addUser(userData));
            } else {
                // User found in the database
                const currentUserData = querySnapshot.docs[0].data();
                const userData = {
                    uid: user.uid,
                    email: userEmail,
                    name: user.displayName || '',
                    image: user.photoURL || '',
                    phone: user.phoneNumber || '',
                    Role: currentUserData?.Role || 'user',
                };
    
                dispatch(addUser(userData));
            }
                navigate('/');
        } catch (error) {
            console.error(error);
            // TODO: Add error handling for the specific error scenarios
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                toast.error('Incorrect email or user not registered.');
            }
        }
    };

    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            const userEmail = user.email;
    
            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', userEmail)));
            
                // User found in the database
                const currentUserData = querySnapshot.docs[0].data();
                const userData = {
                    uid: user.uid,
                    email: userEmail,
                    name: user.displayName || '',
                    image: user.photoURL || '',
                    phone: user.phoneNumber || '',
                    Role: currentUserData?.Role || 'user',
                }

            dispatch(addUser(userData));

            // Handle successful login
            console.log('User logged in:', user);
            toast.success('Login successful');
            
            // TODO: Add any additional logic you need after successful login
            navigate('/');
        } catch (error) {
            console.error(error);
            // TODO: Add error handling for the specific error scenarios
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                toast.error('Incorrect email or user not registered.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password.');
            } else {
                toast.error('Invalid Data Entered.');
            }
        }
    };


 const handleSignUp = async (e) => {
    navigate('/signup')
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h1>
            <form className="max-w-sm mx-auto">
                 {/* Email and password login */}
                 <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 p-2 border rounded-md w-full dark:bg-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 p-2 border rounded-md w-full dark:bg-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <button
                    onClick={handleEmailPasswordLogin}
                    type="button"
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block"
                    style={{ marginLeft: '35px', marginTop: '30px' }}
                >
                    Login
                </button>
                <button onClick={handleSignUp} type="button" className="text-white bg-[#323232] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-md text-sm px-10 py-0.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block" style={{ marginLeft: '35px', marginTop: '30px' }}>
                    {/* <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg> */}
                    SignUp instead?
                </button>
                </div>


                <button onClick={handleGoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block" style={{ marginLeft: '110px', marginTop: '30px' }}>
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg>
                    Login with Google
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