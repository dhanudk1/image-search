import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/image.slice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});
