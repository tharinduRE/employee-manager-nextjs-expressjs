import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Employee } from "../../interfaces/employee";


export default function GridView({ data }: { data?: Employee[] }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const onEdit = (row: any) => {
    dispatch({ type: "EMPLOYEE_SELECTED", payload: row });
    router.push(`/employee/edit/${row.id}`);
  };

  if (!data) return <CircularProgress />;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data?.map((row, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={row?.photo || 'https://randomuser.me/api/portraits/lego/5.jpg'}
              alt="photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {row?.first_name} {row?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row?.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row?.gender}
              </Typography>
            </CardContent>
            <CardActions>
              <Button startIcon={<Edit/>} onClick={() => onEdit(row)}>Edit</Button>
              <IconButton aria-label="delete" color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
