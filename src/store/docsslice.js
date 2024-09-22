import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  data: [],
  documentid: "",
};
const docslice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    login: function (state, action) {
      state.status = true;
      state.data = action.payload;
    },
    logout: function (state) {
      state.status = false;
      state.data = [];
    },
    docid: function (state, action) {
      state.documentid = action.payload;
    },
  },
});

export const { login, logout, docid } = docslice.actions;

export default docslice.reducer;
