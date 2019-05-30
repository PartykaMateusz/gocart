import React, { Component } from "react";
import Navbar from "../navBar/NavBar.js";
import LeftPanel from "../authUserFrontPage/LeftPanel.js";
import RightPanel from "../authUserFrontPage/RightPanel";
import GroupsPanelContent from "./groupsPanelContent/GroupsPanelContent.js";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <GroupsPanelContent />
          </div>
          <div className="col-lg-3 col-sm-12">
            <RightPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default Groups;
