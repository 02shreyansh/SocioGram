import React, { useState,  } from 'react';
import { Typography, Button ,InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../../Actions/User';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {message}=useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
        setPassword("");
        setEmail("");
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#fff5bc] to-[#cec1ff] flex items-center justify-center p-4 sm:p-6 md:p-8 box-border">
            <form className="bg-white h-full w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-lg" onSubmit={loginHandler}>
                <Typography variant="h3" component="h2" className="py-4 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl">SocioGram</Typography>
                <Typography variant="h6" component="h2" className="py-4 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl text-red-900">{message}</Typography>

                <input 
                    type="email" 
                    placeholder='Enter Email'
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 mb-4 sm:mb-6 font-roboto text-sm sm:text-base outline-none"
                />
                <div className="relative w-full mb-4 sm:mb-6">
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Password' 
                        required 
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 font-roboto text-sm sm:text-base outline-none"
                    />
                    <InputAdornment position="end" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                    </InputAdornment>
                </div>

                <Link to="/forgot/password" className="self-end text-gray-500 no-underline mb-4 sm:mb-6 text-sm sm:text-base">
                    <Typography>Forgot Password</Typography>
                </Link>

                <button type='submit' className="w-full py-2 sm:py-3 rounded-full bg-blue-500 text-white font-bold text-sm sm:text-base cursor-pointer hover:bg-blue-600 transition-colors">
                    Login
                </button>

                <Link to="/register" className="mt-4 sm:mt-6 text-gray-500 no-underline text-sm sm:text-base">
                    <Typography>New User?</Typography>
                </Link>
            </form>
        </div>
    );
};

export default Login;