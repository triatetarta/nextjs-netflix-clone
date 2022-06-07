import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  currentMovie: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state) => {
      state.modalOpen = true;
    },
    setModalClose: (state) => {
      state.modalOpen = false;
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
  },
});

export const { setModalOpen, setModalClose, setCurrentMovie } =
  modalSlice.actions;
export default modalSlice.reducer;
