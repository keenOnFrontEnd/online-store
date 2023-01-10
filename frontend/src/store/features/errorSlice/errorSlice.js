import { createSlice} from "@reduxjs/toolkit";


let initialState = {
    loginError: [],
    registrationError: [],
    storeError: []
}


const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setLoginError: (state,action) => {
            state.loginError = action.payload
        },
        setRegisterError: (state,action) => {
            state.registrationError = action.payload
        }
    }
})

export const {setLoginError, setRegisterError} = errorSlice.actions

export default errorSlice.reducer