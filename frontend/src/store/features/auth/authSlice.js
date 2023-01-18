import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { login, registration } from "../../../http/userApi";


let initialState = {
    email: '',
    userId: '',
    registerError: [],
    loginError: [],
}

export const LoginThunk = createAsyncThunk(
    'auth/loginthunk',
    async (action, { rejectWithValue,fulfillWithValue,dispatch }) => {
        let res = await login({ email: action.email, password: action.password })
        if(res.statusText === 'OK') {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isAuth', true)
            let { id, role, email } = jwtDecode(res.data.token)
            localStorage.setItem('role', role)
            dispatch(setUser({ id, email }))
            return fulfillWithValue()
        }
        if(res.response.status === 500) {
            dispatch(setLoginError(res.response.data))
            return rejectWithValue()
        } else {
            return rejectWithValue()
        }
    }
)

export const RegisterThunk = createAsyncThunk(
    'auth/registerthunk',
    async (action, { rejectWithValue, dispatch,fulfillWithValue }) => {
            let res = await registration({ email: action.email, password: action.password, role: 'USER' })
            console.log(res)
            if(res.statusText === "OK") {
                console.log(res)
                localStorage.setItem('token', res.data)
                localStorage.setItem('isAuth', true)
                let { id, role, email } = jwtDecode(res.data)
                localStorage.setItem('role', role)
                dispatch(setUser({ id,email }))
                return fulfillWithValue()
            }    
            if(res.response.status === 404) {
                dispatch(setRegisterError(res.response.data))
                console.log(res)
                return rejectWithValue('error')
            }
             else {
                console.log(res)
                return rejectWithValue("undefined error")
            }
    }
)

export const SetUserThunk = createAsyncThunk(
    'auth/setUser',
    async (action, { dispatch }) => {
        let token = localStorage.getItem('token')
        if (token) {
            let { id, email } = jwtDecode(token)
            dispatch(setUser({ id, email }))
        } else {
            dispatch(Logout())
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Logout: (state, action) => {
            state.email = ''
            state.userId = ''
            localStorage.clear()
        },
        setUser: (state, action) => {
            state.userId = action.payload.id
            state.email = action.payload.email
            state.registerError = []
            state.loginError = []
        },
        setLoginError: (state,action) => {
            state.loginError = action.payload
        },
        setRegisterError: (state,action) => {
            state.registerError = action.payload
        }

    }
})


export const {Logout, setUser, setLoginError,setRegisterError } = authSlice.actions
export default authSlice.reducer