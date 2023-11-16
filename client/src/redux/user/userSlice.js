import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null ,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        signInStart : (state) => {
            state.loading = true
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        signInError : (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart : (state) => {
            state.loading = true;
        },
        updateUserSuccess : (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure : (state) => {
            state.loading = false
        }
    }
})

//export the reducer as default and action as named
export default  userSlice.reducer;
export const { signInStart , signInSuccess , signInError,updateUserSuccess, updateUserStart, updateUserFailure } = userSlice.actions