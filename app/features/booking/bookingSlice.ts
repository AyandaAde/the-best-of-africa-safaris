"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adultCount: 1,
    childrenCount: 0,
    infantCount: 0,
    guests: 1
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        removeAdult: (state) => {
            state.adultCount--;
            state.guests--;
        },
        addAdult: (state) => {
            state.adultCount++;
            state.guests++;
        },
        removeChild: (state) => {
            state.childrenCount--;
            state.guests--;
        },
        addChild: (state) => {
            state.childrenCount++;
            state.guests++;
        },
        removeInfant: (state) => {
            state.infantCount--;
            state.guests--;
        },
        addInfant: (state) => {
            state.infantCount++;
            state.guests++;
        },
        clearCount: (state) => {
            state.adultCount = 1;
            state.childrenCount = 0;
            state.infantCount = 0;
            state.guests = 1;
        },
    },
});

export const {removeAdult, addAdult, removeChild, addChild, removeInfant, addInfant, clearCount} = bookingSlice.actions;

export default bookingSlice.reducer;
