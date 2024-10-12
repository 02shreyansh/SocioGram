import React, { useEffect, useState } from 'react';
import User from '../User/User';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPost } from '../../Actions/User';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors } from '../../Reducers/postOfFollowing';
import { clearErrors as clr, clearMessage } from '../../Reducers/Post/likeReducer';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, posts, error } = useSelector((state) => state.postOfFollowing);
    const { users, loading: usersLoading } = useSelector((state) => state.users);
    const { error: LikeError, message } = useSelector((state) => state.like);
    const { user: userLogin } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getFollowingPost());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (LikeError) {
            toast.error(LikeError);
            dispatch(clr());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [toast, error, message, dispatch, LikeError]);

    return loading === true || usersLoading === true ? (
        <Loader />
    ) : (
        <div className="min-h-screen pt-16 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                
                <div className="w-full md:w-2/3 ">
                    <div className="flex space-x-4 overflow-x-scroll no-scrollbar mb-6 mt-4">
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex-shrink-0"></div>
                    </div>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className={`flex bg-gradient-to-r from-[#fff5bc] to-[#cec1ff] flex-col items-center justify-center ${posts.length > 2 ? "overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300" : null} rounded-lg mb-6`}
                            >
                                <Post
                                    postId={post._id}
                                    caption={post.caption}
                                    postImage={post.image?.url} 
                                    likes={post.likes}
                                    comments={post.comments}
                                    ownerImage={post.owner?.avatar?.url} 
                                    OwnerId={post.owner?._id}
                                    ownerName={post.owner?.name}
                                />
                            </div>
                        ))
                    ) : (
                        <Typography className="text-center text-gray-500 mt-4">No Posts Yet</Typography>
                    )}
                </div>

        
                <div className="hidden md:block w-1/3">
                    <div className="bg-white border border-gray-300 rounded-lg p-4 sticky top-20">
                        <h2 className="font-bold text-gray-600 mb-4">Suggestions For You</h2>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <div key={user._id} className="flex flex-col justify-end  mb-2 mx-3">
                                    {user._id !== userLogin?._id ? ( 
                                        <div className="flex items-center justify-between w-full">
                                            <User
                                                userId={user._id}
                                                name={user.name}
                                                avatar={user.avatar?.url} 
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        ) : (
                            <Typography className="text-gray-500">No Suggestions</Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
