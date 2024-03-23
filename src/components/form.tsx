import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RestoreIcon from "@mui/icons-material/Restore";
import { useDispatch, useSelector } from "react-redux";
import { DataObj, addRow } from "../Redux/DataSlice";
import { RootState } from "../Redux/Store";
import { useRef, useState } from "react";

const variants = ["Marketing", "It", "Sales", "Managment", "Accounting"];
export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const nbRows = useSelector((state: RootState) => state.rows);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checked === false) return;

    const formEle = e.target as HTMLFormElement;

    const formData = new FormData(formEle);

    const generateUniqueId = (): number => {
      const randomNumber = getRandom();
      const isUnique = nbRows.every((item) => item.id !== randomNumber);
      return isUnique ? randomNumber : generateUniqueId();
    };

    const uniqueId = generateUniqueId();

    const data: DataObj = {
      id: uniqueId,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
    };
    dispatch(addRow(data));
    setChecked(false);
    formRef.current?.reset();
  };

  return (
    <Box
      width={"95%"}
      sx={{ backgroundColor: "white" }}
      borderRadius={2}
      boxShadow={2}
      p={2}
    >
      <Typography variant="h6">Add new visitor</Typography>
      <Typography variant="subtitle1" fontWeight={"light"}>
        Fill name, email adress, and department
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        // onReset={onReset}
        sx={{ paddingTop: 2 }}
        ref={formRef}
      >
        <Stack spacing={3}>
          <TextField
            name="name"
            label="Name"
            placeholder="John"
            color="secondary"
            focused
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="john@email.com"
            required
            color="secondary"
            focused
          />
          <TextField
            name="department"
            id="outlined-select-currency"
            label="Department"
            defaultValue="Marketing"
            color="secondary"
            select
            focused
          >
            {variants.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Checkbox
              checked={checked}
              value={checked}
              sx={{ paddingLeft: "12px" }}
              onClick={() => setChecked(!checked)}
            />
            <Typography>I agree to be added to the table</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              sx={{ borderRadius: 25 }}
              size="medium"
              type="reset"
              onClick={() => setChecked(false)}
            >
              Reset form
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              sx={{ borderRadius: 25 }}
              size="medium"
              type="submit"
            >
              Add new visitor
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

const getRandom = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  return randomNumber;
};
