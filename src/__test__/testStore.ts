import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataObj, DataState } from "../Redux/DataSlice";

const retrievedArray = [
  { id: 0, name: "test", email: "test", department: "It" },
  { id: 2, name: "test", email: "test", department: "Managment" },
  { id: 3, name: "test", email: "test", department: "Sales" },
];

const initialState: DataState = {
  rows: retrievedArray,
};

const dataSlice = createSlice({
  name: "dataTest",
  initialState,
  reducers: {
    setRows(state, action) {
      const arrayString = JSON.stringify(action.payload);
      //   localStorage.setItem("myArrayTest", arrayString);
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<DataObj>) {
      state.rows.push(action.payload); // push the payload onto the state array
      const arrayString = JSON.stringify(state.rows); // stringify the state array
      //   localStorage.setItem("myArray", arrayString); // save to localStorage
    },
  },
});

export const { setRows, addRow } = dataSlice.actions;

export default dataSlice.reducer;
