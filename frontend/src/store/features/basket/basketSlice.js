import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { getBasketItems, addItemToBasket as add, Delete } from "../../../http/basketApi";
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
            state.basketItems.filter((item) => item.id !== action.payload)
        }
    }
})




export const { getAllItems, setBasket, unsetBasketItem } = basketSlce.actions
export default basketSlce.reducer