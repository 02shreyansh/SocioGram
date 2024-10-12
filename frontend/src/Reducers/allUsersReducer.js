import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    error:null,
    users:null,
}
const allUserReducer=createSlice({
    name:'allUser',
    initialState,
    reducers:{
        allUserRequest:(state)=>{
            state.loading=true;
            state.error=null;
        },
        allUserSuccess:(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            state.error=null
        },
        allUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearErrors:(state)=>{
            state.error=null
        }
    }
})
export const {
    allUserRequest,
    allUserSuccess,
    allUserFailure,
    clearErrors
}=allUserReducer.actions;
export default allUserReducer.reducer;