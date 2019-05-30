import React, { Component } from "react";
import localStorage from "local-storage";

class GroupsPanelContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      responseStatus: 0,
      defaultDate: "2019-05-28T15:00"
    };
    this.handleSubmitCreateEvent = this.handleSubmitCreateEvent.bind(this);
  }

  handleSubmitCreateEvent(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("http://localhost:8081/user/events/", {
      method: "POST",
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
      return this.getForm();
    } else if (this.state.responseStatus === 201) {
      return (
        <div>
          {this.successButton()} {this.getForm()}
        </div>
      );
    } else {
      return (
        <div>
          {this.defeatButton()} {this.getForm()}
        </div>
      );
    }
  }

  successButton() {
    return (
      <div className="alert alert-success" role="alert">
        <div>Wydarzenie zostało dodane</div>
      </div>
    );
  }

  defeatButton() {
    return (
      <div className="alert alert-danger" role="alert">
        <div>Wydarzenie nie zostało dodane</div>
      </div>
    );
  }

  getForm() {
    return (
      <div style={this.state.containerStyle}>
        <form onSubmit={this.handleSubmitCreateEvent}>
          <input
            class="form-control col-lg-6 col-sm-7 offset-lg-3"
            type="text"
            name="name"
            placeholder="Nazwa wydarzenia"
          />
          <br />
          <input
            class="form-control col-lg-6 col-sm-7 offset-lg-3"
            type="text"
            name="location"
            placeholder="Lokalizacja"
          />
          <br />
          <input
            class="form-control col-lg-6 col-sm-7 offset-lg-3"
            type="number"
            name="maxSize"
            placeholder="Ilosc miejsc"
          />
          <br />
          <input
            class="form-control col-lg-6 col-sm-7 offset-lg-3"
            type="datetime-local"
            name="localDateTime"
            defaultValue={this.state.defaultDate}
          />

          <textarea
            class="form-control col-lg-6 col-sm-7 offset-lg-3"
            name="description"
            placeholder="Opis"
            rows="5"
          />
          <button class="btn btn-info" type="submit">
            Utwórz wydarzenie
          </button>
        </form>
      </div>
    );
  }
}

export default GroupsPanelContent;
