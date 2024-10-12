import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated:false,
  error: null,
  message:null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message="Login  Successfull";
      state.isAuthenticated=true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message="Password or Email is Incorrect"
      state.isAuthenticated=false
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated=true;
      state.error = null;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=false;
    },
    logoutUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated=false;
      state.error = null;
    },
    logoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated=true;
    },
    clearErrors:(state)=>{
      state.error=null;
    }
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  clearErrors
} = userSlice.actions;

export default userSlice.reducer;