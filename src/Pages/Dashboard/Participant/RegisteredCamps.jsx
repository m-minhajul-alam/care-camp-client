/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import { Button, Modal, Typography, Box } from "@mui/material";

// Replace with your actual JSON data
import campData from "../../../../public/campData.json";
import { CancelOutlined } from "@mui/icons-material";

const RegisteredCamps = () => {
  const [data, setData] = useState(campData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCampId, setSelectedCampId] = useState(null);

  const columns = useMemo(
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCancelClick(row.original.id)}
            disabled={row.original.paymentStatus === "Paid"}
          >
            <CancelOutlined />
          </Button>
        ),
      },
    ],
    []
  );

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Registered Camps
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

      {/* Modal for Cancel Confirmation */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div">
            Are you sure you want to cancel?
          </Typography>
          <Button onClick={handleCancelConfirm} color="secondary">
            Yes
          </Button>
          <Button onClick={() => setOpenModal(false)}>No</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisteredCamps;
