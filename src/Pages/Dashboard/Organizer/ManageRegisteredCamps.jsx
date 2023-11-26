import React from "react";
import { useTable } from "react-table";
import campData from "../../../../public/campData.json";
import { Typography } from "@mui/material";

const ManageRegisteredCamps = () => {
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
      },
    ],
    []
  );

  const data = React.useMemo(() => campData, [campData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Manage Registered Camps
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
                  <td key={cell.column.id} {...cell.getCellProps()}>
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

export default ManageRegisteredCamps;
