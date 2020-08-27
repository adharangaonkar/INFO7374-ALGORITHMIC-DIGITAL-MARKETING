import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import SelectUserData from "../SelectUserData/SelectUserData";
import { baseUrl } from "../../constants";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

function InputData() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [selectedUserData, setSelectedUserData] = useState({});
  const [predictionOp, setPredictionOp] = useState(3);
  const [frequencyCluster, setFrequencyCluster] = useState();
  const [revenueCluster, setRevenueCluster] = useState();
  const [recencyCluster, setRecencyCluster] = useState();
  const [mailSent, setMailSent] = useState();

  useEffect(() => {
    async function getUserData() {
      await fetch(baseUrl + "/getUserData/" + selectedUser)
        .then((response) => response.json())
        .then((data) => {
          console.log("++++++++++++++++++++++" + JSON.stringify(data));
          setSelectedUserData(data);
          setFrequencyCluster(data.FrequencyCluster);
          setRecencyCluster(data.RecencyCluster);
          setRevenueCluster(data.RevenueCluster);
        });
    }
    getUserData();
  }, [selectedUser]);

  useEffect(() => {
    async function getUsers() {
      await fetch(baseUrl + "/getUsers")
        .then((response) => response.json())
        .then((data) => {
          setAllUsers(data.userId);
        });
    }
    getUsers();
  }, []);

  const userSelectChange = (e) => {
    setSelectedUser(e.target.value);
    setPredictionOp(3);
  };

  const predictionCall = () => {
    fetch(baseUrl + "/testPredict", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: selectedUserData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictionOp(data.prediction);
      });
  };

  const predictionCallUser = () => {
    async function getPredictionOp() {
      await fetch(baseUrl + "/testPredict/" + selectedUser)
        .then((response) => response.json())
        .then((data) => {
          setPredictionOp(parseInt(data.prediction));
        });
    }
    getPredictionOp();
  };

  const sendMail = () => {
    fetch(baseUrl + "/sendFlaskMail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RecencyCluster: recencyCluster,
        FrequencyCluster: frequencyCluster,
        RevenueCluster: revenueCluster,
        predictionVal: predictionOp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMailSent(1);
      });
  };
  return (
    <div>
      <h1>Next Purchase Prediction From UserID</h1>
      <FormControl className="app_dropdown">
        <Select
          variant="outlined"
          value={selectedUser}
          onChange={userSelectChange}
        >
          <MenuItem value="Select User">Select User</MenuItem>
          {allUsers.map((user) => (
            <MenuItem value={user}>{user}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedUserData && Object.keys(selectedUserData).length > 0 && (
        <SelectUserData userId={selectedUser} />
      )}
      {selectedUserData && Object.keys(selectedUserData).length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => predictionCallUser()}
        >
          Predict
        </Button>
      )}
      {predictionOp == 0 ? (
        <div>
          <h3>Customer will purchase in more than 50 days</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendMail()}
          >
            Send Email
          </Button>
        </div>
      ) : (
        [
          predictionOp == 1 ? (
            <div>
              <h3>Customer will purchase in next 21–49 days</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendMail()}
              >
                Send Email
              </Button>
            </div>
          ) : (
            [
              predictionOp == 2 ? (
                <div>
                  <h3>Customer will purchase in next 0–20 days </h3>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => sendMail()}
                  >
                    Send Email
                  </Button>
                </div>
              ) : (
                <h3>Customer Output</h3>
              ),
            ]
          ),
        ]
      )}
      {mailSent && mailSent == 1 ? (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMailSent(0);
                setPredictionOp(3);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Mail Sent!
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputData;
