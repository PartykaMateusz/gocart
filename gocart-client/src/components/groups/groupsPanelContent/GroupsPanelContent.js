import React, { Component } from "react";
import GroupInfo from "./GroupInfo.js";
import localStorage from "local-storage";

class GroupsPanelContent extends Component {
  constructor(props) {
    super(props);
    this.getOwnerGroups = this.getOwnerGroups.bind(this);
    this.getMemberGroups = this.getMemberGroups.bind(this);
    this.getOtherGroups = this.getOtherGroups.bind(this);
    this.getOwnerGroups();
    this.getMemberGroups();
    this.getOtherGroups();
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      ownerGroups: [],
      memberGroups: [],
      otherGroups: []
    };
  }

  getOwnerGroups() {
    fetch("http://localhost:8081/user/groups/ownerGroups", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          ownerGroups: response
        });
      });
  }

  getMemberGroups() {
    fetch("http://localhost:8081/user/groups/myGroups", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          memberGroups: response
        });
      });
  }

  getOtherGroups() {
    fetch("http://localhost:8081/user/groups/other", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          otherGroups: response
        });
      });
  }

  render() {
    return (
      <div style={this.state.containerStyle}>
        <a href="/createGroup">
          <button type="button" className="btn btn-success m-3 p-2">
            Stwórz nową grupę
          </button>
        </a>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <h4> Moje Grupy:</h4>
          {this.state.ownerGroups.map(group => (
            <GroupInfo
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.description}
            />
          ))}
        </div>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <div>
            <h4>Grupy, do których należysz:</h4>
          </div>
          {this.state.memberGroups.map(group => (
            <GroupInfo
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.description}
            />
          ))}
        </div>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <div>
            <h4>Inne Grupy:</h4>
          </div>
          {this.state.otherGroups.map(group => (
            <GroupInfo
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.description}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GroupsPanelContent;
