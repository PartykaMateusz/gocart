import React, { Component } from "react";
import "./ProfileContentAbout.css";
import localStorage from "local-storage";

class ProfileContentAbout extends Component {
  constructor(props) {
    super(props);
    this.sendInvitation = this.sendInvitation.bind(this);
    this.undoInvitation = this.undoInvitation.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.discardInvitation = this.discardInvitation.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    const id = this.props.id;
    this.getUser(id);
    this.getUserFriends();

    this.state = {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png",
      firstName: "",
      lastName: "",
      city: "",
      email: "",
      tel: "",
      gender: "",
      friendStatus: "",
      friends: []
    };
    this.getFriendStatus(id);
  }

  getUserFriends() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/" + ajdi, {
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

  getUser(ajdi) {
    fetch("http://localhost:8081/user/profile/" + ajdi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isUserExist: "true",
          firstName: response.firstName,
          lastName: response.lastName,
          city: response.city,
          email: response.email,
          tel: response.telNumber,
          gender: response.gender,
          avatar: response.avatar,
          groupNumber: response.groupNumber,
          eventsNumber: response.eventsNumber
        });
      })
      .catch(response => {
        this.setState({
          isUserExist: "false"
        });
      });
  }

  getFriendStatus(ajdi) {
    fetch("http://localhost:8081/user/friends/status/" + ajdi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          friendStatus: response.status
        });
      })
      .catch(response => {
        this.setState({
          friendStatus: "failed"
        });
      });
  }

  sendInvitation() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/invitations/" + ajdi, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({});
      })
      .catch(response => {
        this.setState({});
      });
    setTimeout(function() {
      window.location.reload();
    }, 100);
  }

  undoInvitation() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/invitations/" + ajdi, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({});
      })
      .catch(response => {
        this.setState({});
      });
    setTimeout(function() {
      window.location.reload();
    }, 100);
  }

  acceptInvitation() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/invitations/accept/" + ajdi, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({});
      })
      .catch(response => {
        this.setState({});
      });
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }

  discardInvitation() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/invitations/discard/" + ajdi, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({});
      })
      .catch(response => {
        this.setState({});
      });
    setTimeout(function() {
      window.location.reload();
    }, 100);
  }

  removeFriend() {
    const ajdi = this.props.id;
    fetch("http://localhost:8081/user/friends/" + ajdi, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({});
      })
      .catch(response => {
        this.setState({});
      });
    setTimeout(function() {
      window.location.reload();
    }, 100);
  }

  render() {
    if (this.state.friendStatus === "unknown") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-success m-3 p-2"
            onClick={this.sendInvitation}
          >
            Zaproś do znajomych
          </button>
          {this.getUserData()};
        </div>
      );
    }
    if (this.state.friendStatus === "friends") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-danger m-3 p-2"
            onClick={this.removeFriend}
          >
            Usuń ze znajomych
          </button>
          {this.getUserData()};
        </div>
      );
    }
    if (this.state.friendStatus === "hasInvitation") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-success m-3 p-2"
            onClick={this.acceptInvitation}
          >
            Potwierdź zaproszenie
          </button>
          <button
            type="button"
            className="btn btn-danger m-3 p-2"
            onClick={this.discardInvitation}
          >
            Usuń zaproszenie
          </button>
          {this.getUserData()};
        </div>
      );
    }
    if (this.state.friendStatus === "invited") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-warning m-3 p-2"
            onClick={this.undoInvitation}
          >
            Cofnij zaproszenie
          </button>
          {this.getUserData()};
        </div>
      );
    } else {
      return this.getUserData();
    }
  }

  getUserData() {
    return (
      <div className="col-md-5 col-centered">
        <div className="profile-card-4 z-depth-3">
          <div className="card">
            <div className="card-body text-center bg-primary rounded-top">
              <h5 className="mb-1 text-white">Informacje</h5>
              <h6 className="text-light">
                {this.state.firstName} {this.state.lastName}
              </h6>
            </div>
            <div className="card-body">
              <ul className="list-group shadow-none">
                <li className="list-group-item">
                  <div className="list-icon">
                    <i className="fa fa-map-marker" />
                  </div>
                  <div className="list-details">
                    <span>&emsp;{this.state.city}</span>
                    <small>&emsp;Miejscowość</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-icon">
                    <i className="fa fa-phone-square" />
                  </div>
                  <div className="list-details">
                    <span>  {this.state.tel}</span>
                    <small>  Numer telefonu</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-icon">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="list-details">
                    <span>  {this.state.email}</span>
                    <small>  Adres e-mail</small>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-icon">
                    <i className="fa fa-venus-mars" />
                  </div>
                  <div className="list-details">
                    <span>{this.state.gender}</span>
                    <small>Płeć</small>
                  </div>
                </li>
              </ul>
              <div className="row text-center mt-4">
                <div className="col p-2">
                  <h4 className="mb-1 line-height-5">
                    {this.state.friends.length}
                  </h4>
                  <small className="mb-0 font-weight-bold">Znajomi</small>
                </div>
                <div className="col p-2">
                  <h4 className="mb-1 line-height-5">
                    {this.state.groupNumber}
                  </h4>
                  <small className="mb-0 font-weight-bold">Grupy</small>
                </div>
                <div className="col p-2">
                  <h4 className="mb-1 line-height-5">
                    {this.state.eventsNumber}
                  </h4>
                  <small className="mb-0 font-weight-bold">Wydarzenia</small>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a
                href="javascript:void()"
                className="btn-social btn-facebook waves-effect waves-light m-1"
              >
                <i className="fa fa-facebook" />
              </a>
              <a
                href="javascript:void()"
                className="btn-social btn-google-plus waves-effect waves-light m-1"
              >
                <i className="fa fa-google-plus" />
              </a>
              <a
                href="javascript:void()"
                className="list-inline-item btn-social btn-behance waves-effect waves-light"
              >
                <i className="fa fa-instagram" />
              </a>
              <a
                href="javascript:void()"
                className="list-inline-item btn-social btn-dribbble waves-effect waves-light"
              >
                <i className="fa fa-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContentAbout;
