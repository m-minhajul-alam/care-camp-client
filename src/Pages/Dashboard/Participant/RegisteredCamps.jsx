/* eslint-disable react/prop-types */
import { useTable } from "react-table";
import { useState } from "react";

// Replace with your actual JSON data
import campData from "../../../../public/campData.json";

const RegisteredCamps = () => {
  const [data, setData] = useState(campData);

  // Columns configuration
  const columns = [
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
        <div>
          <button
            onClick={() => handleCancel(row.original.id)}
            disabled={row.original.paymentStatus === "Paid"}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  const handleCancel = (campId) => {
    // Implement confirmation dialog logic here
    const confirmed = window.confirm("Are you sure you want to cancel?");
    
    if (confirmed) {
      // Update the confirmation status and reflect changes in the table
      const updatedData = data.map((camp) =>
        camp.id === campId
          ? { ...camp, confirmationStatus: "Cancelled" }
          : camp
      );
      setData(updatedData);
    }
  };

  // Use the useTable hook to create table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      <h1>Registered Camps</h1>
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

export default RegisteredCamps;
