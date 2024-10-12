import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    error:null,
    userPosts:[],
}
const userPostReducer=createSlice({
    name:'userPost',
    initialState,
    reducers:{
        userPostsRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        userPostsSuccess:(state,action)=>{
            state.loading=false;
            state.userPosts=action.payload;
            state.error=null;        
        },
        userPostsFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearErrors:(state)=>{
            state.error=null
        }
    }
})
export const {
    userPostsRequest,
    userPostsSuccess,
    userPostsFailure,
    clearErrors

}=userPostReducer.actions
export default userPostReducer.reducer