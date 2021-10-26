import React ,{useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getDevicesRequest , getDevicesLocation} from "../slices/deviceSlice"
import Loader from 'react-loader-spinner';

const Devices = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem("token");
    const {devices,loading,isSuccess,isError,isSuccessMarker} = useSelector(state => state.deviceReducer);
    useEffect(() =>
    {
        
        if(!isSuccess)
        {
            dispatch(getDevicesRequest());
            // dispatch(getDevicesLocation());
        }
    });
    // if(!isSuccessMarker)   
    //     dispatch(getDevicesLocation());
    
    // console.log(devices);
    
    
    return ( 
    <div>
    {!user && <div className="alert alert-warning" role="alert">
        Log In First.
    </div>}    
    {loading ? (<div className="loader"><Loader type="Puff" color="#198754" height={200} width={200} /></div>):
    (<ul className=" flex-container wrap">
        {devices.map((device) => (    
        <li className="device">
            <div class="card text-black bg-light mb-3">
            <div class="card-header">Device Name:{device.name}</div>
            <div class="card-body">Device Type :{device.type}</div>
            </div>
            </li>
      ))}
    </ul>)} 
    </div>);
}
 
export default Devices;