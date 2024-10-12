import axios from "axios";
import { 
  addCommentFailure, 
  addCommentRequest, 
  addCommentSuccess, 
  deleteCommentFailure, 
  deleteCommentRequest, 
  deleteCommentSuccess, 
  deletePostFailure, 
  deletePostRequest, 
  deletePostSuccess, 
  likeFailure, 
  likeRequest, 
  likeSuccess, 
  newPostFailure, 
  newPostRequest, 
  newPostSuccess, 
  updateCaptionFailure, 
  updateCaptionRequest, 
  updateCaptionSuccess
} from "../Reducers/Post/likeReducer";

export const likePost=(id)=>async (dispatch)=>{
    try {
      dispatch(likeRequest())
      const {data}=await axios.get(`/api/v1/post/${id}`)
      dispatch(likeSuccess(data.message))
    } catch (error) {
      dispatch(likeFailure(error.message || "An error occurred"))
    }
}
export const addCommentOnPost=(id,comment)=>async (dispatch)=>{
    try {
      dispatch(addCommentRequest())
      const {data}=await axios.put(`/api/v1/post/comment/${id}`,{
        comment,
      },{
        headers:{
          "Content-Type":"application/json"
        },
      })
      dispatch(addCommentSuccess(data.message))
    } catch (error) {
      dispatch(addCommentFailure(error.message || "An error occurred"))
    }
}
export const deleteCommentOnPost=(id,commentId)=>async (dispatch)=>{
    try {
      dispatch(deleteCommentRequest())
      const {data}=await axios.delete(`/api/v1/post/comment/${id}`,{
        data:{commentId},
      });
      dispatch(deleteCommentSuccess(data.message))
    } catch (error) {
      dispatch(deleteCommentFailure(error.message || "An error occurred"))
    }
}
export const createNewPost=(caption,image)=>async (dispatch)=>{
    try {
      dispatch(newPostRequest())
      const {data}=await axios.post(`/api/v1/post/upload`,{
        caption,
        image,
      },{
        headers:{
          "Content-Type":"application/json"
        }
      });
      dispatch(newPostSuccess(data.message))
    } catch (error) {
      dispatch(newPostFailure(error.message || "An error occurred"))
    }
}
export const updatePost=(caption,id)=>async (dispatch)=>{
    try {
      dispatch(updateCaptionRequest())
      const {data}=await axios.put(`/api/v1/post/${id}`,{
        caption,
      },{
        headers:{
          "Content-Type":"application/json"
        }
      });
      dispatch(updateCaptionSuccess(data.message))
    } catch (error) {
      dispatch(updateCaptionFailure(error.message || "An error occurred"))
    }
}
export const deletePost=(id)=>async (dispatch)=>{
    try {
      dispatch(deletePostRequest())
      const {data}=await axios.delete(`/api/v1/post/${id}`);
      dispatch(deletePostSuccess(data.message))
    } catch (error) {
      dispatch(deletePostFailure(error.message || "An error occurred"))
    }
}
