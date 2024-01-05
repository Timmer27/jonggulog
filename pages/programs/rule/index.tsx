import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

function createData(
  name: string,
  conditions: string[] = [],
  selects: string[]
) {
  const inputValues = {};
  const selectValue = "higher";
  conditions.forEach((key) => {
    inputValues[key] = "";
  });

  return { name, conditions, inputValues, selects, selectValue };
}

const CustomTableCell = ({ row, onChange, onSelect }) => {
  return (
    <>
      <TableCell align="left">
        {row.conditions.map((key, index) => {
          const defaultValue =
            row.name === "RSI" && key === "기간"
              ? 14
              : row.name.includes("MA") && key === "기간"
              ? 20
              : row.name === "RSI" && key === "값"
              ? 30
              : row.name === "RSI" && key === "값"
              ? 30
              : row.name === "RSI" && key === "값"
              ? 30
              : 0;
          console.log("row", row.name, key, defaultValue);
          return (
            <TextField
              className="mx-2"
              label={key}
              key={index}
              type="number"
              defaultValue={defaultValue}
              onChange={(e) => onChange(e, key, row)}
            />
          );
        })}
      </TableCell>
      <TableCell align="left">
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-autowidth-label">구분</InputLabel>
          <Select
            label="구분"
            onChange={(e) => onSelect(e, row)}
            defaultValue="higher"
          >
            {row.selects.map((key, index) => (
              <MenuItem value={key === "크다" ? "higher" : "lower"}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </>
  );
};

const rows = [
  createData("RSI", ["기간", "값"], ["크다", "작다"]),
  createData("SMA (이동평균선)-종가기준", ["기간"], ["크다", "작다"]),
  createData("SMA (지수이동평균선)-종가기준", ["기간"], ["크다", "작다"]),
  createData("스토캐스틱", ["input1"], ["크다", "작다"])
];

export default function BasicTable() {
  const onClickPrint = (row) => {
    console.log("Input values:", row);
  };
  const inputChangeHandler = (e, key, row) => {
    const inputValue = e.target.value;
    row.inputValues[key] = inputValue;
  };
  const onSelectHandler = (e, row) => {
    row.selectValue = e.target.value;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">지표</TableCell>
            <TableCell align="left" className="pl-6">
              조건 설정
            </TableCell>
            <TableCell align="left" className="pl-6">Actions</TableCell>
            <TableCell align="left" className="pl-6">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <CustomTableCell
                row={row}
                onChange={inputChangeHandler}
                onSelect={onSelectHandler}
              />
              <TableCell align="right">
                <Button onClick={() => onClickPrint(row)}>Print</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
