import React, { Component } from "react";
import SuggestedUser from "../../authUserFrontPage/suggestedUser/SuggestedUser.js";
import localStorage from "local-storage";

class EventUsersRightPanel extends Component {
  constructor(props) {
    super(props);
    this.getEventUsers = this.getEventUsers.bind(this);
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      id: this.props.id,
      eventMembers: []
    };
    this.getEventUsers(this.state.id);
  }

  getEventUsers(ajdi) {
    fetch("http://localhost:8081/user/events/" + ajdi + "/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          eventMembers: response
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
                    <strong>Uczestnicy wydarzenia:</strong>
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
                  {this.state.eventMembers.map(user => (
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

export default EventUsersRightPanel;
