import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      user_id: this.props.id,
      avatar: this.props.avatar
    };
  }
  render() {
    return (
      <div className="col-md-6 m-b-2">
        <div className="p-10 bg-white">
          <div className="media media-xs overflow-visible">
            <a className="media-left" href="javascript:;">
              <img
                src={this.state.avatar}
                alt=""
                className="media-object img-circle"
              />
            </a>
            <div className="media-body valign-middle">
              <b className="text-inverse">
                {this.state.firstName} {this.state.lastName}
              </b>
            </div>
            <div className="media-body valign-middle text-right overflow-visible">
              <div className="btn-group dropdown">
                <a
                  href={`/profile/${this.state.user_id}`}
                  className="btn btn-default btn-success"
                >
                  Pokaż
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
