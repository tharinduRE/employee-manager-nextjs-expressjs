import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Employee } from "../../interfaces/employee";
import { SpinnerUI } from "../spinnerUi";
import { getPhotoIfNotAvailable } from "../tableView";

type GridViewProps = {
  data?: Employee[];
  onEdit: (row: Employee) => void;
  onDelete: (row: Employee) => void;
};

export default function GridView({ data, onEdit, onDelete }: GridViewProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {
      !data ? (
        <SpinnerUI />
      ) : data && data?.length == 0 ? (
        <Alert severity="info">No Results Found</Alert>
      ) : (
        data?.map((row, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345, position: "relative" }}>
              <CardMedia
                component="img"
                height="192"
                image={
                  row?.photo || getPhotoIfNotAvailable(row)
                }
                alt="photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {row?.first_name} {row?.last_name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <b>{row?.email}</b>
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {row?.number}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {{ M: "Male", F: "Female" }[row?.gender]}
                </Typography>
              </CardContent>
              <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
                <Fab
                  size="small"
                  color="primary"
                  onClick={() => onEdit(row)}
                  aria-label="add"
                >
                  <Edit />
                </Fab>
                <Fab
                  size="small"
                  color="error"
                  onClick={() => onDelete(row)}
                  aria-label="add"
                >
                  <DeleteIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
