"use client";

import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import searchReducer from "./features/search/searchSlice";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        search: searchReducer,
    },
});