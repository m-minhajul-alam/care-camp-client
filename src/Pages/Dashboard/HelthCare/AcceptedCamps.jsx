import {
  Container,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "react-query";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AcceptedCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    isFetching,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps`);
      return res.data;
    },
  });

  console.log(camps);

  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!camps) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        No Data Found
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        {error.message}
      </Box>
    );
  }

  const filteredCamps = camps?.filter(
    (camp) => camp.acceptanceStatus === "Accepted"
  );

  return (
    <Container>
      <Helmet>
        <title>Care Camp | Dashboard | Accepted Camps</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Manage Camps
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Camp Name
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Date and Time
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Venue
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCamps &&
              filteredCamps?.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.campName}</TableCell>
                  <TableCell>{camp.scheduledDateTime}</TableCell>
                  <TableCell>{camp.venueLocation}</TableCell>
                  <TableCell>
                    <Link to={`/campDetails/${camp._id}`}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AcceptedCamps;
