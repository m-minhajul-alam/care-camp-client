/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTable } from "react-table";
import campData from "../../../../public/campData.json";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ManageRegisteredCamps = () => {
  const data = React.useMemo(() => campData, [campData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Camp Name",
        accessor: "campName",
      },
      {
        Header: "Date and Time",
        accessor: "scheduledDateTime",
      },
      {
        Header: "Venue",
        accessor: "venueLocation",
      },
      {
        Header: "Camp Fees",
        accessor: "campFees",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
      },
      {
        Header: "Confirmation Status",
        accessor: "confirmationStatus",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <IconButton onClick={() => handleEdit(row.original)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteDialog(row.original)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleEdit = (camp) => {
    console.log("Edit camp:", camp);
  };

  const handleDelete = (camp) => {
    console.log("Delete camp:", camp);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);

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

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Manage Registered Camps
        </Typography>

        <Paper
          elevation={3}
          sx={{
            overflow: "auto",
            margin: "auto",
            width: "80%",
            maxWidth: "100%",
          }}
        >
          <table
            {...getTableProps()}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  style={{ borderBottom: "2px solid #ddd" }}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.column.id}
                        {...cell.getCellProps()}
                        style={{ border: "1px solid #ddd", padding: "8px" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Paper>

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
    </>
  );
};

export default ManageRegisteredCamps;
