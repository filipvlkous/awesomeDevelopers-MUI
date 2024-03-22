import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DataObj = { id: number; name: string; email: string; department: string };

type CounterState = {
  rows: DataObj[];
};

const initialState: CounterState = {
  rows: [
    { id: 1, name: "Hello", email: "a@a.com", department: "World" },
    { id: 2, name: "DataGridPro", email: "b@b.com", department: "is Awesome" },
    { id: 3, name: "Grid", email: "c@c.com", department: "MUI" },
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<DataObj[]>) {
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<DataObj>) {
      state.rows.push(action.payload);
    },
  },
});

export const { setRows,addRow } = dataSlice.actions;

export default dataSlice.reducer;
