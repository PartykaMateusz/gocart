import React, { Component } from "react";
import "./Comment.css";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      text: this.props.text,
      creator: this.props.creator,
      dataIGodzina: this.props.dataIGodzina
    };
  }

  render() {
    return (
      <div className="profile-content">
        <div id="asdd" className="timeline-body">
          <div className="timeline-comment-box">
            <div className="user">
              <img src={this.state.creator.avatar} alt="avatar" />
            </div>
            <h6>
              {this.state.creator.firstName} {this.state.creator.lastName}
            </h6>
            <h5>{this.state.text}</h5>
            <div className="timeline-likes">
              <div className="stats">
                <span className="fa-stack fa-fw stats-icon" />
                <span className="stats-total">{this.state.dataIGodzina}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
