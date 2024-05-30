"use client";

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentPlaceholder: 0,
    searchQuery: "",
}
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const {setSearchQuery} = searchSlice.actions;

export default searchSlice.reducer;