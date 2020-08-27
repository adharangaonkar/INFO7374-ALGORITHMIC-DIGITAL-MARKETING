import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputData from "./componentes/InputData/InputData";
import FuturePrediction from "./componentes/FuturePrediction/FuturePrediction";
import TablueTry from "./componentes/TablueTry/TablueTry";
import TableuDash2 from "./componentes/TablueDash2/TableuDash2";
import CustomerChurn from "./componentes/CustomerChurn/CustomerChurn";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import PersonIcon from "@material-ui/icons/Person";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PieChartIcon from "@material-ui/icons/PieChart";
import "./App.css";
import Tablue3 from "./componentes/Tablue3/Tablue3";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(0);

  const listItemSelect = (num) => {
    setSelectedValue(num);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#0046be" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Best Buy Digital Marketing
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            "Next Purchase Date",
            "Sales Forecast",
            "Customer Lifetime Value",
            "RFM Analysis",
            "Revenue and Demand Analysis",
            "Customer Analysis",
          ].map((text, index) => (
            <ListItem button key={text} onClick={() => listItemSelect(index)}>
              <ListItemIcon>
                {text == "Sales Forecast" ? (
                  <TrendingUpOutlinedIcon
                    className={selectedValue == 1 ? "selected_color" : ""}
                  />
                ) : (
                  [
                    text == "Customer Lifetime Value" ? (
                      <PersonIcon />
                    ) : (
                      [
                        text == "RFM Analysis" ? (
                          <AssessmentIcon />
                        ) : (
                          [
                            text == "Revenue and Demand Analysis" ? (
                              <MonetizationOnIcon />
                            ) : (
                              [
                                text == "Next Purchase Date" ? (
                                  <EventAvailableIcon />
                                ) : (
                                  [
                                    text == "Customer Analysis" ? (
                                      <PieChartIcon />
                                    ) : (
                                      ""
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
              <Divider />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedValue === 0 ? (
          <InputData />
        ) : (
          [
            selectedValue === 1 ? (
              <FuturePrediction />
            ) : (
              [
                selectedValue === 2 ? (
                  <CustomerChurn />
                ) : (
                  [
                    selectedValue === 3 ? (
                      <TablueTry />
                    ) : (
                      [
                        selectedValue === 4 ? (
                          <TableuDash2 />
                        ) : (
                          [selectedValue == 5 ? <Tablue3 /> : ""]
                        ),
                      ]
                    ),
                  ]
                ),
              ]
            ),
          ]
        )}
      </main>
    </div>
  );
}
