import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { DataObj, setRows } from "../Redux/DataSlice";
import DepartmentChip from "./department";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Visitor",
    minWidth: 50,
    maxWidth: 200,
    flex: 1,
  },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "department",
    headerName: "Department",
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <DepartmentChip name={params.value as string} />
    ),
  },
];

/**
 * Component for displaying the index page
 * @returns {JSX.Element} The component
 */
export default function Index() {
  // Get the number of rows from the state
  const nbRows = useSelector((state: RootState) => state.rows);
  // State for keeping track of whether the select all checkbox is checked or not
  const [check, setCheck] = useState(false);
  const [interCheck, setInterCheck] = useState(false);
  // Dispatch function to update the state
  const dispatch = useDispatch<AppDispatch>();
  // State for keeping track of the selected rows
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]); // Define a function to get the IDs of selected items

  /**
   * Function to remove selected rows
   */
  const removeRow = () => {
    // Remove the selected rows from the state
    dispatch(setRows(deleteRows()));
    // Set the checkbox to unchecked
    setCheck(false);
  };
  /**
   * Function to handle select all checkbox
   */
  const handleSelectAll = () => {
    // If there are no rows, return
    if (nbRows.length === 0) return;

    if (rowSelectionModel.length === 0) {
      // If no rows are selected, select all rows
      setRowSelectionModel(nbRows.map((row) => row.id));
      setCheck(true);
    } else {
      // If some rows are selected, uncheck all rows
      setRowSelectionModel([]);
      setCheck(false);
    }
  };

  /**
   * Function to remove the selected rows
   * @returns {DataObj[]} Array of rows that are not selected
   */
  const deleteRows = (): DataObj[] => {
    // filter metoda O(n)
    const foundItems = nbRows.filter(
      (item) => !rowSelectionModel.includes(item.id)
    );
    return foundItems;
  };

  return (
    <Box
      sx={{
        width: "97%",
        backgroundColor: "white",
        boxShadow: 2,
        borderRadius: 2,
      }}
      p={2}
    >
      <Typography variant="h4" sx={{ paddingBottom: 1 }}>
        Visitor managment
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Checkbox
          indeterminate={interCheck}
          checked={check}
          sx={{ paddingLeft: "12px" }}
          onClick={handleSelectAll}
        />
        <Button
          color="error"
          onClick={removeRow}
          variant="contained"
          sx={{ borderRadius: 25, color: "white" }}
          size="small"
        >
          Remove
        </Button>
      </Stack>
      <DataGrid
        rowHeight={75}
        sx={{ border: "none" }}
        rows={nbRows}
        columns={columns}
        hideFooter
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel: any) => {
          // If some rows are selected, set interCheck to true.
          // If all rows are selected, set interCheck to false.
          const isSelected = newRowSelectionModel.length > 0;
          const isAllRowsSelected =
            newRowSelectionModel.length === nbRows.length;
          setInterCheck(!isAllRowsSelected && isSelected);

          // Set check to true if there is at least one selected row.
          // Set check to false if there are no selected rows.
          setCheck(isSelected);

          // Update the selected rows.
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
}
