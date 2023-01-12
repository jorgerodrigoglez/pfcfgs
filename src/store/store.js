import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { uiSlice, notesSlice } from './';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        notes: notesSlice.reducer
    },
    // elimina error de fechas en la consola
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})