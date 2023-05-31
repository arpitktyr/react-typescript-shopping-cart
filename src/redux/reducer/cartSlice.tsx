import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  qty: number;
  image: string;
  title: string;
  price: number;
}

//interface CartState extends Array<CartItem> {}
//equal to CartItem[]

const initialState: CartItem[] = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },

    deleteItem: (state, action) => {
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    },

    increaseQty: (state, action) => {
      const product = action.payload;
      return state.map((item) =>
        item.id === product.id ? { ...item, qty: product.qty + 1 } : item
      );
    },

    decreaseQty: (state, action) => {
      const product = action.payload;
      return state.map((item) =>
        item.id === product.id
          ? { ...item, qty: product.qty > 1 ? product.qty - 1 : product.qty }
          : item
      );
    },
  },
});

//export const selectCart = (state: RootState) => state.cartSlice;
export const { deleteItem, increaseQty, decreaseQty, addProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
