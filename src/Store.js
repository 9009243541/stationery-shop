import { configureStore } from "@reduxjs/toolkit";
import stationeryApiSlice from "./Service";


const Store = configureStore({
  reducer: {
    [stationeryApiSlice.reducerPath]: stationeryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stationeryApiSlice.middleware),
});
export default Store;
