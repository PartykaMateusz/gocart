import React, { Component } from "react";
import Navbar from "../navBar/NavBar.js";
import LeftPanel from "../authUserFrontPage/LeftPanel.js";
import RightPanel from "../authUserFrontPage/RightPanel.js";
import CreateEventFormPanel from "./createEventFormPanel/CreateEventFormPanel.js";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      }
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className="col-lg-3 col-sm-12">
            <LeftPanel />
          </div>
          <div className="col-lg-6 col-sm-12">
            <CreateEventFormPanel />
          </div>
          <div className="col-lg-3 col-sm-12">
            <RightPanel />
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default CreateEvent;
