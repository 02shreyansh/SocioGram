import React, { useState,  } from 'react';
import { Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux"
import {ForgotPassword as forgot} from "../../Actions/User"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const {error,loading,message}=useSelector((state)=>state.like)
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(forgot(email))
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#fff5bc] to-[#cec1ff] flex items-center justify-center p-4 sm:p-6 md:p-8 box-border">
            <form className="bg-white h-full w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-lg" onSubmit={submitHandler}>
                <Typography variant="h3" component="h2" className="py-4 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl">SocioGram</Typography>
                <Typography variant="h6" component="h2" className="py-4 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl text-green-700">{message}</Typography>
                

                <input 
                    type="email" 
                    placeholder='Enter Email'
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 mb-4 sm:mb-6 font-roboto text-sm sm:text-base outline-none"
                />
                

                

                <button disabled={loading} type='submit' className="w-full py-2 sm:py-3 rounded-full bg-blue-500 text-white font-bold text-sm sm:text-base cursor-pointer hover:bg-blue-600 transition-colors">
                    Send Mail
                </button>

                
            </form>
        </div>
    );
};

export default ForgotPassword;