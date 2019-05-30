import React, { Component } from "react";
import "./CreateProfile.css";
import localStorage from "local-storage";
import { Redirect } from "react-router-dom";

class CreateProfile extends Component {
  constructor() {
    super();
    this.isAuthenticated();
    this.handleSubmitCreateProfile = this.handleSubmitCreateProfile.bind(this);

    this.state = {
      isAuthenticated: "true",
      responseStatus: 0
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

  handleSubmitCreateProfile(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:8081/user/profile", {
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
      if (this.state.responseStatus === 0) {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmitCreateProfile}>
              <div className="card person-card">
                <div className="card-body">
                  <img
                    id="img_sex"
                    className="person-img"
                    src="https://visualpharm.com/assets/217/Life%20Cycle-595b40b75ba036ed117d9ef0.svg"
                    alt=""
                  />
                  <h2 id="who_message" className="card-title">
                    Kim jesteś?
                  </h2>

                  <div className="row">
                    <div className="form-group col-md-2">
                      <select
                        id="input_sex"
                        className="form-control"
                        name="gender"
                      >
                        <option value="mężczyzna">Mężczyzna</option>
                        <option value="kobieta">Kobieta</option>
                      </select>
                    </div>
                    <div className="form-group col-md-5">
                      <input
                        id="first_name"
                        type="text"
                        className="form-control"
                        placeholder="Imie"
                        required
                        name="firstName"
                      />
                      <div
                        id="first_name_feedback"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <input
                        id="last_name"
                        type="text"
                        className="form-control"
                        placeholder="Nazwisko"
                        required
                        name="lastName"
                      />
                      <div
                        id="last_name_feedback"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body col-md-12">
                      <h2 className="card-title">Dane dodatkowe</h2>
                      <div className="form-group ">
                        <label htmlFor="email" className="col-form-label">
                          Miejsce zamieszkania
                        </label>
                        <input
                          className="form-control"
                          id="email"
                          name="city"
                        />
                        <div className="email-feedback" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tel" className="col-form-label">
                          Numer telefonu
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tel"
                          placeholder="666 666 666"
                          name="telNumber"
                        />
                        <div className="phone-feedback" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="btn btn-primary btn-lg btn-block">
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        );
      }
      if (this.state.responseStatus === 201) {
        return <Redirect to="/index" />;
      }
      if (this.state.responseStatus === 404) {
        return (
          <div className="alert alert-danger" role="alert">
            <div>Error 404</div>
            <div>
              Kliknij <a href="/">tutaj</a> aby powrócić do logowania
            </div>
          </div>
        );
      }
    }
  }
}

export default CreateProfile;
