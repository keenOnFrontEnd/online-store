import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
    brands: [],
    types: []
}


const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers: {
        setBrands: (state,action) => {
            state.brands = action.payload
        },
        setTypes: (state,action) => {
            state.types = action.payload
        }
    }
})