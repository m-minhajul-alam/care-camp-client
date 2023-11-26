/* eslint-disable react/prop-types */
import React from "react";
import { useTable } from "react-table";
import {
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

// Replace with your actual JSON data
import campData from "../../../../public/campData.json";
import { ViewAgenda, Visibility } from "@mui/icons-material";

const AcceptedCamps = () => {
  const data = React.useMemo(() => {
    // Filter camps where professional's interest has been accepted
    return campData.filter((camp) => camp.acceptanceStatus === "Accepted");
  }, [campData]);

  const columns = React.useMemo(
    () => [
      { Header: "Camp Name", accessor: "campName" },
      { Header: "Date and Time", accessor: "scheduledDateTime" },
      { Header: "Venue", accessor: "venueLocation" },
      { Header: "Target Audience", accessor: "targetAudience" },
      { Header: "Acceptance Status", accessor: "acceptanceStatus" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewDetails(row.original.id)}
          >
            <Visibility />
          </Button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleViewDetails = (campId) => {
    // Handle the action to view details for the specific camp
    console.log(`View Details for Camp ID: ${campId}`);
    // Implement navigation to the detailed information page for the specific camp
  };

  return (
    <Container>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Accepted Camps
      </Typography>

      <TableContainer>
        <Table {...getTableProps()} style={{ width: "100%" }}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell key={column.id} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.row.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AcceptedCamps;
