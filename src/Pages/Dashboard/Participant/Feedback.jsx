/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Rating,
} from "@mui/material";
import { useTable } from "react-table";
import campData from "../../../../public/campData.json";

const Feedback = () => {
  const filteredData = campData.filter(
    (camp) =>
      camp.paymentStatus === "Paid" && camp.confirmationStatus === "Confirmed"
  );

  const columns = React.useMemo(
    () => [
      { Header: "Camp Name", accessor: "campName" },
      { Header: "Date and Time", accessor: "scheduledDateTime" },
      { Header: "Venue", accessor: "venueLocation" },
      { Header: "Camp Fees", accessor: "campFees" },
      { Header: "Payment Status", accessor: "paymentStatus" },
      { Header: "Confirmation Status", accessor: "confirmationStatus" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <ReviewButton
            campId={row.original.id}
            campName={row.original.campName}
          />
        ),
      },
    ],
    []
  );

  const data = filteredData || [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Feedback
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
                        key={cell.row.id}
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
      </Container>
    </>
  );
};

// ReviewButton component
const ReviewButton = ({ campId, campName }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReview = () => {
    console.log("Feedback submitted for camp:", campName);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Review
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Review for {campName}
          </Typography>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Rating:
          </Typography>
          <Rating defaultValue={0} precision={0.5} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReview}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Feedback;
