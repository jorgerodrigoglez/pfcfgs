import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenModal: false,
        format: false,
    },
    reducers:{
        onOpenModal: ( state ) => {
            state.isOpenModal = true;
            state.format = false;
        },
        onCloseModal: ( state ) => {
            state.isOpenModal = false;
            state.format = false;
        },
        onEditFormat: ( state ) => {
            state.format = true;
        }
    }
});

export const { onOpenModal, onCloseModal, onEditFormat } = uiSlice.actions;