import React, { Component } from "react";
import "./LeftPanel.css";
import localStorage from "local-storage";

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.getCurrentUser();
    this.getUserFriends();

    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      firstName: "",
      lastName: "",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png",
      friends: []
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
          firstName: response.firstName,
          lastName: response.lastName,
          avatar: response.avatar
        });
      });
  }

  getUserFriends() {
    fetch("http://localhost:8081/user/friends", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          friends: response
        });
      });
  }

  render() {
    return (
      <div className="container" id="leftkont">
        <div className="row">
          <div className="col-md-9 static">
            <div className="profile-card">
              <img
                src={this.state.avatar}
                alt="user"
                className="profile-photo"
              />
              <h5>
                <a href="/Myprofile" className="text-white">
                  {this.state.firstName} {this.state.lastName}
                </a>
              </h5>
              <a href="#" className="text-white">
                <i className="fa fa-user" /> {this.state.friends.length}{" "}
                znajomych
              </a>
            </div>
            <ul id="bebg" className="nav-news-feed">
              <li>
                <i className="fa fa-list-alt icon1" />
                <div>
                  <a href="/index">Aktualności</a>
                </div>
              </li>
              <li>
                <i className="fa fa-users icon2" />
                <div>
                  <a href="/groups">Grupy</a>
                </div>
              </li>

              <li>
                <i className="fa fa-calendar icon4" />
                <div>
                  <a href="/events">Wydarzenia</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftPanel;
