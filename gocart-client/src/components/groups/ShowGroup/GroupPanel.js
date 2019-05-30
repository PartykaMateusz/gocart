import React, { Component } from "react";
import localStorage from "local-storage";
import CreatePost from "./CreatePost";
import Post from "../../Post.js";

class GroupPanel extends Component {
  constructor(props) {
    super(props);
    this.getGroupStatus = this.getGroupStatus.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.getPostForm = this.getPostForm.bind(this);
    this.getGroupPosts = this.getGroupPosts.bind(this);

    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      groupStatus: "UNDEFINED",
      groupId: this.props.id,
      group: [],
      posts: []
    };

    this.getGroupStatus(this.state.groupId);
    this.getGroup(this.state.groupId);
    this.getGroupPosts(this.state.groupId);
  }

  getGroupStatus(ajdi) {
    fetch("http://localhost:8081/user/groups/" + ajdi + "/status/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          groupStatus: response.groupStatus
        });
      })
      .catch(response => {
        this.setState({
          friendStatus: "FAILED"
        });
      });
  }

  joinGroup() {
    fetch("http://localhost:8081/user/groups/" + this.state.groupId + "/join", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          groupStatus: response.groupStatus
        });
      })
      .catch(response => {
        this.setState({
          groupStatus: "FAILED"
        });
      });
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }

  getGroup(ajdi) {
    fetch("http://localhost:8081/user/groups/" + ajdi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          group: response
        });
      });
  }

  leaveGroup() {
    fetch(
      "http://localhost:8081/user/groups/" + this.state.groupId + "/leave",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.get("token")
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          groupStatus: response.groupStatus
        });
      })
      .catch(response => {
        this.setState({
          groupStatus: "FAILED"
        });
      });
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }

  getGroupPosts(ajdi) {
    fetch("http://localhost:8081/user/group/" + ajdi + "/posts/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          posts: response
        });
      });
  }

  render() {
    if (this.state.groupStatus === "NOT_MEMBER") {
      return (
        <div style={this.state.containerStyle}>
          {this.getJoinButton()}
          {this.getGroupInfo()}
        </div>
      );
    }
    if (this.state.groupStatus === "MEMBER") {
      return (
        <div>
          <div style={this.state.containerStyle}>
            {this.getLeaveButton()}
            {this.getGroupInfo()}
          </div>
          <div style={this.state.containerStyle}>{this.getPostForm()}</div>
          <div style={this.state.containerStyle}>
            {this.state.posts.map(post => (
              <Post
                key={post.post_id}
                id={post.post_id}
                tekst={post.tekst}
                creator={post.creatorProfile}
                dataIGodzina={post.dateAndTime}
                commentList={post.commentList}
                source={post.postSource}
              />
            ))}
          </div>
        </div>
      );
    }
    if (this.state.groupStatus === "OWNER") {
      return (
        <div>
          <div style={this.state.containerStyle}>
            {this.getDeleteButton()}
            {this.getGroupInfo()}
          </div>
          <div style={this.state.containerStyle}>{this.getPostForm()}</div>
          <div style={this.state.containerStyle}>
            {this.state.posts.map(post => (
              <Post
                key={post.post_id}
                id={post.post_id}
                tekst={post.tekst}
                creator={post.creatorProfile}
                dataIGodzina={post.dateAndTime}
                commentList={post.commentList}
                source={post.postSource}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <div>Ładowanie...</div>;
    }
  }

  getPostForm() {
    return <CreatePost id={this.state.groupId} />;
  }

  getJoinButton() {
    return (
      <button
        type="button"
        className="btn btn-success m-3 p-2"
        onClick={this.joinGroup}
      >
        Dołącz do grupy
      </button>
    );
  }

  getGroupInfo() {
    return (
      <div>
        Nazwa grupy: {this.state.group.name} <br />
        Opis Grupy: {this.state.group.description}
      </div>
    );
  }

  getLeaveButton() {
    return (
      <button
        type="button"
        className="btn btn-warning m-3 p-2"
        onClick={this.leaveGroup}
      >
        Opuść grupę
      </button>
    );
  }

  getDeleteButton() {
    return (
      <button type="button" className="btn btn-danger m-3 p-2">
        Usuń grupę
      </button>
    );
  }
}

export default GroupPanel;
