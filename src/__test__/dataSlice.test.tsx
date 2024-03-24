import dataReducer, { setRows, addRow, DataObj } from "../Redux/DataSlice";

describe("data reducer", () => {
  const initialState = {
    rows: [],
  };

  it("should handle setRows", () => {
    const rows: DataObj[] = [
      { id: 1, name: "John", email: "john@example.com", department: "IT" },
      { id: 2, name: "Alice", email: "alice@example.com", department: "HR" },
    ];
    const action = setRows(rows);
    const newState = dataReducer(initialState, action);
    expect(newState.rows).toEqual(rows);
  });

  it("should handle addRow", () => {
    const newRow: DataObj = {
      id: 3,
      name: "Bob",
      email: "bob@example.com",
      department: "Finance",
    };
    const action = addRow(newRow);
    const newState = dataReducer(initialState, action);
    expect(newState.rows).toHaveLength(1);
    expect(newState.rows[0]).toEqual(newRow);
  });

  it("should save to localStorage on setRows and addRow", () => {
    const rows: DataObj[] = [
      { id: 1, name: "John", email: "john@example.com", department: "IT" },
      { id: 2, name: "Alice", email: "alice@example.com", department: "HR" },
    ];
    const actionSetRows = setRows(rows);
    const stateAfterSetRows = dataReducer(initialState, actionSetRows);

    expect(localStorage.getItem("myArray")).toEqual(JSON.stringify(rows));

    const newRow: DataObj = {
      id: 3,
      name: "Bob",
      email: "bob@example.com",
      department: "Finance",
    };
    const actionAddRow = addRow(newRow);
    dataReducer(stateAfterSetRows, actionAddRow);

    const expectedRowsAfterAddRow = [...rows, newRow];
    expect(localStorage.getItem("myArray")).toEqual(
      JSON.stringify(expectedRowsAfterAddRow)
    );
  });
});
