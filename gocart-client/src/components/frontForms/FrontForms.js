import React, { Component } from "react";
import "./FrontForms.css";
import { Redirect } from "react-router-dom";
import localStorage from "local-storage";

class FrontForms extends Component {
  constructor() {
    super();
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);

    this.state = {
      statusRegister: 0,
      statusLogin: 0,
      access_token: 0,
      allResponse: 0
    };
  }
  /* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/

  cambiar_login() {
    document.querySelector(".cont_forms").className =
      "cont_forms cont_forms_active_login";
    document.querySelector(".cont_form_login").style.display = "block";
    document.querySelector(".cont_form_sign_up").style.opacity = "0";

    setTimeout(function() {
      document.querySelector(".cont_form_login").style.opacity = "1";
    }, 400);

    setTimeout(function() {
      document.querySelector(".cont_form_sign_up").style.display = "none";
    }, 200);
  }

  cambiar_sign_up(at) {
    document.querySelector(".cont_forms").className =
      "cont_forms cont_forms_active_sign_up";
    document.querySelector(".cont_form_sign_up").style.display = "block";
    document.querySelector(".cont_form_login").style.opacity = "0";

    setTimeout(function() {
      document.querySelector(".cont_form_sign_up").style.opacity = "1";
    }, 100);

    setTimeout(function() {
      document.querySelector(".cont_form_login").style.display = "none";
    }, 400);
  }

  ocultar_login_sign_up() {
    document.querySelector(".cont_forms").className = "cont_forms";
    document.querySelector(".cont_form_sign_up").style.opacity = "0";
    document.querySelector(".cont_form_login").style.opacity = "0";

    setTimeout(function() {
      document.querySelector(".cont_form_sign_up").style.display = "none";
      document.querySelector(".cont_form_login").style.display = "none";
    }, 500);
  }

  //SIGN UP && SIGN IN

  handleSubmitSignIn(event) {
    //Zaloguj Button
    event.preventDefault();

    let usernameOauth = "testjwtclientid";
    let passwordOauth = "XY7kmzoNzl100";

    let usernameFromForm = event.target.username.value;
    let passwordFromForm = event.target.password.value;

    var base64 = require("base-64");

    fetch(
      "http://localhost:8081/oauth/token?grant_type=password&username=" +
        usernameFromForm +
        "&password=" +
        passwordFromForm,
      {
        method: "POST",

        headers: {
          authorization:
            "Basic " + base64.encode(usernameOauth + ":" + passwordOauth),
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-headers": "*"
        },
        //referrer: "no-referrer", // no-referrer, *client
        credentials: "include"
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          statusLogin: 200,
          access_token: response.access_token
        });
      });
  }

  handleSubmitSignUp(event) {
    //Zarejestruj Button
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:8081/signup", {
      method: "POST",
      body: data
    }).then(response => {
      this.setState({ statusRegister: response.status });
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
        localStorage.set("user_id", response.user_id);
      });
  }

  render() {
    if (
      this.state.statusLogin === 200 &&
      this.state.access_token === undefined
    ) {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Błędny Login lub hasło</div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do strony głównej
          </div>
        </div>
      );
    }

    if (this.state.statusLogin === 200) {
      localStorage.clear();
      this.getCurrentUser();
      localStorage.set("token", this.state.access_token);
      return <Redirect to="/index" />;
    } else if (this.state.statusRegister === 0) {
      return (
        <div className="cont_centrar">
          <div className="cont_login">
            <div className="cont_info_log_sign_up">
              <div className="col_md_login">
                <div className="cont_ba_opcitiy">
                  <h2>ZALOGUJ SIĘ</h2>
                  <p />
                  <button
                    className="btn_login"
                    onClick={() => this.cambiar_login()}
                  >
                    Logowanie
                  </button>
                </div>
              </div>
              <div className="col_md_sign_up">
                <div className="cont_ba_opcitiy">
                  <h2>ZAŁÓŻ KONTO</h2>
                  <p />
                  <button
                    className="btn_sign_up"
                    onClick={() => this.cambiar_sign_up()}
                  >
                    Rejestracja
                  </button>
                </div>
              </div>
            </div>

            <div className="cont_back_info">
              <div className="cont_img_back_grey">
                {/* <img src="https://www.gtagangwars.de/suite/images/styleLogo-6bd77433ddf78bd8477ea7306e804f677bc925d0.png" alt="" /> */}
              </div>
            </div>
            <div className="cont_forms">
              <div className="cont_img_back_">
                {/* <img src="https://www.gtagangwars.de/suite/images/styleLogo-6bd77433ddf78bd8477ea7306e804f677bc925d0.png" alt="" /> */}
              </div>
              <div className="cont_form_login">
                <button
                  type="button"
                  className="btn btn-danger buttonX"
                  onClick={() => this.ocultar_login_sign_up()}
                >
                  x
                </button>
                <h2>ZALOGUJ SIĘ</h2>
                <form onSubmit={this.handleSubmitSignIn}>
                  <input type="text" name="username" placeholder="Login" />
                  <input type="password" name="password" placeholder="Hasło" />
                  <button className="btn_login">Zaloguj</button>
                </form>
              </div>

              <div className="cont_form_sign_up">
                <button
                  type="button"
                  className="btn btn-danger buttonX"
                  onClick={() => this.ocultar_login_sign_up()}
                >
                  x
                </button>
                <h2>ZAŁÓŻ KONTO</h2>
                <form onSubmit={this.handleSubmitSignUp}>
                  <input type="text" name="login" placeholder="Login" />
                  <input type="email" name="email" placeholder="Email" />
                  <input type="password" name="password" placeholder="Hasło" />
                  <button className="btn_sign_up">Zarejestruj</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.statusRegister === 201) {
      return (
        <div className="alert alert-success" role="alert">
          <div>Użytkownik został zarejestrowany. </div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do strony głównej
          </div>
        </div>
      );
    }
    if (this.state.statusRegister === 406) {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Email już istnieje w bazie danych. </div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do strony głównej
          </div>
        </div>
      );
    }
    if (this.state.statusRegister === 423) {
      return (
        <div className="alert alert-danger" role="alert">
          <div>Login już istnieje w bazie danych. </div>
          <div>
            Kliknij <a href="/">tutaj</a> aby powrócić do strony głównej
          </div>
        </div>
      );
    } else {
      return (
        <div className="alert alert-danger" role="alert">
          Error. Kliknij <a href="/">tutaj</a> aby powrócić do strony głównej
        </div>
      );
    }
  }
}

export default FrontForms;
