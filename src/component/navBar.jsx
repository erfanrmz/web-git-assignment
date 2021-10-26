import React,{useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const NavBar = () => {
  const {token} = useSelector(state => state.loginReducer);
  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm  navbar-dark bg-dark">
      <Link className="navbar-brand home" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/map">
            Map
          </NavLink>
          {!token &&
          <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>}
          {token &&
          <NavLink className="nav-item nav-link logout" to="/logout">
          Logout
        </NavLink>
          }
          
        </div>
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
