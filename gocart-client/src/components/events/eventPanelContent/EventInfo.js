import React, { Component } from "react";

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#eeeeee",
        borderRadius: "6px"
      },
      name: this.props.name,
      id: this.props.id,
      description: this.props.description,
      location: this.props.location
    };
  }
  render() {
    return (
      <div style={this.state.containerStyle}>
        Nazwa: {this.state.name} <br />
        Opis: {this.state.description} <br />
        Miejsce: {this.state.location} <br />
        <a href={`/event/${this.state.id}`} class="table-link">
          <span class="fa-stack">
            <i class="fa fa-square fa-stack-2x" />
            <i class="fa fa-search-plus fa-stack-1x fa-inverse" />
          </span>
        </a>
      </div>
    );
  }
}

export default EventInfo;
