import React, { Component } from "react";
import NavBarWithoutSearch from "../navBar/NavBarWithoutSearch";
import localStorage from "local-storage";
import User from "./User.js";
import "./SearchUser.css";

function cancelCourse() {
  document.getElementById("myForm").reset();
}

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.wyszukaj = this.wyszukaj.bind(this);
    this.getUsers = this.getUsers.bind(this);

    this.state = {
      name: this.props.match.params.name,
      users: []
    };

    this.getUsers(this.props.match.params.name);
  }

  getUsers(name) {
    fetch("http://localhost:8081/user/profile?name=" + name, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          users: response
        });
      });
  }

  wyszukaj(event) {
    event.preventDefault();
    const name = event.target.search.value;
    cancelCourse();
    console.log("");
    this.setState({
      name: name
    });

    this.getUsers(name);
  }

  render() {
    return (
      <div>
        <NavBarWithoutSearch />
        <br />
        <form
          className="form-inline d-flex justify-content-center"
          id="myForm"
          onSubmit={this.wyszukaj}
        >
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Szukaj"
            aria-label="Search"
            name="search"
          />
          <button className="btn btn-outline-success" type="submit">
            Szukaj
          </button>
        </form>
        Aktualnie wyszukuje: {this.state.name}
        <ol className="list-numbered">
          {this.state.users.map(user => (
            <User
              avatar={user.avatar}
              key={user.user_id}
              id={user.user_id}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          ))}
        </ol>
      </div>
    );
  }
}

export default SearchUser;
