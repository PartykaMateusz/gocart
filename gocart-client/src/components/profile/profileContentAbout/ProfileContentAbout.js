import React, { Component } from "react";
import "./ProfileContentAbout.css";
import localStorage from "local-storage";

class ProfileContentAbout extends Component {
  constructor(props) {
    super(props);
    this.getCurrentUser();
    this.getUserFriends();

    this.state = {
      firstName: "",
      lastName: "",
      city: "",
      email: "",
      tel: "",
      gender: "",
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
          city: response.city,
          email: response.email,
          tel: response.telNumber,
          gender: response.gender,
          groupNumber: response.groupNumber,
          eventsNumber: response.eventsNumber
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
                  <h4 className="mb-1 line-height-5">2</h4>
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
