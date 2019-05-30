import React, { Component } from "react";
import NavBarWithoutInvitations from "../navBar/NavBarWithoutInvitations.js";
import localStorage from "local-storage";
import User from "../SearchUser/User.js";

class Invitations extends Component {
  constructor(props) {
    super(props);
    this.getInvitations();
    this.state = {
      invitations: []
    };
  }

  getInvitations() {
    fetch("http://localhost:8081/user/friends/invitations", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          invitations: response
        });
      });
  }

  render() {
    return (
      <div>
        <NavBarWithoutInvitations />

        <h3 className="m-4">
          Zaproszenia do znajomych:{" "}
          <span className="label label-default">
            {this.state.invitations.length}
          </span>
        </h3>

        <ol className="list-numbered m-5">
          {this.state.invitations.map(invitation => (
            <User
              key={invitation.user_id}
              id={invitation.user_id}
              firstName={invitation.firstName}
              lastName={invitation.lastName}
            />
          ))}
        </ol>
      </div>
    );
  }
}

export default Invitations;
