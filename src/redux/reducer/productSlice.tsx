import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWrapper } from "../../Utils";
import { Constants } from "../../Constants/Index";
const { apiUrl } = Constants;

export interface ProductType {
  catId: string;
  price: number;
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  product: ProductType[];
  loading: boolean;
  error: string;
}

const product: ProductState = {
  product: [],
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk("getProduct", async (thunkAPI) => {
  let apiRes = await getWrapper(apiUrl + "products/");
  return apiRes.data.products;
});

const productSlice = createSlice({
  name: "productData",
  initialState: product,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
  },
});

export default productSlice.reducer;
