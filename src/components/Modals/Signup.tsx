import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth} from "@/firebase/firebase";
import { useRouter } from 'next/router';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, type: "login"}))
    }

    const [inputs, setInputs] = useState({email: '', username: '', password: ''})
    const router = useRouter();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputs.email || !inputs.password || !inputs.username) return alert("Please fill all fields.");
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;

            router.push('/')
        } catch (error: any) {
            alert(error.message);
        }

    }

    useEffect(() => {
        if (error) alert(error.message);
    }, [error]);

    return (
        <form action="" className='space-y-6 px-6 py-4' onSubmit={handleRegister}>
            <h3 className='text-xl font-medium text-white'>Register to 1337Clone</h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Email
                </label>
                <input onChange={handleChangeInput} type="email" name='email' id='email' placeholder='name@domain.com' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            <div>
                <label htmlFor='username' className='text-sm font-medium block mb-2 text-gray-300'>
                    Username
                </label>
                <input onChange={handleChangeInput} type="username" name='username' id='username' placeholder='Eren Jaeger' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Password
                </label>
                <input onChange={handleChangeInput} type="password" name='password' id='password' placeholder='Password' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            {/* <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Verify Password
                </label>
                <input onChange={handleChangeInput} type="password" name='password' id='verifyPassword' placeholder='Verify Password' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div> */}
            <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
                {loading ? "Registering..." : "Sign up!"}
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Already have an account? {" "}
                <a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
                    Log In
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
export default Signup;