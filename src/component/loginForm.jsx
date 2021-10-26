import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {settingUsername , settingPassword,authRequest} from "../slices/loginSlice"
import Loader from 'react-loader-spinner';






const LoginForm = () => {
    const dispatch = useDispatch();
    const {username,password,loading,isSuccess,isError,errorMessage,token} = useSelector(state => state.loginReducer);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authRequest(username,password));
        console.log("submitted");

    }
    const handleChange = ({ currentTarget: input }) => {
        if(input.name === "email")
            dispatch(settingUsername(input.value));
            
        if (input.name === "password")
            dispatch(settingPassword(input.value));
        // data[input.name] = input.value;
    }  
  return(
    <React.Fragment >
    
    {isSuccess? (<div class="alert alert-success" role="alert">
        You have logged in successfully.
    </div>): (<h1></h1>)} 
    {loading ? (<div className="loader"><Loader type="Puff" color="#198754" height={200} width={200} /></div>) : 
    (<div>
    {!token && <form className = "login-form" onSubmit={handleSubmit}>
    {isError? (<div class="alert alert-danger" role="alert">
        something went wrong.
    </div>): (<h1></h1>)}   
    <h1 class="h3 mb-3 fw-normal">Sign In</h1>
    <div className="form-floating">
      <input type="email" className="form-control input" name="email" id="floatingInput" placeholder="name@example.com" onChange={handleChange} />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control input" name="password" id="floatingPassword" placeholder="Password" onChange={handleChange}/>
      <label for="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-success" type="submit">Sign in</button>
  </form>}
  </div>)}
  </React.Fragment>
  );
};

export default LoginForm;
