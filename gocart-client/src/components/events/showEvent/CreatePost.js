import React, { Component } from "react";
import localStorage from "local-storage";
import "../../authUserFrontPage/CreatePost.css";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.createEventPost = this.createEventPost.bind(this);

    this.state = {
      responseStatus: 0,
      actualInputValue: "",
      groupId: this.props.id
    };
  }

  createEventPost(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("http://localhost:8081/user/posts/events/" + this.state.groupId, {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    }).then(response => {
      this.setState({ responseStatus: response.status, actualInputValue: "" });
    });
    window.location.reload();
  }

  render() {
    if (this.state.responseStatus === 201) {
      return (
        <div>
          {this.successButton()}
          {this.addPostForm()}
        </div>
      );
    } else if (this.state.responseStatus === 0) {
      return this.addPostForm();
    } else {
      return (
        <div>
          {this.defeatButton()}
          {this.addPostForm()}
        </div>
      );
    }
  }

  addPostForm() {
    return (
      <div className="panel">
        <div className="panel-body">
          <form onSubmit={this.createEventPost}>
            <textarea
              id="post"
              className="form-control"
              name="tekst"
              placeholder="O czym myślisz?"
              maxLength="200"
              cols="80"
              rows="3"
              defaultValue={this.state.actualInputValue}
            />
            <div className="mar-top clearfix">
              <button
                className="btn btn-sm btn-primary pull-right"
                type="submit"
              >
                <i className="fa fa-pencil fa-fw" /> Udostępnij
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  successButton() {
    return (
      <div className="alert alert-success" role="alert">
        <div>Post został dodany</div>
      </div>
    );
  }

  defeatButton() {
    return (
      <div className="alert alert-danger" role="alert">
        <div>Post nie został dodany</div>
      </div>
    );
  }
}

export default CreatePost;
