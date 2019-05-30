import React, { Component } from "react";

class SuggestedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      id: this.props.id,
      avatar: this.props.avatar
    };
  }
  render() {
    return (
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="list-group">
            <div className="list-group-item list-group-item-action align-items-start  mb-1 p-1">
              <div
                className="d-flex justify-content-between align-items-center"
                data-toggle="tooltip"
              >
                <img src={this.state.avatar} className="img-arkadas" />
                <div className="flex-column mx-1">
                  <a href={`/profile/${this.state.id}`} className="text-dark">
                    <small>
                      <strong>
                        {this.state.firstName} {this.state.lastName}
                      </strong>
                    </small>
                  </a>
                </div>

                <a href={`/profile/${this.state.id}`}>
                  <button
                    className="btn btn-dark fa-pull-right btn-block golge w-35
                    h-25 mx-1"
                    type="button"
                  >
                    <i className="fa fa-user-plus" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestedUser;
