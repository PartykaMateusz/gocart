import React, { Component } from "react";
import localStorage from "local-storage";

class Post extends Component {
  constructor(props) {
    super(props);
    this.comment = this.comment.bind(this);
    this.getCurrentUser();
    this.state = {
      postId: this.props.id,
      tekst: this.props.tekst,
      creator: this.props.creator,
      dataIGodzina: this.props.dataIGodzina,
      commentList: this.props.commentList,
      postSource: this.props.source,
      commentAvatar: "http://bootdey.com/img/Content/avatar/avatar3.png",

      responseStatus: 0,
      floatRight: {
        float: "right"
      }
    };
  }

  comment(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch("http://localhost:8081/user/" + this.state.postId + "/comments", {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    }).then(response => {
      this.setState({
        responseStatus: response.status,
        actualInputValue: ""
      });
    });
    setTimeout(function() {
      window.location.reload();
    }, 200);
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
        this.setState({
          commentAvatar: response.avatar
        });
      });
  }

  render() {
    return <div>{this.createPostDiv()}</div>;
  }

  createPostDiv() {
    return (
      <div className="profile-content">
        <div className="tab-content p-0">
          <div className="tab-pane fade active show" id="profile-post">
            <ul className="timeline">
              <li>
                <div className="timeline-body">
                  <div className="timeline-header">
                    <span className="userimage">
                      <img src={this.state.creator.avatar} alt="avatar" />
                    </span>
                    <span className="username">
                      <a href={`/Post/${this.state.postId}`}>
                        {this.state.creator.firstName}{" "}
                        {this.state.creator.lastName}
                      </a>
                      <small />
                    </span>
                    <span style={this.state.floatRight}>
                      {this.state.postSource}
                    </span>
                  </div>
                  <div className="timeline-content">
                    <p>{this.state.tekst}</p>
                  </div>
                  <div className="timeline-likes">
                    <div className="stats-right">
                      <span className="stats-text">
                        {this.state.commentList.length} Komentarzy
                      </span>
                    </div>
                    <div className="stats">
                      <span className="fa-stack fa-fw stats-icon">
                        <i className="fa fa-circle fa-stack-2x text-primary" />
                        <i className="fa fa-thumbs-up fa-stack-1x fa-inverse" />
                      </span>
                      <span className="stats-total">
                        {this.state.dataIGodzina}
                      </span>
                    </div>
                  </div>
                  <div className="timeline-footer">
                    <a
                      href="javascript:;"
                      className="m-r-15 text-inverse-lighter"
                    >
                      <i className="fa fa-comments fa-fw fa-lg m-r-3" />
                      <a href={`/Post/${this.state.postId}`}>Komentuj</a>
                    </a>
                  </div>
                  <div className="timeline-comment-box">
                    <div className="user">
                      <img src={this.state.commentAvatar} alt="avatar" />
                    </div>
                    <div className="input">
                      <form onSubmit={this.comment}>
                        <div className="input-group">
                          <input
                            type="text"
                            name="text"
                            className="form-control rounded-corner"
                            placeholder="Napisz komentarz.."
                            defaultValue={this.state.actualInputValue}
                          />
                          <span className="input-group-btn p-l-10">
                            <button
                              className="btn btn-primary f-s-12 rounded-corner"
                              type="submit"
                            >
                              Wyślij
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
