import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth} from '@/firebase/firebase'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({...prev, type}))
    }
    const [inputs, setInputs] = useState({email: "", password: ""});


    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,] = useSignInWithEmailAndPassword(auth);
    
    
    const router = useRouter();
    
    const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return toast.error("Please fill in all fields", {position: "top-center", autoClose: 3000, theme: "dark"});

        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser) return;
            router.push("/")
        } catch (error: any) {
            toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
        }
    }    

    useEffect(() => {
        if (error) toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
    }, [error]);
    
    console.log(user, "user")

    return (
        <form action="" className='space-y-6 px-6 py-4' onSubmit={handleLogin}>
            <h3 className='text-xl font-medium text-white'>Sign into 1337Clone</h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Email
                </label>
                <input onChange={onHandleInputChange} type="email" name='email' id='email' placeholder='name@domain.com' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Password
                </label>
                <input onChange={onHandleInputChange} type="password" name='password' id='password' placeholder='Password' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
                {loading ? "Loading" : "Login"}
            </button>
            <button className='flex w-full justify-end'>
                <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'
                onClick={() => handleClick("forgotPassword")}
                >
                    Forgot Password?
                </a>
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Not Registered?{" "}
                <a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick("register")}>
                    Create account
                </a>
            </div>
            <div className='text-sm font-medium text-gray-300'>
                Or try logging in with a demo account! {" "}
                <a href='#' className='text-blue-700 hover:underline'>
                    Demo Login
                </a>
            </div>
        </form>
    )
}
export default Login;