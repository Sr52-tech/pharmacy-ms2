import { useState } from 'react';
import {auth, googleProvider} from '../../firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const Signup = () => {

    const [name, setSignedUpName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    
        if (!email) {
            setEmailError("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email address is invalid");
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    
        if (!password) {
            setPasswordError("Password is required");
        } else if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters long");
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError("Password should contain at least one uppercase letter");
        } else if (!/(.*[0-9]){3}/.test(password)) {
            setPasswordError("Password should contain at least three numbers");
        } else {
            setPasswordError('');
        }
    };

    const signUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password, name);
        } catch(err) {
            console.error(err.message);
        }
    };

    const signUpGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div style={{ marginTop: '80px' }}>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign Up</h1>
            <form className="max-w-sm mx-auto">

                {/* Name input */}
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input onChange={(e) => {setSignedUpName(e.target.value)}} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="James Bond" required/>

                </div>

                {/* Email input */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={(e) => { setEmail(e.target.value); handleEmailChange(e); }} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                    {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                </div>

                {/* Password input */}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value); handlePasswordChange(e); }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                </div>

                {/* Submit button */}
                <button onClick={signUp} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-20 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto block">Sign Up</button>

                {/* Login link */}
                <p className="text-center" style={{marginTop: '7px'}}>do you have an account? <a href="/login" className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">Login</a></p>

                {/* Google button */}
                <button onClick={signUpGoogle} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mx-auto block" style = {{marginLeft: '35px', marginTop: '30px'}}>
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                    </svg>
                    Sign up with Google
                </button>
                
            </form>
        </div>
    );
};

export default Signup;