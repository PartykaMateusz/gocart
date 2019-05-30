import React, { Component } from "react";
import "./ProfileContentFriends.css";
import localStorage from "local-storage";
import User from "../../SearchUser/User.js";

class ProfileContentFriends extends Component {
  constructor(props) {
    super(props);
    this.getUserFriends();

    this.state = {
      friends: []
    };
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
      <div className="profile-content">
        <div className="tab-content p-0">
          <div className="tab-pane fade in active show" id="profile-friends">
            <h4 className="m-t-0 m-b-20">
              Liczba Znajomych: {this.state.friends.length}
            </h4>

            <div className="row row-space-2">
              {this.state.friends.map(friend => (
                <User
                  key={friend.user_id}
                  id={friend.user_id}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  avatar={friend.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContentFriends;
