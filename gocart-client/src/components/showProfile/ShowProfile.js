import React, { Component } from "react";
import "./ShowProfile.css";
import NavBar from "../navBar/NavBar.js";

import ProfileContentFriends from "./profileContentFriends/ProfileContentFriends.js";
import ProfileContentAbout from "./profileContentAbout/ProfileContentAbout.js";
import ProfileContentPosts from "./profileContentPosts/ProfileContentPosts.js";
import ProfileContentGocarts from "./profileContentGocarts/ProfileContentGocarts.js";
import localStorage from "local-storage";

function Content(props) {
  if (props.value === "posts") {
    return <ProfileContentPosts id={props.ajdi} />;
  }
  if (props.value === "about") {
    return <ProfileContentAbout id={props.ajdi} />;
  }
  if (props.value === "gocarts") {
    return <ProfileContentGocarts id={props.ajdi} />;
  }
  if (props.value === "friends") {
    return <ProfileContentFriends id={props.ajdi} />;
  } else {
    return <div>Error. Błąd ładowania contentu</div>;
  }
}

class ShowProfile extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.getUser(id);
    this.switchContentToAbout = this.switchContentToAbout.bind(this);
    this.switchContentToFriends = this.switchContentToFriends.bind(this);
    this.switchContentToPosts = this.switchContentToPosts.bind(this);
    this.switchContentToGocarts = this.switchContentToGocarts.bind(this);
    this.switchContentToEdit = this.switchContentToEdit.bind(this);

    this.state = {
      userID: id,
      isUserExist: "",
      firstName: "unnamed",
      lastName: "unnamed",
      city: "unnamed",
      value: "about",
      isAuthenticated: "true",
      postButtonClass: "nav-link",
      aboutButtonClass: "nav-link active show",
      gocartButtonClass: "nav-link",
      friendsButtonClass: "nav-link",
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

  resetActiveButtons() {
    this.setState({
      postButtonClass: "nav-link",
      aboutButtonClass: "nav-link",
      gocartButtonClass: "nav-link",
      friendsButtonClass: "nav-link"
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
          avatar: response.avatar
        });
      })
      .catch(response => {
        this.setState({
          isUserExist: "false"
        });
      });
  }

  render() {
    if (this.state.isUserExist === "false") {
      return (
        <div>
          <NavBar />
          <div className="alert alert-danger" role="alert">
            <div>Użytkownik o takim id nie istnieje</div>
          </div>
        </div>
      );
    }
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
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div id="content" className="content content-full-width">
                  <div className="profile">
                    <div className="profile-header">
                      <div className="profile-header-cover" />

                      {/* ------------------------------------------HEADER------------------------------------------- */}
                      <div className="profile-header-content">
                        <div className="profile-header-img">
                          <img src={this.state.avatar} alt="avatar" />
                        </div>
                        <div className="profile-header-info">
                          <h4 className="m-t-10 m-b-5">
                            {this.state.firstName} {this.state.lastName}
                          </h4>
                          <p className="m-b-10">{this.state.city} ‏‏‎ </p>
                          <span> </span>
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
                  <Content value={this.state.value} ajdi={this.state.userID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShowProfile;
