import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { act } from "react-dom/test-utils";
import { login, registration } from "../../../http/userApi";


let initialState = {
    isAuth: false,
    email: '',
    userId: '',
    role: ''
}

export const LoginThunk = createAsyncThunk(
    'auth/loginthunk',
    async (action, {rejectWithValue, dispatch}) => {
        let res = await login({email: action.email, password: action.password})
        localStorage.setItem('token', res.data.token)
        let {id,role,email} = jwtDecode(res.data.token)
        console.log(id,role,email)
        dispatch(Login_register({id,role,email}))
    }
)
// export const RegisterThunk = createAsyncThunk(
//     'auth/registerThunk',
//     async (action, {rejectWithValue, dispatch}) => {
//         let res = await registration(action.payload)
//         localStorage.setItem('token', action.payload)
//         let data = await jwtDecode(res.data)
//         console.log(data)
//         dispatch(Login_register(data))
//     }
// )

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        Login_register: (state,action) => {
            state.isAuth = true
            state.userId = action.payload.id
            state.email = action.payload.email
            state.role = action.payload.role
        },
        Logout: (state,action) => {
            state.email = ''
            state.userId = ''
            state.role = ''
            state.isAuth = false
        },
    },
    extraReducers: {
        [LoginThunk.fulfilled] : () => {console.log("succsess login")},
        [LoginThunk.pending] : () => {console.log("pending login")},
        [LoginThunk.rejected] : () => {console.warn("problem with login")},
    }
})


export const {Login_register, Logout} = authSlice.actions
export default authSlice.reducer