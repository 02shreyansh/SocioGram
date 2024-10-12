import {configureStore} from "@reduxjs/toolkit"
import userReduce from "../Reducers/User"
import postOfFollowingReducer from "../Reducers/postOfFollowing"
import usersReducer from "../Reducers/allUsersReducer"
import likeReducer from "../Reducers/Post/likeReducer"
import myPostReducer from "../Reducers/Post/myPostReducer"
import userPostReducerfrom from "../Reducers/Post/UserPostReducer"
import userProfileReducer from "../Reducers/userProfileReducer"

const store=configureStore({
    reducer:{
        user: userReduce,
        postOfFollowing: postOfFollowingReducer,
        users:usersReducer,
        like:likeReducer,
        myPosts:myPostReducer,
        userPost:userPostReducerfrom,
        userProfile:userProfileReducer
    }
})
export default store