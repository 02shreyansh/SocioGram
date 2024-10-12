import React, { useState, useEffect } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline
} from "@mui/icons-material"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentOnPost, deletePost, likePost, updatePost } from '../../Actions/Post'
import { getFollowingPostForComment, getFollowingPostForLike, getMyPost, getMyPostForComment, getMyPostForLike,  getUserPostForComment, getUserPostForLike, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({
    postId,
    caption = "No Caption",
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    OwnerId,
    ownerName,
    isDelete = false,
    isAccount = false,
    isUserProfile="home",
}) => {
    const [liked, setLiked] = useState(false)
    const [likesUser, setLikesUser] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [captionValue, setCaptionValue] = useState(caption)
    const [captionToggle, setCaptionToggle] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [showSeeMore, setShowSeeMore] = useState(false)

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const params=useParams()
    const handleLike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPostForLike())
        } else {
            dispatch(getFollowingPostForLike())
        }
        if(isUserProfile==="userProfile"){
            dispatch(getUserPostForLike(params.id))
            dispatch(loadUser())
        }
    }

    const addCommentHandler = async (e) => {
        e.preventDefault()
        await dispatch(addCommentOnPost(postId, commentValue))
        setCommentValue("")
        if (isAccount) {
            dispatch(getMyPostForComment())
        } else {
            dispatch(getFollowingPostForComment())

        }
        if(isUserProfile==="userProfile"){
            dispatch(getUserPostForComment(params.id))
            dispatch(loadUser())
        }
    }

    const updateCaptionHandler = async (e) => {
        e.preventDefault()
        await dispatch(updatePost(captionValue, postId))
        dispatch(getMyPost())
    }

    const handleDeletePost = async () => {
        await dispatch(deletePost(postId))
        dispatch(getMyPost())
        dispatch(loadUser())
    }

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        if (caption.length > 25) {
            setShowSeeMore(true)
        }
    }, [caption])

    const renderCaption = () => {
        if (caption.length <= 25 || expanded) {
            return caption
        }
        return caption.slice(0, 30) + '...'
    }

    useEffect(() => {
        if (user) {
            likes.forEach(item => {
                if (item._id === user._id) {
                    setLiked(true)
                }
            })
        }
    }, [likes, user])

    return (
        <div className="w-full md:w-3/5 bg-white rounded-lg shadow-md p-4 my-4 mx-auto">
            <div className="flex justify-end mb-2">
                {isAccount && (
                    <Button className="p-1 rounded-full text-gray-600 hover:bg-gray-100" onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>
                )}
            </div>
            <img src={postImage} alt="Post" className="w-full rounded-lg mb-4" />
            <div className="flex items-start space-x-3 mb-4 ">
                <Avatar 
                    src={ownerImage} 
                    alt='User' 
                    className="h-12 w-12"
                />
                <div className="flex flex-col flex-grow">
                    <Link to={`/user/${OwnerId}`} className="text-black hover:underline">
                        <Typography className="font-bold">{ownerName}</Typography>
                    </Link>
                    <div className="relative">
                        <Typography className={`text-sm ${expanded ? "md:w-1/2 lg:w-1/4 w-52" : "md:w-full"}  text-gray-600 break-words`}>
                            {renderCaption()}
                        </Typography>
                        {showSeeMore && (
                            <button 
                                onClick={toggleExpand} 
                                className="text-blue-500 text-sm hover:underline focus:outline-none"
                            >
                                {expanded ? 'See less' : 'See more'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Button className="mb-2 hover:bg-gray-100 rounded-full" onClick={() => setLikesUser(!likesUser)} disabled={likes.length === 0}>
                <Typography className="text-black">
                    {likes.length} Likes
                </Typography>
            </Button>
            <ToastContainer position="bottom-center" />
            <div className="flex space-x-2">
                <Button 
                    onClick={handleLike}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    {liked ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
                </Button>
                <Button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>
                {isDelete && (
                    <Button onClick={handleDeletePost} className="p-2 rounded-full hover:bg-gray-100">
                        <DeleteOutline />
                    </Button>
                )}
            </div>
            {commentToggle && user && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setCommentToggle(false)}></div>
                    <div className="absolute inset-x-0 lg:bottom-10 md:bottom-10 bottom-20 transform transition-transform duration-300 ease-out max-h-[80vh] lg:max-w-[33vw] lg:left-[18vw] md:max-w-[33vw] md:left-[18vw] w-11/12 left-3 flex flex-col">
                        <div 
                            className={`bg-white rounded-t-2xl rounded-b-2xl shadow-xl transform transition-transform duration-300 ease-out flex-grow overflow-hidden ${
                            commentToggle ? 'translate-y-0' : 'translate-y-full'
                            }`}
                        >
                            <div className="p-4 border-b border-gray-200">
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h2 className="text-xl font-semibold text-center">Comments</h2>
                            </div>
                            
                            <div className="overflow-y-auto flex-grow p-4 space-y-4">
                                {
                                    comments.length > 0 ? comments.map((comment) => (
                                        <CommentCard 
                                        key={comment.user?._id}
                                        userId={comment.user?._id}
                                        name={comment.user?.name}
                                        avatar={comment.user?.avatar.url}
                                        comment={comment.comment}
                                        commentId={comment._id}
                                        postId={postId}
                                        isAccount={isAccount}
                                        />
                                    )) : <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                                }
                            </div>
                            
                            <div className="border-t border-gray-200 p-2 lg:p-4">
                                <form onSubmit={addCommentHandler} className="flex items-center space-x-2">
                                    <Avatar src={user?.avatar?.url} alt={user?.name} className="h-8 w-8" />
                                    <input
                                        type="text"
                                        value={commentValue}
                                        onChange={(e) => setCommentValue(e.target.value)}
                                        placeholder="Add a comment..."
                                        required
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {likesUser && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setLikesUser(false)}></div>
                    <div className="absolute inset-x-0 lg:bottom-10 md:bottom-10 bottom-20 transform transition-transform duration-300 ease-out max-h-[80vh] lg:max-w-[33vw] lg:left-[18vw] md:max-w-[33vw] md:left-[18vw] w-11/12 left-3 flex flex-col">
                        <div 
                            className={`bg-white rounded-t-2xl rounded-b-2xl shadow-xl transform transition-transform duration-300 ease-out flex-grow overflow-hidden ${
                            likesUser ? 'translate-y-0' : 'translate-y-full'
                            }`}
                        >
                            <div className="p-4 border-b border-gray-200">
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h2 className="text-xl font-semibold text-center">Liked By</h2>
                            </div>
                            <div className="overflow-y-auto flex-grow p-4 space-y-4">
                                {
                                    likes.length > 0 ? likes.map((like) => (
                                        <User key={like._id} userId={like._id} name={like.name} avatar={like.avatar.url} />
                                    )) : <p className="text-center text-gray-500">No Likes Yet</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
             {captionToggle && user && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setCaptionToggle(false)}></div>
                    <div className="absolute inset-x-0 lg:bottom-10 md:bottom-10 bottom-20 transform transition-transform duration-300 ease-out max-h-[80vh] lg:max-w-[33vw] lg:left-[18vw] md:max-w-[33vw] md:left-[18vw] w-11/12 left-3 flex flex-col">
                        <div 
                            className={`bg-white rounded-t-2xl rounded-b-2xl shadow-xl transform transition-transform duration-300 ease-out flex-grow overflow-hidden ${
                            captionToggle ? 'translate-y-0' : 'translate-y-full'
                            }`}
                        >
                            <div className="p-4 border-b border-gray-200">
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h2 className="text-xl font-semibold text-center">Caption</h2>
                            </div>
                            
                           
                            
                            <div className="border-t border-gray-200 p-2 lg:p-4">
                                <form onSubmit={updateCaptionHandler} className="flex items-center space-x-2">
                                    
                                    <input
                                        type="text"
                                        value={captionValue}
                                        onChange={(e) => setCaptionValue(e.target.value)}
                                        placeholder="caption....."
                                        required
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post


