import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { baseUrl } from "../../constants";
import FutureDataTable from "../FutureDataTable/FutureDataTable";
import "./FuturePrediction.css";

function FuturePrediction() {
  const [period, setPeriod] = useState();
  const [predictedData, setPredictedData] = useState([]);
  const periodChange = (e) => {
    setPeriod(e.target.value);
  };
  const predictionCall = () => {
    fetch(baseUrl + "/predictSales", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ periods: period }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictedData(data.prediction);
      });
  };
  return (
    <div>
      <h1>Future Prediction</h1>
      <div className="button_text">
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
          onChange={(event) => periodChange(event)}
          value={period}
        />
        <div className="button_text">
          <Button
            variant="contained"
            color="primary"
            onClick={() => predictionCall()}
          >
            Predict
          </Button>
        </div>
      </div>
      {predictedData && predictedData.length > 0 && (
        <FutureDataTable futureData={predictedData} />
      )}
    </div>
  );
}

export default FuturePrediction;
