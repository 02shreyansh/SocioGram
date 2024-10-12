import { Avatar, Button} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentOnPost } from '../../Actions/Post'
import { getMyPostCommentDelete, getPostForDeleteComment } from '../../Actions/User'

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount
}) => {
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.user)
    const deleteCommentHandler=async()=>{
        await dispatch(deleteCommentOnPost(postId,commentId))
        if(isAccount){
            dispatch(getMyPostCommentDelete())
        }else{
            dispatch(getPostForDeleteComment())
        }
    }
  return (
    <div className='flex justify-between items-center'>
        <Link to={`/user/${userId}`}>
            <div className="flex items-start space-x-3">  
                <Avatar src={avatar} className="h-8 w-8"  />                 
                <div className='flex justify-between items-center gap-3'>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-600">{comment}</p>
                </div>
            </div>
           
        </Link>
        {
            isAccount?<Button onClick={deleteCommentHandler}>
                <Delete/>
            </Button>:userId===user._id?(
                <Button onClick={deleteCommentHandler}>
                    <Delete/>
                </Button>
            ):null
        }
        
    </div>
  )
}

export default CommentCard