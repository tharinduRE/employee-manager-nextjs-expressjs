import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, CircularProgress, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Employee } from "../../interfaces/employee";
import ConfirmationDialog from "../confirmDialog";

export function TableView({ data }: { data?: Employee[] }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const router = useRouter();
  const dispatch = useDispatch();

  const onEdit = (row: any) => {
    dispatch({ type: "EMPLOYEE_SELECTED", payload: row });
    router.push(`/employee/edit/${row._id}`);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const onDelete = (row: any) => {
    setOpenConfirmDialog(true);
  };

  if (!data) return <CircularProgress />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell>
                <Image src={row?.photo || 'https://randomuser.me/api/portraits/lego/5.jpg'} width={64} height={64} alt={"photo"} />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row?.first_name}
              </StyledTableCell>
              <StyledTableCell>{row?.last_name}</StyledTableCell>
              <StyledTableCell>{row?.email}</StyledTableCell>
              <StyledTableCell>{row?.number}</StyledTableCell>
              <StyledTableCell align="center">{row?.gender}</StyledTableCell>
              <StyledTableCell align="center">
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
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <ConfirmationDialog
          open={openConfirmDialog}
          keepMounted={false}
          onClose={() => setOpenConfirmDialog(false)}
          id="confirmDialog"
          onAccept={() => {}}
        >
          Confirm Delete ?{" "}
        </ConfirmationDialog>
      </Table>
    </TableContainer>
  );
}
