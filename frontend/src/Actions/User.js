import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loadUserRequest,
  loadUserFailure,
  loadUserSuccess,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  registerRequest,
  registerSuccess,
  registerFailure
} from "../Reducers/User"; 
import {  postOfFollowingFailure, postOfFollowingRequest, postOfFollowingSuccess } from "../Reducers/postOfFollowing";
import { allUserFailure, allUserRequest, allUserSuccess } from "../Reducers/allUsersReducer";
import { myPostsRequest, myPostsSuccess ,myPostsFailure} from "../Reducers/Post/myPostReducer";
import { ChangePasswordFailure, ChangePasswordRequest, ChangePasswordSuccess, deleteProfileFailure, deleteProfileRequest, deleteProfileSuccess, followUserFailure, followUserRequest, followUserSuccess, forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, resetPaswordFailure, resetPaswordRequest, resetPaswordSuccess, updateUserFailure, updateUserRequest, updateUserSuccess } from "../Reducers/Post/likeReducer";
import { userPostsFailure, userPostsRequest, userPostsSuccess } from "../Reducers/Post/UserPostReducer";
import { UserProfileFailure, UserProfileRequest, UserProfileSuccess } from "../Reducers/userProfileReducer";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure(error.message || "An error occurred"));
  }
};
export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
        const {data}=await axios.get('api/v1/me');
        dispatch(loadUserSuccess(data.user))
    } catch (error) {
        dispatch(loadUserFailure(error.message || "An error occurred"))
    }
}
// gives all post  of following users
export const getFollowingPost=()=>async (dispatch)=>{
  try {
    dispatch(postOfFollowingRequest())
    const {data}=await axios.get("/api/v1/posts")
    dispatch(postOfFollowingSuccess(data.posts))
  } catch (error) {
    dispatch(postOfFollowingFailure(error.message || "An error occurred"))
  }
}

// remove loading in like comment and deleteComment
export const getFollowingPostForLike=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/posts")
    dispatch(postOfFollowingSuccess(data.posts))
  } catch (error) {
    dispatch(postOfFollowingFailure(error.message || "An error occurred"))
  }
}
export const getFollowingPostForComment=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/posts")
    dispatch(postOfFollowingSuccess(data.posts))
  } catch (error) {
    dispatch(postOfFollowingFailure(error.message || "An error occurred"))
  }
}
export const getPostForDeleteComment=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/posts")
    dispatch(postOfFollowingSuccess(data.posts))
  } catch (error) {
    dispatch(postOfFollowingFailure(error.message || "An error occurred"))
  }
}
// bring all user
export const getAllUsers=(name="")=>async (dispatch)=>{
  try {
    dispatch(allUserRequest())
    const {data}=await axios.get(`/api/v1/users?name=${name}`)
    dispatch(allUserSuccess(data.users))
  } catch (error) {
    dispatch(allUserFailure(error.message || "An error occurred"))
  }
}


export const getMyPost=()=>async (dispatch)=>{
  try {
    dispatch(myPostsRequest())
    const {data}=await axios.get("/api/v1/my/posts")
    dispatch(myPostsSuccess(data.posts))
  } catch (error) {
    dispatch(myPostsFailure(error.message || "An error occurred"))
  }
}
// for my post
export const getMyPostForLike=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/my/posts")
    dispatch(myPostsSuccess(data.posts))
  } catch (error) {
    dispatch(myPostsFailure(error.message || "An error occurred"))
  }
}
export const getMyPostForComment=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/my/posts")
    dispatch(myPostsSuccess(data.posts))
  } catch (error) {
    dispatch(myPostsFailure(error.message || "An error occurred"))
  }
}
export const getMyPostCommentDelete=()=>async (dispatch)=>{
  try {
    const {data}=await axios.get("/api/v1/my/posts")
    dispatch(myPostsSuccess(data.posts))
  } catch (error) {
    dispatch(myPostsFailure(error.message || "An error occurred"))
  }
}

// logout

export  const logoutUser=()=>async (dispatch)=>{
  try {
    dispatch(logoutUserRequest())
    const {data}=await axios.get("/api/v1/logout")
    dispatch(logoutUserSuccess())
  } catch (error) {
    dispatch(logoutUserFailure(error.message || "An error occurred"))
  }
}
export const RegisterUser = (name,email, password,avatar) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(
      `/api/v1/register`,
      { name,email, password,avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(registerSuccess((data.user)));
  } catch (error) {
    dispatch(registerFailure(error.message || "An error occurred"));
  }
};
export const UpdateUser = (name,email,avatar) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const { data } = await axios.put(
      `/api/v1/update/profile`,
      { name,email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updateUserSuccess((data.message)));
  } catch (error) {
    dispatch(updateUserFailure(error.message || "An error occurred"));
  }
};
export const ChangePassword = (oldPassword,newPassword) => async (dispatch) => {
  try {
    dispatch(ChangePasswordRequest());
    const { data } = await axios.put(
      `/api/v1/update/password`,
      { oldPassword,newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(ChangePasswordSuccess((data.message)));
  } catch (error) {
    dispatch(ChangePasswordFailure(error.message || "An error occurred"));
  }
};
export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch(deleteProfileRequest());
    const { data } = await axios.delete(`/api/v1/delete/me`);
    dispatch(deleteProfileSuccess((data.message)));
  } catch (error) {
    dispatch(deleteProfileFailure(error.message || "An error occurred"));
  }
};
export const ForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const { data } = await axios.post(`/api/v1/forgot/password`,{
      email
    },{
      headers: {
        "Content-Type": "application/json",
      }
    });
    dispatch(forgotPasswordSuccess((data.message)));
  } catch (error) {
    dispatch(forgotPasswordFailure(error.message || "An error occurred"));
  }
};
export const resetPassword = (token,password) => async (dispatch) => {
  try {
    dispatch(resetPaswordRequest());
    const { data } = await axios.put(`/api/v1/password/reset/${token}`,{
      password
    },{
      headers: {
        "Content-Type": "application/json",
      }
    });
    dispatch(resetPaswordSuccess((data.message)));
  } catch (error) {
    dispatch(resetPaswordFailure(error.message || "An error occurred"));
  }
};
export const getUserPost=(id)=>async (dispatch)=>{
  try {
    dispatch(userPostsRequest())
    const {data}=await axios.get(`/api/v1/userposts/${id}`)
    dispatch(userPostsSuccess(data.posts))
  } catch (error) {
    dispatch(userPostsFailure(error.message || "An error occurred"))
  }
}
export const getUserPostForLike=(id)=>async (dispatch)=>{
  try {
    const {data}=await axios.get(`/api/v1/userposts/${id}`)
    dispatch(userPostsSuccess(data.posts))
  } catch (error) {
    dispatch(userPostsFailure(error.message || "An error occurred"))
  }
}
export const getUserPostForComment=(id)=>async (dispatch)=>{
  try {
    const {data}=await axios.get(`/api/v1/userposts/${id}`)
    dispatch(userPostsSuccess(data.posts))
  } catch (error) {
    dispatch(userPostsFailure(error.message || "An error occurred"))
  }
}
export const getUserProfile=(id)=>async (dispatch)=>{
  try {
    dispatch(UserProfileRequest())
    const {data}=await axios.get(`/api/v1/user/${id}`)
    dispatch(UserProfileSuccess((data.user)))
  } catch (error) {
    dispatch(UserProfileFailure(error.message || "An error occurred"))
  }
}
export const followAndUnfollow=(id)=>async (dispatch)=>{
  try {
    dispatch(followUserRequest())
    const {data}=await axios.get(`/api/v1/follow/${id}`)
    dispatch(followUserSuccess((data.message)))
  } catch (error) {
    dispatch(followUserFailure(error.message || "An error occurred"))
  }
}



