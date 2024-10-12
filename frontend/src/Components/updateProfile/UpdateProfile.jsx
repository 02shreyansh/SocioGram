import React, { useEffect, useState } from 'react';
import { Typography, Button, Avatar } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { loadUser, UpdateUser } from '../../Actions/User';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.user);
    const { loading: updateLoading, error, message } = useSelector((state) => state.like);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        avatar: '',
        avatarPrev: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email,
                name: user.name,
                avatar: '',
                avatarPrev: user.avatar.url
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        await dispatch(UpdateUser(formData.name, formData.email, formData.avatar));
        dispatch(loadUser())
        navigate("/account");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const Reader = new FileReader();
            Reader.onload = () => {
                if (Reader.readyState === 2) {
                    setFormData(prev => ({
                        ...prev,
                        avatarPrev: Reader.result,
                        avatar: Reader.result
                    }));
                }
            };
            Reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return <Loader />;
    }

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
                                    src={formData.avatarPrev}
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
                                    {!formData.avatar && <AddAPhoto />}
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
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={updateLoading}
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
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;