import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll } from "../../../http/itemsApi";


let initialState = {
    items: [],
    count: null,
    selectedItem: null,
    itemsError: [],
    pending: false
}


export const getItems = createAsyncThunk(
    'items/getitems',
    async (action,{rejectWithValue,fulfillWithValue,dispatch}) => {
        let res = await getAll();
        if(res.status === 200) {
            dispatch(getAllItems(res.data))
        }
        console.log(res)
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
        },
        getOneItem: (state, action) => {
            state.selectedItem = action.payload
        }
    },
    extraReducers: {

    }
})

export const {getAllItems, getOneItem} = itemSlice.actions
export default itemSlice.reducer