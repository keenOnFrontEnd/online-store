import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrands, getTypes } from "../../../http/searchApi";

let initialState = {
    brands: [],
    types: []
}


export const getbrands = createAsyncThunk(
    'search/getbrands',
    async (action, { fulfillWithValue, rejectWithValue, dispatch }) => {
        let res = await getBrands()
        if (res.status === 200) {
            dispatch(setBrands(res.data))
            fulfillWithValue('')
        } else {
            rejectWithValue(res)
        }
    }
)

export const gettypes = createAsyncThunk(
    'search/gettypes',
    async (action, { fulfillWithValue, rejectWithValue, dispatch }) => {
        let res = await getTypes()
        if (res.status === 200) {
            dispatch(setTypes(res.data))
            fulfillWithValue('')
        } else {
            rejectWithValue(res)
        }
    }
)


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        setTypes: (state, action) => {
            state.types = action.payload
        }
    }
})


export const { setBrands, setTypes } = searchSlice.actions
export default searchSlice.reducer