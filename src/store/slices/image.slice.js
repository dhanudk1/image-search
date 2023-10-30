import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  images: [],
  loader: false,
};

export const getImages = createAsyncThunk(
  "image/getImages",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=31321868-20b1dd5e537bae1195a69442a&q=${name}&image_type=photo&pretty=true`
      );
      return response.data.hits;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const imageSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getImages.fulfilled, (state, { payload }) => {
      state.images = payload;
      state.loader = false;
    });
    builder.addCase(getImages.rejected, (state, action) => {
      state.loader = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = imageSlice.actions

export default imageSlice.reducer;
