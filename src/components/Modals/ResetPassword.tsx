import React, {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import {toast} from 'react-toastify';

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleReset = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await sendPasswordResetEmail(email);
        console.log(success);
        if (success) {
            toast.success('Password reset email sent!', {position: "top-center", autoClose: 3000, theme: "dark"});
        }
    }

    useEffect(() => {
        console.log('error', error)
        if (error) {
            toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
        }
    }, [error])
    

    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, type: "login"}))
    }

    return (
        <form action="" className='space-y-6 px-6 py-4' onSubmit={handleReset}>
            <h3 className='text-xl font-medium text-white'>Reset Password</h3>
            <p className='text-sm text-white'>Forgotten your password? Enter your email, and we will send you an email allowing you to reset it.</p>
            <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Email
                </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' placeholder='name@domain.com' className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' />
            </div>
            <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
                Reset Password
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Or try logging in again! {" "}
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
export default ResetPassword;