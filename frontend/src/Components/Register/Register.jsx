import React, { useState } from 'react';
import { Typography, Button, InputAdornment, IconButton, Avatar } from '@mui/material';
import { Visibility, VisibilityOff, AddAPhoto } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../Actions/User';

const Register = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error } = useSelector((state) => state.user)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(RegisterUser(name, email, password, avatar))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const Reader = new FileReader();
            Reader.onload = () => {
                if (Reader.readyState === 2) {
                    setAvatar(Reader.result);
                }
            };
            Reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Typography variant="h3" component="h2" className="mt-6 text-center text-3xl font-extrabold text-white">
                    SocioGram
                </Typography>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="flex justify-center">
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="avatar-input"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="avatar-input">
                                <Avatar
                                    src={avatar}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        cursor: 'pointer',
                                        bgcolor: 'gray.700',
                                        color: 'white',
                                        '&:hover': {
                                            opacity: 0.8,
                                        },
                                    }}
                                >
                                    {!avatar && <AddAPhoto />}
                                </Avatar>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        size="small"
                                        sx={{ color: 'gray.400' }}
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    bgcolor: 'indigo.600',
                                    '&:hover': {
                                        bgcolor: 'indigo.700',
                                    },
                                }}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 text-gray-400">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm text-center">
                                <Link to="/" className="font-medium text-indigo-400 hover:text-indigo-300">
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register