import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
    filter: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        setFilterValue(state, action) {
            //name is the same as the name of the function for the action generator
            state.filter = action.payload; //logic for processing the action reducer when we dispatch the action on the store
        },
    },
});

export const { setFilterValue } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
