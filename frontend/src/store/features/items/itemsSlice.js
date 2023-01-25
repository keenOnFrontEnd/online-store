import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll,getOne } from "../../../http/itemsApi";
import {setBasket} from '../basket/basketSlice'

let initialState = {
    items: [],
    count: null,
    basketItem: [],
    itemsError: [],
}


export const getItems = createAsyncThunk(
    'items/getitems',
    async (action,{rejectWithValue,fulfillWithValue,dispatch}) => {
         let res;
        if(action) {
            res = await getAll(action)
        } else {
            res = await getAll();
        }
        if(res.status === 200) {
            dispatch(getAllItems(res.data))
        } else {
            rejectWithValue('error')
        }
    }
)

export const getItem = createAsyncThunk(
    'items/getItem',
     async (action, {rejectWithValue,fulfillWithValue,dispatch}) => {
        if(action === null) {
            rejectWithValue('')
        } else{
        let res = await getOne(action);
        dispatch(setBasket(res.data))
        fulfillWithValue(res)
        }
    }
)



const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        getAllItems: (state,action) => {
            let {rows,count} = action.payload
            state.items = rows
            state.count = count
        }
    },
    extraReducers: {

    }
})

export const {getAllItems} = itemSlice.actions
export default itemSlice.reducer