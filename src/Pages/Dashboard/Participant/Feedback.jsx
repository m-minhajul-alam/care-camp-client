/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTable } from "react-table";
import {
  Typography,
  Modal,
  Button,
  Box,
  TextField,
  Rating,
} from "@mui/material";

// Replace with your actual JSON data
import campData from "../../../../public/campData.json";

const Feedback = () => {
  // Filter data for paid and completed camps
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
    <div>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Feedback
      </Typography>
      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
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
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell.row.id} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
    // Handle the submission of feedback and ratings
    // You can implement the logic to save the feedback and ratings
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
