import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function ClvCard({ name, value }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            <br />
            {value}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ClvCard;
