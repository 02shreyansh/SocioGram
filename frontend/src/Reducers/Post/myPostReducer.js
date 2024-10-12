import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    error:null,
    myPosts:[],
}
const myPostReducer=createSlice({
    name:'myPost',
    initialState,
    reducers:{
        myPostsRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        myPostsSuccess:(state,action)=>{
            state.loading=false;
            state.myPosts=action.payload;
            state.error=null;        
        },
        myPostsFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearErrors:(state)=>{
            state.error=null
        }
    }
})
export const {
    myPostsRequest,
    myPostsSuccess,
    myPostsFailure,
    clearErrors

}=myPostReducer.actions
export default myPostReducer.reducer