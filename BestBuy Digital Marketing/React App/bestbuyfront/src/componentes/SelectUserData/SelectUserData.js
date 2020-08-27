import React, { useEffect, useState } from "react";
import { baseUrl } from "../../constants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import "./SelectUserData.css";

function SelectUserData({ userId }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getUserData() {
      await fetch(baseUrl + "/getUserData/" + userId)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    }
    getUserData();
  }, [userId]);
  console.log("userData = ", userData);
  return (
    <div>
      <Card className="table_width">
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Keys</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData &&
              Object.keys(userData).map(function (key) {
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{userData[key]}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </TableContainer>
      </Card>
    </div>
  );
}

export default SelectUserData;
