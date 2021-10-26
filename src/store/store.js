import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice'
import deviceReducer from '../slices/deviceSlice'

const store = configureStore({
  reducer: {
    loginReducer,
    deviceReducer,
  },
})

export default store