import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBasketItems, addItemToBasket as add, Delete, Increment, Decrement, TotalCount } from "../../../http/basketApi";


let initialState = {
    basketItems: [],
    totalCount: 0,
    basket: {
        count: 0,
        rows : []
    }
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
        if(res.status === 200) {
            fulfillWithValue('')
        } else {
            rejectWithValue('')
        }
    }
)

export const RemoveItemFromBasket = createAsyncThunk(
    'basket/RemoveItemFromBasket',
    async (action, { rejectWithValue, fulfillWithValue, dispatch }) => {
        dispatch(unsetBasketItem(action.itemId))
        await Delete(action.id)
        let total = await TotalCount(action.user_id)
        dispatch(totalCount(total.data))
        fulfillWithValue('')
    }
)

export const IncrementCount = createAsyncThunk(
    'basket/IncrementCount',
    async (action, {fulfillWithValue,rejectWithValue, dispatch}) => {
        const res = await Increment(action.id)
        const total = await TotalCount(action.user_id)
        if(res.status === 200) {
            dispatch(increment(action.index))
            dispatch(totalCount(total.data))
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
        const total = await TotalCount(action.user_id)
        if(res.status === 200) {
            dispatch(decrement(action.index))
            dispatch(totalCount(total.data))
            fulfillWithValue('')
        } else {
            rejectWithValue('')
        }
    }
)

export const Total = createAsyncThunk(
    'basket/Total',
    async (action, {fulfillWithValue,rejectWithValue,dispatch}) => {
        const res = await TotalCount(action)
        dispatch(totalCount(res.data))
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
            
            state.basket.rows = state.basket.rows.filter((item) => item.itemId !== action.payload)
            
        },
        increment: (state,action) => {
            state.basket.rows[action.payload].count = state.basket.rows[action.payload].count + 1
        },
        decrement: (state,action) => {
            state.basket.rows[action.payload].count = state.basket.rows[action.payload].count - 1
        },
        totalCount: (state,action) => {
            state.totalCount = action.payload
        }
    }
})




export const { getAllItems, setBasket, unsetBasketItem,increment,decrement,totalCount } = basketSlce.actions
export default basketSlce.reducer