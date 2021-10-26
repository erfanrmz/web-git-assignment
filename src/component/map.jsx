import React,{useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'  
import {Icon} from 'leaflet'
import { useSelector, useDispatch } from 'react-redux';
import {getDevicesRequest , getDevicesLocation} from "../slices/deviceSlice"
import Loader from 'react-loader-spinner';

const Map = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem("token");
    const {devices,devicesMarker,loading,isSuccess,isError,isSuccessMarker} = useSelector(state => state.deviceReducer);

    useEffect(() =>
    {
      if(!isSuccessMarker)
      {
          console.log("hello");
          dispatch(getDevicesLocation());
      }
      
    });
    const icon = new Icon({iconUrl: process.env.PUBLIC_URL + '/marker.png', iconSize: [20, 30], iconAnchor: [17, 46]})   
    return (
      <div>
      {!isSuccessMarker ? (<div className="loader">
        <Loader type="Puff" color="#198754" height={200} width={200} />
        </div>):
      (<MapContainer center={[35, 51]} zoom={5} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {devicesMarker.map(marker => {
            return(<Marker position={[marker.x, marker.y]} icon ={icon}>
              <Popup>
              ID:{marker.id} <br />position: x: {marker.x} y: {marker.y}
            </Popup>
            </Marker>);
          })}
        </MapContainer>)}

      </div>
      );
}

 
export default Map;