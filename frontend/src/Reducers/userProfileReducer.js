import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    error:null,
    user:null,
}
const userProfileReducer=createSlice({
    name:'UserPrfile',
    initialState,
    reducers:{
        UserProfileRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        UserProfileSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.error=null
        },
        UserProfileFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearErrors:(state)=>{
            state.error=null
        }
    }
})
export const {
    UserProfileRequest,
    UserProfileSuccess,
    UserProfileFailure,
    clearErrors
}=userProfileReducer.actions;
export default userProfileReducer.reducer;