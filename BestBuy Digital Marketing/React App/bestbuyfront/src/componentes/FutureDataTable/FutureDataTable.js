import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function FutureDataTable({ futureData }) {
  const [headKeys, setHeadKeys] = useState([]);

  useEffect(() => {
    setHeadKeys(Object.keys(futureData[0]));
  }, [futureData]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headKeys.map((key) => (
                <TableCell>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {futureData.map((data) => {
              return (
                <TableRow>
                  {headKeys.map((key) => {
                    return (
                      <TableCell>
                        {key == "ds"
                          ? data[key]
                          : parseFloat(data[key]).toFixed(2)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FutureDataTable;
