import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    arrActionFilteredNots: []
};

const filteredHistoryNotSlice = createSlice({
    name: 'filteredHistory',
    initialState,
    reducers: {
        setActionFilteredNots: (state, action) => {
            state.arrActionFilteredNots.push(action.payload);
        },
        setFilterActionNots: (state, action) => {
            state.arrActionFilteredNots = state.arrActionFilteredNots.filter(item => item.id !== action.payload);
        },
        setRemoveFilterActs: (state) => {
            state.arrActionFilteredNots = [];
        }
    }
});

export const {
    setActionFilteredNots,
    setFilterActionNots,
    setRemoveFilterActs
} = filteredHistoryNotSlice.actions;

export default filteredHistoryNotSlice.reducer;