import React, { Component } from "react";
import NavBar from "../navBar/NavBar.js";
import localStorage from "local-storage";
import { Redirect } from "react-router-dom";
import LeftPanel from "./LeftPanel.js";
import CenterPanel from "./CenterPanel.js";
import RightPanel from "./RightPanel.js";

class StartPage extends Component {
  constructor() {
    super();
    this.getCurrentUser();
    this.state = {
      isCurrentUserHaveProfile: "undef",
      isAuthenticated: "true"
    };
  }

  getCurrentUser() {
    fetch("http://localhost:8081/user/currentUser", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isCurrentUserHaveProfile: response.profileCreated
        });
      });
  }

  render() {
    if (this.state.isAuthenticated === "false") {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Token nieprawidłowy</div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do logowania
          </div>
        </div>
      );
    } else if (this.state.isCurrentUserHaveProfile === false) {
      return <Redirect to="/createProfile" />;
    } else if (this.state.isAuthenticated === "true") {
      return (
        <div>
          <NavBar />
          <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
            <div className="col-lg-3 col-sm-12">
              <LeftPanel />
            </div>
            <div className="col-lg-6 col-sm-12">
              <CenterPanel />
            </div>
            <div className="col-lg-3 col-sm-12">
              <RightPanel />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Error</div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do logowania
          </div>
        </div>
      );
    }
  }
}

export default StartPage;
