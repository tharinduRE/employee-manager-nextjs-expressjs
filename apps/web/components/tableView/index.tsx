import { Edit, FilterList, FilterListOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Popover,
  TableFooter,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {
  tableCellClasses,
  TableCellProps,
} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import _ from "lodash";
import Image from "next/image";
import { useState } from "react";
import { Employee } from "../../interfaces/employee";
import { PaginatedResults } from "../../interfaces/pagination";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  EMPLOYEE_FILTER,
  EMPLOYEE_ORDER,
  EMPLOYEE_PAGINATION,
} from "../../store/reducers/employee";
import { SpinnerUI } from "../spinnerUi";

type TableViewProps = {
  data?: PaginatedResults<Employee>;
  onEdit: (row: Employee) => void;
  onDelete: (row: Employee) => void;
};

interface HeadCell {
  id: keyof Employee;
  label: string;
  numeric?: boolean;
  nonSortable?: boolean;
  searchable?: boolean;
  align?: TableCellProps["align"];
}

const headCells: readonly HeadCell[] = [
  {
    id: "photo",
    label: "Photo",
    nonSortable: true,
  },
  {
    id: "first_name",
    label: "First Name",
    searchable: true,
  },
  {
    id: "last_name",
    label: "Last Name",
    searchable: true,
  },
  {
    id: "email",
    label: "Email",
    searchable: true,
  },
  {
    id: "number",
    label: "Number",
    searchable: true,
  },
  {
    id: "gender",
    label: "Gender",
    searchable: true,
  },
  {
    id: "id",
    label: "Actions",
    nonSortable: true,
    align: "center",
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

/**
 *  Helper function to retrive missing avatar images
 * @param row employee
 * @returns 
 */
export const getPhotoIfNotAvailable = (row: Employee) =>
    `https://randomuser.me/api/portraits/${
      { M: "men", F: "women" }[row?.gender]
    }/${row.id}.jpg`;

export function TableView({ data, onDelete, onEdit }: TableViewProps) {
  const { order, orderBy, filters } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: keyof Employee) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch({
      type: EMPLOYEE_ORDER,
      payload: { order: isAsc ? "desc" : "asc", orderBy: property },
    });
  };

  const handleSearchField = _.debounce(
    (property: keyof Employee, value: any) => {
      {
        dispatch({
          type: EMPLOYEE_FILTER,
          payload: { field: property, value },
        });
      }
    },
    500
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch({
      type: EMPLOYEE_PAGINATION,
      payload: { page: newPage },
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({
      type: EMPLOYEE_PAGINATION,
      payload: { pageSize: event?.target.value },
    });
  };

  const [anchorEls, setAnchorEl] = useState<{
    [s: string]: HTMLButtonElement | null;
  }>({});

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) =>
              headCell.nonSortable ? (
                <HeadTableCell key={headCell.id}>
                  {headCell.label}
                </HeadTableCell>
              ) : (
                <HeadTableCell
                  key={headCell.id}
                  align={
                    headCell.align || (headCell.numeric ? "right" : "left")
                  }
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                  {headCell.searchable && (
                    <>
                      <IconButton
                        onClick={(e) =>
                          setAnchorEl((prev) => ({
                            ...prev,
                            [headCell.id]: e.currentTarget,
                          }))
                        }
                      >
                        {Boolean(anchorEls[headCell.id]) ||
                        (filters[headCell.id] && filters[headCell.id] != "") ? (
                          <FilterListOff />
                        ) : (
                          <FilterList />
                        )}
                      </IconButton>
                      <Popover
                        id={headCell.id}
                        open={Boolean(anchorEls[headCell.id])}
                        anchorEl={anchorEls[headCell.id]}
                        onClose={() =>
                          setAnchorEl((prev) => ({
                            ...prev,
                            [headCell.id]: null,
                          }))
                        }
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Box sx={{ padding: 1 }}>
                          <TextField
                            id={headCell.id}
                            size="small"
                            variant="outlined"
                            type="search"
                            placeholder={`Search by ${headCell.label}`}
                            defaultValue={filters[headCell.id]}
                            onChange={(e) => {
                              e.preventDefault();
                              handleSearchField(headCell.id, e.target.value);
                            }}
                          />
                        </Box>
                      </Popover>
                    </>
                  )}
                </HeadTableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data ? (
            <TableRow>
              <TableCell colSpan={7}>
                <SpinnerUI />
              </TableCell>
            </TableRow>
          ) : data && data?.data?.length == 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Alert severity="info">No Results Found</Alert>
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((row, i) => (
              <StyledTableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Image
                    src={
                      row?.photo ||
                      getPhotoIfNotAvailable(row)
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
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {row?.number}
                </TableCell>
                <TableCell align="center">
                  {{ M: "Male", F: "Female" }[row?.gender]}
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
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
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {data && (
              <TablePagination
                colSpan={4}
                count={data?.pagination?.count}
                rowsPerPage={data?.pagination?.pageSize}
                page={data?.pagination?.page}
                showFirstButton={true}
                showLastButton={true}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
