// src/components/ManageUpcomingCamps.js
import React from "react";
import { useTable } from "react-table";
import campData from "../../../../public/campData.json";
import { Typography } from "@mui/material";

const ManageUpcomingCamps = () => {
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
        Header: "Target Audience",
        accessor: "targetAudience",
      },
      {
        Header: "Participant Count",
        accessor: "participants.length",
      },
      {
        Header: "Interested Professionals Count",
        accessor: "healthcareProfessionals.length",
      },
      {
        Header: "Actions",
        Cell: () => (
          <>
            <button onClick={() => console.log("Delete")}>Delete</button>
            <button onClick={() => console.log("Update")}>Update</button>
            <button onClick={() => console.log("Publish")}>Publish</button>
            <button onClick={() => console.log("Accept Professionals")}>
              Accept Professionals
            </button>
            <button onClick={() => console.log("Accept Participants")}>
              Accept Participants
            </button>
            <button onClick={() => console.log("Review Professionals")}>
              Review Professionals
            </button>
            <button onClick={() => console.log("Review Participants")}>
              Review Participants
            </button>
          </>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Manage Upcoming Camps
      </Typography>
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
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
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
    </div>
  );
};

export default ManageUpcomingCamps;
