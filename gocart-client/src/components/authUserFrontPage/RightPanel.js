import React, { Component } from "react";
import "./RightPanel.css";
import SuggestedUser from "./suggestedUser/SuggestedUser";
import localStorage from "local-storage";

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.getSuggestedUsers = this.getSuggestedUsers.bind(this);
    this.getSuggestedUsers();
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      suggestedUsers: []
    };
  }

  getSuggestedUsers() {
    fetch("http://localhost:8081/user/friends/suggestions", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          suggestedUsers: response
        });
      });
  }

  render() {
    return this.content();
  }

  content() {
    return (
      <div className="container">
        <div className="row">
          <div id="dd" className="col-12">
            <div className="card golge">
              <div className="card-header text-center">
                <a href="#" className="isteColor">
                  <h6>
                    <strong>Propozycje znajomych</strong>
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
                  {this.state.suggestedUsers.map(user => (
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

export default LeftPanel;
