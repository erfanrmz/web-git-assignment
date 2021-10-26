import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";

const INITIAL_STATE = {
    username: '',
    password:'',
    loading : false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    token: '',
  };

  const loginSlice = createSlice({
    name: 'login',
    initialState: INITIAL_STATE,
    reducers: {
      loginRequest(state, action) {
        state.loading = true;
      },
      loginRequestSuccess(state, action) {
        state.token = action.payload.data.token;
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
      },
      loginRequestFailed(state, action) {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage
        state.isError = true;
        state.isSuccess = false;
      },
      usernameSet(state, action) {
          state.username = action.payload;
      },
      passwordSet(state, action) {
        state.password = action.payload;
    },
    logoutRequest(state, action) {
      state.isSuccess = false;
      state.username = "";
      state.password = "";
      state.token = "";
    },
    getTokenRequest(state,action){
      state.token = action.payload;
    }
  
    }
  });

  export const {
    loginRequest,
    loginRequestSuccess,
    loginRequestFailed,
    usernameSet,
    passwordSet,
    logoutRequest,
    getTokenRequest,
  } = loginSlice.actions;

  export const authRequest = (username,password) =>async (dispatch) => {
    // show loading indicator
    dispatch(loginRequest());
    console.log("hello");
    await http.post('https://demo.thingsboard.io/api/auth/login',{username:username,password:password})
      .then(({ data }) => {
        console.log(data);
        dispatch(loginRequestSuccess({ data }));
        localStorage.setItem("token",data.token);
        localStorage.setItem("refreshToken",data.refreshToken);
      })
      .catch((request) => {
        dispatch(loginRequestFailed(request));
        console.log(request);
      });
  };

  export const settingUsername = (username) => (dispatch) => {
    
    dispatch(usernameSet(username));
  }

  export const settingPassword = (password) => (dispatch) => {
      dispatch(passwordSet(password));
  }
  export const logout = () => (dispatch) => {
      localStorage.removeItem("token");
      dispatch(logoutRequest());

  }
  export const getToken = () =>(dispatch) =>{
    if (localStorage.getItem("token"))
      dispatch(getTokenRequest(localStorage.getItem("token")));
  }
  export const loginSelector = (state) => state.login;
  
  export default loginSlice.reducer;

