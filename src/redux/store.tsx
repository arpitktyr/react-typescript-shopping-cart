//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import handleCart from "./reducer/handleCart";
import cartSlice from "./reducer/cartSlice";
import productSlice from "./reducer/productSlice";
import categorySlice from "./reducer/categorySlice";

//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = configureStore({
  reducer: { categorySlice, cartSlice, productSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
