import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, CircularProgress, IconButton, TableSortLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses, TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from '@mui/utils';
import Image from "next/image";
import { Employee } from "../../interfaces/employee";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { EMPLOYEE_ORDER } from "../../store/reducers/employee";

type TableViewProps = {
  data?: Employee[];
  onEdit: (row: Employee) => void;
  onDelete: (row: Employee) => void;
};

interface HeadCell {
  id: keyof Employee;
  label: string;
  numeric?: boolean;
  nonSortable?:boolean;
  align?: TableCellProps['align']
}

const headCells: readonly HeadCell[] = [
  {
    id: 'photo',
    label: 'Photo',
    nonSortable:true,
  },
  {
    id: 'first_name',
    label: 'First Name',
  },
  {
    id: 'last_name',
    label: 'Last Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'number',
    label: 'Number',
        nonSortable:true,
  },
  {
    id: 'gender',
    label: 'Gender',
  },
  {
    id: 'id',
    label: 'Actions',
    nonSortable:true,
    align:'center'
  },
];

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function TableView({ data, onDelete, onEdit }: TableViewProps) {

  const {order,orderBy} = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const handleRequestSort = (
    property: keyof Employee,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch({
      type: EMPLOYEE_ORDER,
      payload: { order: isAsc ? "desc" : "asc", orderBy: property },
    });
  };

  if (!data) return <CircularProgress />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        {headCells.map((headCell) => (
          headCell.nonSortable ? 
          <HeadTableCell>{headCell.label}</HeadTableCell> :
          <HeadTableCell
            key={headCell.id}
            align={headCell.align ||  (headCell.numeric ? 'right' : 'left')}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => handleRequestSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </HeadTableCell>
        ))}
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Image
                  src={
                    row?.photo ||
                    "https://randomuser.me/api/portraits/lego/5.jpg"
                  }
                  width={64}
                  height={64}
                  alt={"photo"}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.first_name}
              </TableCell>
              <TableCell>{row?.last_name}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell>{row?.number}</TableCell>
              <TableCell align="center">{{ M: "Male", F: "Female" }[row?.gender]}</TableCell>
              <TableCell align="center">
                <Button startIcon={<Edit />} onClick={() => onEdit(row)}>
                  Edit
                </Button>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => onDelete(row)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
