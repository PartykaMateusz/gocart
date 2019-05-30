import React, { Component } from "react";
import Navbar from "../../navBar/NavBar.js";
import LeftPanel from "../../authUserFrontPage/LeftPanel.js";
import EventPanel from "./EventPanel.js";
import EventUsersRightPanel from "./EventUsersRightPanel.js";

class Event extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id: id
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
            <EventPanel id={this.state.id} />
          </div>
          <div className="col-lg-3 col-sm-12">
            <EventUsersRightPanel id={this.state.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
