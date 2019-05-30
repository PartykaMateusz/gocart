import React, { Component } from "react";
import SuggestedUser from "../../authUserFrontPage/suggestedUser/SuggestedUser.js";
import localStorage from "local-storage";

class GroupUsersRightPanel extends Component {
  constructor(props) {
    super(props);
    this.getGroupUsers = this.getGroupUsers.bind(this);
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      id: this.props.id,
      groupMembers: []
    };
    this.getGroupUsers(this.state.id);
  }

  getGroupUsers(ajdi) {
    fetch("http://localhost:8081/user/groups/" + ajdi + "/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          groupMembers: response
        });
      });
  }

  render() {
    return this.loadContent();
  }

  loadContent() {
    return (
      <div className="container">
        <div className="row">
          <div id="dd" className="col-12">
            <div className="card golge">
              <div className="card-header text-center">
                <a href="#" className="isteColor">
                  <h6>
                    <strong>Członkowie Grupy:</strong>
                  </h6>
                </a>
              </div>

              <div className="card-body p-1">
                <div
                  className="carousel vert slide "
                  id="carouselEx"
                  data-ride="carousel"
                  data-interval="2000"
                >
                  {this.state.groupMembers.map(user => (
                    <SuggestedUser
                      key={user.user_id}
                      id={user.user_id}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      avatar={user.avatar}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupUsersRightPanel;
