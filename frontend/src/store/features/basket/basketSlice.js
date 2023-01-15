import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { getBasketItems, addItemToBasket as add, Delete, Increment, Decrement } from "../../../http/basketApi";
import { getOne } from "../../../http/itemsApi";


let initialState = {
    basketItems: []
}


export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (action, { rejectWithValue, fulfillWithValue, dispatch }) => {
        let res = await getBasketItems(action)
        if (res.status === 200) {
            dispatch(getAllItems(res.data))
            fulfillWithValue('OK')
        } else {
            rejectWithValue('')
        }

    }
)

export const AddItemToBasket = createAsyncThunk(
    'basket/AddItemToBasket',
    async (action, { rejectWithValue, fulfillWithValue, dispatch }) => {
        let res = await add(action)
        console.log(res)
        fulfillWithValue('')
    }
)

export const RemoveItemFromBasket = createAsyncThunk(
    'basket/RemoveItemFromBasket',
    async (action, { rejectWithValue, fulfillWithValue, dispatch }) => {
        await Delete(action)
        dispatch(unsetBasketItem(action))
        fulfillWithValue('')
    }
)

export const IncrementCount = createAsyncThunk(
    'basket/IncrementCount',
    async (action, {fulfillWithValue,rejectWithValue, dispatch}) => {
        const res = await Increment(action.id)
        if(res.status === 200) {
            dispatch(increment(action.index))
            fulfillWithValue('')
        } else {
            rejectWithValue('')
        }
    }
)
export const DecrementCount = createAsyncThunk(
    'basket/IncrementCount',
    async (action, {fulfillWithValue,rejectWithValue, dispatch}) => {
        const res = await Decrement(action.id)
        if(res.status === 200) {
            dispatch(decrement(action.index))
            fulfillWithValue('')
        } else {
            rejectWithValue('')
        }
    }
)



const basketSlce = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        getAllItems: (state, action) => {
            state.basket = action.payload
        },
        setBasket: (state, action) => {
            state.basketItems.push(action.payload)
        },
        unsetBasketItem: (state, action) => {
            state.basket.rows = state.basket.rows.filter((item) => item.id !== action.payload)
            state.basket.count = state.basket.count - 1
        },
        increment: (state,action) => {
            state.basket.rows[action.payload].count = state.basket.rows[action.payload].count + 1
        },
        decrement: (state,action) => {
            state.basket.rows[action.payload].count = state.basket.rows[action.payload].count - 1
        }
    }
})




export const { getAllItems, setBasket, unsetBasketItem,increment,decrement } = basketSlce.actions
export default basketSlce.reducer