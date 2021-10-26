import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";

const INITIAL_STATE = {
    devices:[],
    devicesMarker: [],
    loading:false,
    isSuccess:false,
    isError:false,
    isSuccessMarker:false,
  };

const deviceSlice = createSlice({
    name: 'device',
    initialState: INITIAL_STATE,
    reducers: {
      getDevice(state, action) {
        state.loading = true;
      },
      getDeviceSuccess(state, action) {
        state.devices = action.payload.devices;
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
      },
      getDeviceFail(state, action) {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
      },
      getDeviceLocation(state,action){
          console.log(action.payload); 
          state.devicesMarker = action.payload;
          state.isSuccessMarker = true;
      },
      getDeviceLocationSuccess(state, action){
          state.isSuccessMarker = true;
      }
    }
  });

  export const {
    getDevice,
    getDeviceSuccess,
    getDeviceFail,
    getDeviceLocation,
    getDeviceLocationSuccess
  } = deviceSlice.actions;

  export const getDevicesRequest = () => async (dispatch) => {
    // show loading indicator
    dispatch(getDevice());
    await http.get('http://demo.thingsboard.io/api/tenant/deviceInfos?pageSize=100&page=0&deviceProfileId=3b00e220-2668-11eb-85ee-f936949cce2a',
    {headers:{"X-Authorization":"Bearer " + localStorage.getItem("token")}})
      .then(({ data }) => {  
        const devices = data.data;
        dispatch(getDeviceSuccess({ devices }));
      })
      .catch((exception) => {
        dispatch(getDeviceFail(exception));
        console.log(exception);
      });
  };
  export const getDevicesLocation =  () => async(dispatch,getState) => {
      var MarkersTemp = [];
    
      const devices = getState().deviceReducer.devices;
      for (var i = 0; i < devices.length; i++) {
          // if( i < 10)
          // {
              
              const url = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${devices[i].id.id}/values/timeseries`;
              try {
               
               const promise = await http.get(url,{headers:{"X-Authorization":"Bearer " + localStorage.getItem("token")}}).then(({ data })=>{
                console.log(data.latitude[0].value);
                const deviceMarker = {
                    id:devices[i].id.id,
                    x:data.latitude[0].value,
                    y:data.longitude[0].value
                };
                // console.log(deviceMarker);
                MarkersTemp.push(deviceMarker);
                
               })
               
               
                
            //    deviceMarkers.push(deviceMarker);
            
            
               
              }
              catch(e){
                  console.log("exception",e);

    
              }
              
          // }
      }
      console.log(typeof MarkersTemp);
      console.log(MarkersTemp[0]);
      dispatch(getDeviceLocation(MarkersTemp));
      // console.log(getState());
      // dispatch(getDeviceLocationSuccess());
    // console.log(getState());
  }

  export default deviceSlice.reducer;