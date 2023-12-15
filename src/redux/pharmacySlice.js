import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productData: [],
    userInfo: null,
}

export const pharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.productData.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity += action.payload.quantity;
            }
            else {
                state.productData.push(action.payload);
            }
        },
        deleteItem: (state, action) => {
            state.productData = state.productData.filter((item) => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.productData = [];
        },
        incrementQuantity: (state, action) => {
            const item = state.productData.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.productData.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity -= 1;
            }
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
    },
})

export const { addToCart, deleteItem, clearCart, incrementQuantity, decrementQuantity, addUser, removeUser } = pharmacySlice.actions;
export default pharmacySlice.reducer;
