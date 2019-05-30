import React, { Component } from "react";
import localStorage from "local-storage";
import EventInfo from "./EventInfo.js";

class EventPanelContent extends Component {
  constructor(props) {
    super(props);
    this.getOwnerEvents = this.getOwnerEvents.bind(this);
    this.getMemberEvents = this.getMemberEvents.bind(this);
    this.getOtherEvents = this.getOtherEvents.bind(this);
    this.getOwnerEvents();
    this.getMemberEvents();
    this.getOtherEvents();
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      ownerEvents: [],
      memberEvents: [],
      otherEvents: []
    };
  }

  getOwnerEvents() {
    fetch("http://localhost:8081/user/events/ownerEvents", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          ownerEvents: response
        });
      });
  }

  getMemberEvents() {
    fetch("http://localhost:8081/user/events/memberEvents", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          memberEvents: response
        });
      });
  }

  getOtherEvents() {
    fetch("http://localhost:8081/user/events/otherEvents", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          otherEvents: response
        });
      });
  }

  render() {
    return (
      <div style={this.state.containerStyle}>
        <a href="/createEvent">
          <button type="button" className="btn btn-success m-3 p-2">
            Stwórz nowe wydarzenie
          </button>
        </a>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <div>
            <h4> Moje wydarzenia:</h4>
          </div>
          {this.state.ownerEvents.map(event => (
            <EventInfo
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              location={event.location}
            />
          ))}
        </div>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <div>
            <h4>Wydarzenia, w których uczestniczysz:</h4>
          </div>
          {this.state.memberEvents.map(event => (
            <EventInfo
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              location={event.location}
            />
          ))}
        </div>
        <hr />
        <div className="col-lg-10 col-sm-12 offset-lg-1">
          <div>
            <h4>Inne Wydarzenia:</h4>
          </div>
          {this.state.otherEvents.map(event => (
            <EventInfo
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              location={event.location}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EventPanelContent;
