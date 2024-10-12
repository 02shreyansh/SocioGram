import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import {  followAndUnfollow, getUserPost, getUserProfile} from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post';
import { clearErrors as clr, clearMessage } from '../../Reducers/Post/likeReducer'
import { clearErrors } from "../../Reducers/Post/myPostReducer"
import { Avatar, Button, Typography } from '@mui/material';

import User from '../User/User';
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const dispatch = useDispatch()
    const { loading, error, userPosts } = useSelector((state) => state.userPost)
    const { error: LikeError, message } = useSelector((state) => state.like)
    const {user}=useSelector((state)=> state.userProfile)
    const { user:me } = useSelector((state) => state.user)
    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following,setFollowing]=useState(false)
    const [myProfile,setMyProfile]=useState(false)
    const params=useParams()
    const followHandler=async()=>{
        setFollowing(!following)
        await dispatch(followAndUnfollow(user._id))
        dispatch(getUserProfile(params.id))
    }
    useEffect(() => {
        dispatch(getUserPost(params.id))
        dispatch(getUserProfile(params.id))
    }, [dispatch, params.id])
    useEffect(() => {
        if (me && user) {
            setMyProfile(me._id === user._id)
            setFollowing(user.followers.some(follower => follower._id === me._id))
        }
        if(user){
            user.following.forEach((item)=>{
                if(item._id===me._id){
                    setFollowing(true)
                }else{
                    setFollowing(false)
                }
            })
        }
    }, [me, user])

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (LikeError) {
            toast.error(LikeError);
            dispatch(clr())
        }
        if (message) {
            toast.success(message)
            dispatch(clearMessage())
        }
    }, [toast, error, message, dispatch, LikeError])

    return (
        loading ? <Loader /> : (
            <div className='min-h-screen pt-16 px-4'>
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className="lg:w-1/3 order-first lg:order-last">
                        <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-20">
                            {user && (
                                <>
                                    <div className="flex items-center space-x-4 mb-6">
                                <Avatar src={user.avatar.url} className="h-16 w-16 rounded-full border border-gray-200" />
                                <div>
                                    <Typography variant="h6" className="font-semibold">{user.name}</Typography>
                                    <Typography variant="body2" className="text-gray-500">@{user.name}</Typography>
                                </div>
                                    </div>

                                    <div className="flex justify-between text-sm mb-6">
                                        <div className="text-center">
                                            <Typography variant="h6" className="font-semibold">{user.posts.length}</Typography>
                                            <Button variant="text" className="text-gray-500 hover:text-gray-900">posts</Button>
                                        </div>
                                        <div className="text-center">
                                            <Typography variant="h6" className="font-semibold">{user.followers.length}</Typography>
                                            <Button variant="text" onClick={() => setFollowersToggle(prev => !prev)} className="text-gray-500 hover:text-gray-900">followers</Button>
                                        </div>
                                        <div className="text-center">
                                            <Typography variant="h6" className="font-semibold">{user.following.length}</Typography>
                                            <Button variant="text" onClick={() => setFollowingToggle(prev => !prev)} className="text-gray-500 hover:text-gray-900">following</Button>
                                        </div>
                                    </div>
                                    {myProfile? null : (
                                        <div className="space-y-4">
                                        
                                            <Button
                                                onClick={followHandler}
                                                variant="text"
                                                className="w-full justify-start text-blue-500 hover:text-blue-600 transition-colors"
                                            >
                                                
                                                {
                                                    following ? "unfollow":"Follow"
                                                }
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 order-last lg:order-first">
                        {userPosts && userPosts.length > 0 ? userPosts.map((post,index) => (
                            
                            <div key={index} className="flex bg-gradient-to-r from-[#fff5bc] to-[#cec1ff] flex-col items-center justify-center rounded-lg mb-6">
                                {post!==null? (
                                    <Post
                                    postId={post._id}
                                    caption={post.caption}
                                    postImage={post.image.url}
                                    likes={post.likes}
                                    comments={post.comments}
                                    ownerImage={post.owner.avatar.url}
                                    OwnerId={post.owner._id}
                                    ownerName={post.owner.name}
                                    isUserProfile={myProfile?"Own":"userProfile"}
                                    
                                />
                                ):null}
                            </div>
                        )) : (
                            <Typography className="text-center text-gray-500 mt-4">No Posts Posted Yet</Typography>
                        )}
                    </div>
                </div>

                {followersToggle && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setFollowersToggle(false)}></div>
                        <div className="absolute inset-x-0 lg:bottom-10 md:bottom-10 bottom-20 transform transition-transform duration-300 ease-out max-h-[80vh] lg:max-w-[33vw] lg:left-[18vw] md:max-w-[33vw] md:left-[18vw] w-11/12 left-3 flex flex-col">
                            <div className={`bg-white rounded-t-2xl rounded-b-2xl shadow-xl transform transition-transform duration-300 ease-out flex-grow overflow-hidden ${followersToggle ? 'translate-y-0' : 'translate-y-full'}`}>
                                <div className="p-4 border-b border-gray-200">
                                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                    <h2 className="text-xl font-semibold text-center">Followers</h2>
                                </div>
                                
                                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                                    {user && user.followers.length > 0 ? (
                                        user.followers.map((follower) => (
                                            <div key={follower._id} className="flex items-center justify-between w-full mb-2">
                                                <User
                                                    userId={follower._id}
                                                    name={follower.name}
                                                    avatar={follower.avatar.url}
                                                />
                                                <button className="text-blue-500 font-semibold text-sm">Follow</button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No Followers</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {followingToggle && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setFollowingToggle(false)}></div>
                        <div className="absolute inset-x-0 lg:bottom-10 md:bottom-10 bottom-20 transform transition-transform duration-300 ease-out max-h-[80vh] lg:max-w-[33vw] lg:left-[18vw] md:max-w-[33vw] md:left-[18vw] w-11/12 left-3 flex flex-col">
                            <div className={`bg-white rounded-t-2xl rounded-b-2xl shadow-xl transform transition-transform duration-300 ease-out flex-grow overflow-hidden ${followingToggle ? 'translate-y-0' : 'translate-y-full'}`}>
                                <div className="p-4 border-b border-gray-200">
                                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                    <h2 className="text-xl font-semibold text-center">Following</h2>
                                </div>
                                
                                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                                    {user && user.following.length > 0 ? (
                                        user.following.map((following) => (
                                            <div key={following._id} className="flex items-center justify-between w-full mb-2">
                                                <User
                                                    userId={following._id}
                                                    name={following.name}
                                                    avatar={following.avatar.url}
                                                />
                                                <button className="text-blue-500 font-semibold text-sm">Unfollow</button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No Following</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    )
}


export default UserProfile