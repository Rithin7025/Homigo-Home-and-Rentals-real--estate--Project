import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin : localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}

const adminSlice = createSlice({
    name : 'admin', 
    initialState,

    reducers : {
        adminSignInSuccess : (state,action) => {
            state.admin = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminSignOutSucess : (state,action) => {
          state.admin = null;
          localStorage.removeItem('adminInfo')
        }
    }
})

export default adminSlice.reducer;
export const { adminSignInSuccess } = adminSlice.actions