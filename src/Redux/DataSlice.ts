import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type DataObj = {
  id: number;
  name: string;
  email: string;
  department: string;
};
type CounterState = {
  rows: DataObj[];
};

/**
 * Data stored in localStorage is retrieved and parsed into an array.
 * If the string is null, an empty array is used as the initial state.
 */
const retrievedArray = JSON.parse(localStorage.getItem("myArray") || "[]");

/**
 * The initial state for the data slice is set to the retrieved array.
 */
const initialState: CounterState = {
  rows: retrievedArray,
};

/**
 * The data slice reducer is created using the createSlice() function from
 * the Redux Toolkit library. The reducer has two actions: setRows and addRow.
 *
 * The setRows action updates the state with the payload array, and saves
 * the stringified payload to localStorage.
 *
 * The addRow action pushes the payload onto the state array, and saves
 * the stringified state array to localStorage.
 */
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRows(state, action) {
      const rows = action.payload;
      const arrayString = JSON.stringify(rows);
      localStorage.setItem("myArray", arrayString);
      state.rows = rows;
    },
    addRow(state, action: PayloadAction<DataObj>) {
      state.rows.push(action.payload); // push the payload onto the state array
      const arrayString = JSON.stringify(state.rows); // stringify the state array
      localStorage.setItem("myArray", arrayString); // save to localStorage
    },
  },
});

/**
 * The exported actions for the data slice are the action creators
 * for the setRows and addRow actions.
 */
export const { setRows, addRow } = dataSlice.actions;

/**
 * The exported reducer for the data slice is the reducer function
 * returned by createSlice().
 */
export default dataSlice.reducer;

