import { createSlice } from "@reduxjs/toolkit";

const onboardSlice = createSlice({
    name: 'onboard',
    initialState: {
        onboarder: null,
        render: 'get-started'
    },
    reducers: {
        redirectLogin: (state, action) => {
            state.onboarder = action.payload;
            state.render = 'login';
        },
        redirectSignUp: (state, action) => {
            state.onboarder = action.payload
            state.render = 'sign-up'
        },
        redirectGetStarted: (state) => {
            state.onboarder = null
            state.render = 'get-started'
        }
    }
})

export const { redirectLogin, redirectSignUp, redirectGetStarted } = onboardSlice.actions
export default onboardSlice.reducer