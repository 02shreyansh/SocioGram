import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    posts:null,
    error:null,
    message:null
};
const postOfFollowingReducer=createSlice({
    name:'postOfFollowing',
    initialState,
    reducers:{
        postOfFollowingRequest:(state)=>{
            state.loading=true;
            state.error=null
        },
        postOfFollowingSuccess:(state,action)=>{
            state.loading=false;
            state.posts=action.payload;
            state.error=null
        },
        postOfFollowingFailure:(state,action)=>{
            state.loading=false;
            state.error = action.payload;
            state.posts=null
        },
        clearErrors:(state)=>{
            state.error=null;
        }
    }
})
export const {
    postOfFollowingRequest,
    postOfFollowingSuccess,
    postOfFollowingFailure,
    clearErrors
}=postOfFollowingReducer.actions;
export default postOfFollowingReducer.reducer;