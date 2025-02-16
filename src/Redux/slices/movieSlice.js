import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movie: null
    },
    reducers: {
        inject: (state, action) => {
            state.movie = action.payload
        },
        remove: (state) => {
            state.movie = null
        }
    }
})

export const { inject, remove } = movieSlice.actions
export default movieSlice.reducer