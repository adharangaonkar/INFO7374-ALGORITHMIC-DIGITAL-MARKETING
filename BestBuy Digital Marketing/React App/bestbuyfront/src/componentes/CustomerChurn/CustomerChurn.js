import React, { useState, useEffect } from "react";
import ClvCard from "../ClvCard/ClvCard";
import { baseUrl } from "../../constants";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import "./CustomerChurn.css";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

function CustomerChurn() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [purchaseFrequency, setPurchaseFrequency] = useState();
  const [repeatRate, setRepeatRate] = useState();
  const [churnRate, setChurnRate] = useState();
  const [clv, setClv] = useState();
  const [custLife, setCustLife] = useState();
  const [mailSent, setMailSent] = useState();

  useEffect(() => {
    async function getUsers() {
      await fetch(baseUrl + "/getUserCustomer")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.userId);
        });
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getFrequencyData() {
      await fetch(baseUrl + "/churnCalculations")
        .then((response) => response.json())
        .then((data) => {
          setPurchaseFrequency(data.purchase_frequency.toFixed(2));
          setRepeatRate(data.repeat_rate.toFixed(2));
          setChurnRate(data.churn_rate.toFixed(2));
        });
    }
    getFrequencyData();
  }, []);

  const userSelectChange = (e) => {
    setSelectedUser(e.target.value);
    setCustLife();
    setClv();
  };

  useEffect(() => {
    async function getUserData() {
      await fetch(baseUrl + "/getUserClv/" + selectedUser)
        .then((response) => response.json())
        .then((data) => {
          setClv(data.CLV.toFixed(2));
          setCustLife(data.cust_lifetime_value.toFixed(2));
        });
    }
    getUserData();
  }, [selectedUser]);

  const sendPromotionalCode = () => {
    fetch(baseUrl + "/sendPromotional")
      .then((response) => response.json)
      .then((data) => {
        setMailSent(1);
      });
  };

  return (
    <div>
      <h1>Customer Lifetime Value</h1>
      <div className="card_row">
        <ClvCard name="Purchase Frequency" value={purchaseFrequency} />
        <ClvCard name="Repeat Rate" value={repeatRate} />
        <ClvCard name="Churn Rate" value={churnRate} />
      </div>
      <FormControl className="app_dropdown">
        <Select
          variant="outlined"
          value={selectedUser}
          onChange={userSelectChange}
        >
          <MenuItem value="Select User">Select User</MenuItem>
          {users.map((user) => (
            <MenuItem value={user}>{user}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <h4>
        CLV : <p>{clv}</p>
      </h4>

      {custLife && custLife == 0 ? (
        <p>Customer Should be removed from promotional pool.</p>
      ) : (
        [
          custLife == 1 ? (
            <div>
              <p>Customer should be offered a new promotional code.</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendPromotionalCode()}
              >
                Send Promotional Code
              </Button>
            </div>
          ) : (
            ""
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

export default CustomerChurn;
