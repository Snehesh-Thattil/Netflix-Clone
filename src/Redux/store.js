import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import movieReducer from './slices/movieSlice'
import onboardReducer from './slices/onboardSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        onboard: onboardReducer
    }
})