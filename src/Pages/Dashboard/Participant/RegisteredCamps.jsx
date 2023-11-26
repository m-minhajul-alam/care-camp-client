import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";

import campData from "../../../../public/campData.json";

const RegisteredCamps = () => {
  const [data, setData] = useState(campData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCampId, setSelectedCampId] = useState(null);

  const handleCancelClick = (campId) => {
    setSelectedCampId(campId);
    setOpenModal(true);
  };

  const handleCancelConfirm = () => {
    const updatedData = data.map((camp) =>
      camp.id === selectedCampId
        ? { ...camp, confirmationStatus: "Cancelled" }
        : camp
    );
    setData(updatedData);
    setOpenModal(false);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Registered Camps
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Camp Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Date and Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Venue</strong>
                </TableCell>
                <TableCell>
                  <strong>Camp Fees</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Confirmation Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>{camp.campName}</TableCell>
                  <TableCell>{camp.scheduledDateTime}</TableCell>
                  <TableCell>{camp.venueLocation}</TableCell>
                  <TableCell>{camp.campFees}</TableCell>
                  <TableCell>{camp.paymentStatus}</TableCell>
                  <TableCell>{camp.confirmationStatus}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCancelClick(camp.id)}
                      disabled={camp.paymentStatus === "Paid"}
                      sx={{ minWidth: 0 }}
                    >
                      <CancelOutlined />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Cancel Confirmation */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>Are you sure you want to cancel?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>No</Button>
            <Button onClick={handleCancelConfirm} color="error">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default RegisteredCamps;
