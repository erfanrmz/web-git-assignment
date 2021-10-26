import {useDispatch } from 'react-redux';
import {logout} from "../slices/loginSlice"

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(logout());
    // localStorage.removeItem('token');
    return (<div class="alert alert-success" role="alert">
    You have Logged Out successfully.
  </div>  );
}
 
export default Logout;