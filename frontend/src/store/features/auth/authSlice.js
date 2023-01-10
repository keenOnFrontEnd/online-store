import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { login, registration } from "../../../http/userApi";


let initialState = {
    email: '',
    userId: '',
    role: '',
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
            dispatch(setUser({ id, role, email }))
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
                dispatch(setUser({ id, role, email }))
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
    async (action, { rejectWithValue, dispatch }) => {
        let token = localStorage.getItem('token')
        if (token) {
            let { id, role, email } = jwtDecode(token)
            dispatch(setUser({ id, role, email }))
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
            state.role = ''
            localStorage.clear()
        },
        setUser: (state, action) => {
            state.userId = action.payload.id
            state.email = action.payload.email
            state.role = action.payload.role
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