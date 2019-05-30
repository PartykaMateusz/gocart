import React, { Component } from "react";
import "./Profile.css";
import NavBar from "../navBar/NavBar.js";

import ProfileContentFriends from "./profileContentFriends/ProfileContentFriends.js";
import ProfileContentAbout from "./profileContentAbout/ProfileContentAbout.js";
import ProfileContentPosts from "./profileContentPosts/ProfileContentPosts.js";
import ProfileContentGocarts from "./profileContentGocarts/ProfileContentGocarts.js";
import ProfileContenEditProfile from "./profileContentEditProfile/ProfileContentEditProfile.js";
import UpdateAvatar from "./updateAvatar/updateAvatar.js";
import localStorage from "local-storage";

function Content(props) {
  if (props.value === "posts") {
    return <ProfileContentPosts />;
  }
  if (props.value === "about") {
    return <ProfileContentAbout />;
  }
  if (props.value === "gocarts") {
    return <ProfileContentGocarts />;
  }
  if (props.value === "friends") {
    return <ProfileContentFriends />;
  }
  if (props.value === "edit") {
    return <ProfileContenEditProfile />;
  }
  if (props.value === "avatar") {
    return <UpdateAvatar />;
  } else {
    return <div>Error. Błąd ładowania contentu</div>;
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getCurrentUser();
    this.switchContentToAbout = this.switchContentToAbout.bind(this);
    this.switchContentToFriends = this.switchContentToFriends.bind(this);
    this.switchContentToPosts = this.switchContentToPosts.bind(this);
    this.switchContentToGocarts = this.switchContentToGocarts.bind(this);
    this.switchContentToEdit = this.switchContentToEdit.bind(this);
    this.switchContentToAvatar = this.switchContentToAvatar.bind(this);

    this.state = {
      firstName: "unnamed",
      lastName: "unnamed",
      city: "unnamed",
      value: "about",
      isAuthenticated: "true",
      postButtonClass: "nav-link",
      aboutButtonClass: "nav-link active show",
      gocartButtonClass: "nav-link",
      friendsButtonClass: "nav-link",
      editButtonClass: "nav-link",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png"
    };
  }

  isAuthenticated() {
    fetch("http://localhost:8081/user/isAuthenticated", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          isAuthenticated: "true"
        });
      } else if (response.status === 401) {
        this.setState({
          isAuthenticated: "false"
        });
      }
    });
  }

  switchContentToPosts() {
    this.resetActiveButtons();
    this.setState({
      value: "posts",
      postButtonClass: "nav-link active show"
    });
  }

  switchContentToAbout() {
    this.resetActiveButtons();
    this.setState({
      value: "about",
      aboutButtonClass: "nav-link active show"
    });
  }

  switchContentToGocarts() {
    this.resetActiveButtons();
    this.setState({
      value: "gocarts",
      gocartButtonClass: "nav-link active show"
    });
  }

  switchContentToFriends() {
    this.resetActiveButtons();
    this.setState({
      value: "friends",
      friendsButtonClass: "nav-link active show"
    });
  }

  switchContentToEdit() {
    this.resetActiveButtons();
    this.setState({
      value: "edit"
    });
  }

  switchContentToAvatar() {
    this.resetActiveButtons();
    this.setState({
      value: "avatar"
    });
  }

  resetActiveButtons() {
    this.setState({
      postButtonClass: "nav-link",
      aboutButtonClass: "nav-link",
      gocartButtonClass: "nav-link",
      friendsButtonClass: "nav-link"
    });
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
          avatar: response.avatar,
          groupNumber: response.groupNumber,
          eventsNumber: response.eventsNumber
        });
      });
  }

  render() {
    if (this.state.isAuthenticated === "false") {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Token nieprawidłowy</div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do logowania
          </div>
        </div>
      );
    } else if (this.state.isAuthenticated === "true") {
      return (
        <div>
          <NavBar props={this.props} />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div id="content" className="content content-full-width">
                  <div className="profile">
                    <div className="profile-header">
                      <div className="profile-header-cover" />

                      {/* ------------------------------------------HEADER------------------------------------------- */}
                      <div className="profile-header-content">
                        <div
                          className="profile-header-img"
                          onClick={this.switchContentToAvatar}
                        >
                          <img src={this.state.avatar} alt="avatar" />
                        </div>
                        <div className="profile-header-info">
                          <h4 className="m-t-10 m-b-5">
                            {this.state.firstName} {this.state.lastName}
                          </h4>
                          <p className="m-b-10">{this.state.city} ‏‏‎ </p>
                          <a
                            onClick={this.switchContentToEdit}
                            className="btn btn-xs btn-yellow"
                          >
                            Edytuj profil
                          </a>
                        </div>
                      </div>
                      {/* ------------------------------------------------------------------------------------- */}

                      {/* active show */}
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item">
                          <button
                            className={this.state.postButtonClass}
                            data-toggle="tab"
                            onClick={this.switchContentToPosts}
                          >
                            POSTY
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={this.state.aboutButtonClass}
                            data-toggle="tab"
                            onClick={this.switchContentToAbout}
                          >
                            O MNIE
                          </button>
                        </li>
                        {/* <li className="nav-item">
                          <button
                            className={this.state.gocartButtonClass}
                            data-toggle="tab"
                            onClick={this.switchContentToGocarts}
                          >
                            GOKARTY
                          </button>
                        </li> */}
                        <li className="nav-item">
                          <button
                            className={this.state.friendsButtonClass}
                            data-toggle="tab"
                            onClick={this.switchContentToFriends}
                          >
                            ZNAJOMI
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Content value={this.state.value} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
