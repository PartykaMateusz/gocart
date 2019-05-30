import React, { Component } from "react";
import "./NavBar.css";
import localStorage from "local-storage";
import { Redirect, Link } from "react-router-dom";
import { createHashHistory } from "history";
export const history = createHashHistory();

class StartTopBar extends Component {
  constructor(props) {
    super(props);
    this.isAuthenticated();
    this.wyszukaj = this.wyszukaj.bind(this);
    this.logout = this.logout.bind(this);
    this.goToInvitations = this.goToInvitations.bind(this);
    this.getInvitations();
    this.state = {
      isAuthenticated: "true",
      wyszukaj: "",
      goInvitations: "",
      invitations: []
    };
  }

  logout() {
    localStorage.clear();
    localStorage.set("message", "logout");
    this.setState({
      isAuthenticated: "goToLoginPage"
    });
  }

  goToInvitations() {
    this.setState({
      goInvitations: "goToInvitations"
    });
  }

  wyszukaj(event) {
    event.preventDefault();
    const name = event.target.search.value;
    localStorage.set("justOnce", "false");
    this.setState({
      wyszukaj: name
    });
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

  render() {
    if (this.state.wyszukaj !== "") {
      return <Redirect to={`/SearchUser/${this.state.wyszukaj}`} />;
    }
    if (this.state.goInvitations !== "") {
      return (
        <Redirect to="/invitations" invitations={this.state.invitations} />
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
    }
    if (this.state.isAuthenticated === "goToLoginPage") {
      return <Redirect to="/" />;
    } else {
      return (
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/index">
            GoCartBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/events">
                  <i className="fa fa-calendar icon4" />
                  Wydarzenia
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/groups">
                  <i className="fa fa-users" />
                  Grupy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Myprofile">
                  <i className="fa fa-user" />
                  Profil
                </a>
              </li>
            </ul>
            <ul className="navbar-nav " />
            <form className="form-inline my-2 my-lg-0" onSubmit={this.wyszukaj}>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Szukaj"
                aria-label="Search"
                name="search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Szukaj
              </button>
              <span>    </span>
            </form>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={this.goToInvitations}
                >
                  <i className="fa fa-handshake-o">
                    <span className="badge badge-success">
                      {this.state.invitations.length}
                    </span>
                  </i>
                  Zaproszenia
                </button>
                 
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={this.logout}
                >
                  <i className="fa fa-power-off" />
                  Wyloguj
                </button>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

export default StartTopBar;
