import type { IMovie } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  value: IMovie[]
}

const initialState = {
  value: JSON.parse(localStorage.getItem("saved") || "[]"),
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSaved: (state, action: PayloadAction<IMovie>) => {
      const index = state.value.findIndex(
        (item: IMovie) => item.id === action.payload.id
      );
      if (index < 0) {
        // add
        state.value.push(action.payload);
      } else {
        // remove
        state.value = state.value.filter(
          (item: IMovie) => item.id !== action.payload.id
        );
      }
      localStorage.setItem("saved", JSON.stringify(state.value));
    },
  },
});

export const { toggleSaved } = savedSlice.actions;

export default savedSlice.reducer;
