import React, { Component } from "react";
import localStorage from "local-storage";
import { Redirect } from "react-router-dom";

class updateAvatar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitEditAvatar = this.handleSubmitEditAvatar.bind(this);
    this.state = {
      responseStatus: 0
    };
  }

  handleSubmitEditAvatar(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:8081/user/profile/avatar", {
      method: "PUT",
      body: data,
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    }).then(response => {
      this.setState({ responseStatus: response.status });
    });
  }

  render() {
    if (this.state.responseStatus === 0) {
      return (
        <div>
          <form onSubmit={this.handleSubmitEditAvatar}>
            URL Avatara: <input type="text" name="avatar" />
            <input type="submit" value="potwierdź" />
          </form>
        </div>
      );
    }

    if (this.state.responseStatus === 201) {
      window.location.reload();
      return <Redirect to="/MyProfile" />;
    }
  }
}

export default updateAvatar;
