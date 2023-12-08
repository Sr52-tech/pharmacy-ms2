//todo: add error message for incorrect password and email not registered
//todo: navigate to home page after login

import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import React from "react";
import { useState } from "react";


export const Login = () => {
    const [email, setLoginEmail] = useState('');
    const [password, setLoginPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const Login = async (e) => {
        e.preventDefault();
        console.log('Attempting to log in');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
        } catch (err) {
            console.error('Login failed:', err.message);
            if (err.code === 'auth/user-not-found') {
                setErrorMessage('Email not registered');
                console.log('Email not registered');
            }
            if (err.code === 'auth/wrong-password') {
                setErrorMessage('Incorrect password');
                console.log('Incorrect password');
            }
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h1>
            <form className="max-w-sm mx-auto">

                {/* Email input */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={(e) => { setLoginEmail(e.target.value) }} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>

                {/* Password input */}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={(e) => { setLoginPassword(e.target.value) }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
                </div>


                {/* Submit button */}
                <button onClick={Login} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-20 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto block">Login</button>

                {/* Sign up link */}
                <p className="text-center" style={{ marginTop: '7px' }}>do not have an account? <a href="/signup" className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">Sign Up</a></p>

            </form>
        </div>
    );
}