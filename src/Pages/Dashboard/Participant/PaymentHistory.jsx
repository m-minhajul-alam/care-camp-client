import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useTable } from "react-table";
import campData from "../../../../public/campData.json";

const PaymentHistory = () => {
  const columns = React.useMemo(
    () => [
      { Header: "Camp Name", accessor: "campName" },
      { Header: "Date and Time", accessor: "scheduledDateTime" },
      { Header: "Venue", accessor: "venueLocation" },
      { Header: "Camp Fees", accessor: "campFees" },
      { Header: "Payment Status", accessor: "paymentStatus" },
      { Header: "Confirmation Status", accessor: "confirmationStatus" },
    ],
    []
  );

  const data = campData || [];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Payment History
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

export default PaymentHistory;
