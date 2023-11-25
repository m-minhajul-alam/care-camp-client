import { useState } from "react";
import { styled } from "@mui/system";
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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import campData from "../../../../public/campData.json";

const ManageCamps = () => {
  const YourComponent = styled("div")({
    // Your component styles here
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEdit = (camp) => {
    // Handle the edit action
    console.log("Edit camp:", camp);
  };

  const handleDelete = (camp) => {
    // Handle the delete action
    console.log("Delete camp:", camp);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCamp(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCamp) {
      handleDelete(selectedCamp);
      handleDialogClose();
    }
  };

  const openDeleteDialog = (camp) => {
    setSelectedCamp(camp);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <YourComponent>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Manage Camps
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
                  <strong>Location</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((camp) => (
                  <TableRow key={camp.id}>
                    <TableCell>{camp.campName}</TableCell>
                    <TableCell>{camp.scheduledDateTime}</TableCell>
                    <TableCell>{camp.venueLocation}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(camp)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => openDeleteDialog(camp)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={campData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the camp?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </YourComponent>
  );
};

export default ManageCamps;
