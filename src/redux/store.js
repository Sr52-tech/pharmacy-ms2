import { configureStore } from '@reduxjs/toolkit'
import pharmacyReducer from './pharmacySlice'

export const store = configureStore({
    reducer: {
        pharmacy: pharmacyReducer
    }
})