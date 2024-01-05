import * as React from "react";
import { v4 as uuidv4 } from "uuid";
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
import {
  Button as Bt,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Typography
} from "@material-tailwind/react";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface conditionObj {
  key: string;
  name: string;
  inputValues: {};
  selectValue: string;
}

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
              : 1;
          row.inputValues[key] = defaultValue;
          return (
            <TextField
              size="small"
              className="mx-2"
              label={key}
              key={index}
              type="number"
              style={{ width: 100 }}
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
            size="small"
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

export default function ConditionTable() {
  const [selectedConditions, setSelectedConditions] = React.useState(undefined);

  const addConditionHandler = (row) => {
    const isEmpty =
      Object.values(row.inputValues).filter((val) => val === "").length > 0
        ? true
        : false;
    const conditionObj = {
      key: Math.floor(Date.now()),
      name: row.name,
      selectValue: row.selectValue,
      inputValues: row.inputValues
    };
    if (isEmpty) {
      alert("조건식 설정 내 빈칸을 채워주세요");
    } else if (!selectedConditions) {
      setSelectedConditions([conditionObj]);
    } else {
      const tmp = [...selectedConditions, ...[conditionObj]];
      setSelectedConditions(tmp);
    }
  };

  const deleteConditionHandler = (key: string) => {
    const filteredData = selectedConditions.filter((val) => val.key !== key);
    setSelectedConditions(filteredData);
  };

  const inputChangeHandler = (e, key, row) => {
    const inputValue = e.target.value;
    row.inputValues[key] = inputValue;
  };
  const onSelectHandler = (e, row) => {
    row.selectValue = e.target.value;
  };

  return (
    <>
      <TableContainer component={Paper} className="mb-4 max-h-[20rem]">
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader={true}
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" className="pl-6 font-bold">
                지표
              </TableCell>
              <TableCell align="left" className="pl-6 font-bold">
                조건 설정
              </TableCell>
              <TableCell align="left" className="pl-6"></TableCell>
              <TableCell align="left" className="pl-6 font-bold">
                추가하기
              </TableCell>
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
                  <Button className="flex" onClick={() => addConditionHandler(row)}>
                    조건 추가
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <Typography variant="h5" className="my-4">
        조건식
      </Typography>
      {selectedConditions ? (
        <Card className="w-full mb-4 max-h-[16rem] overflow-y-auto">
          <List>
            {selectedConditions.map((val: conditionObj) => (
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                <p className="font-bold">지표:</p>
                <p className="px-4">{val.name}</p>
                <p className="font-bold pr-5">해당 조건이</p>
                {Object.entries(val.inputValues).map((entry) => {
                  const [key, value] = entry;
                  return (
                    <p className="px-1">
                      ({key}: {String(value)})
                    </p>
                  );
                })}
                <p className="font-bold pl-5">
                  {val.selectValue === "higher"
                    ? "종가 기준으로 클 때"
                    : "작을 때"}
                </p>
                <ListItemSuffix>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => {
                      deleteConditionHandler(val.key);
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        </Card>
      ) : (
        <Card className="w-full mb-4 p-4 items-center">
          <img src="/advise.png" alt="advise" width={100} />
          <div className="mt-4 text-black">
            위에서 조건식을 먼저 추가해주세요
          </div>
        </Card>
      )}
      <div className="flex place-content-end mb-12">
        <Bt disabled={!selectedConditions} onClick={() => {console.log('terst', selectedConditions)}}>백테스트 실행</Bt>
      </div>
    </>
  );
}
