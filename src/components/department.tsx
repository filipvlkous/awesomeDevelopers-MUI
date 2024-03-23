import { Chip } from "@mui/material";

export default function DepartmentChip({ name }: { name: string }) {
  let colorChipBg;

  switch (name) {
    case "Marketing":
      colorChipBg = "blue";
      break;
    case "It":
      colorChipBg = "red";
      break;
    case "Sales":
      colorChipBg = "green";
      break;
    case "Managment":
      colorChipBg = "orange";
      break;
    case "Accounting":
      colorChipBg = "purple";
      break;
    default:
      colorChipBg = "blue";
      break;
  }

  return (
    <Chip
      label={name}
      sx={{
        backgroundColor: colorChipBg,
        color: "#fff",
      }}
    />
  );
}
