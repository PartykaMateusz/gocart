import React, { Component } from "react";
import localStorage from "local-storage";
import CreatePost from "./CreatePost";
import Post from "../../Post.js";

class EventPanel extends Component {
  constructor(props) {
    super(props);
    this.getEventStatus = this.getEventStatus.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
    this.leaveEvent = this.leaveEvent.bind(this);
    this.getPostForm = this.getPostForm.bind(this);
    this.getEventPosts = this.getEventPosts.bind(this);

    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      eventStatus: "UNDEFINED",
      eventId: this.props.id,
      event: [],
      posts: []
    };

    this.getEventStatus(this.state.eventId);
    this.getEvent(this.state.eventId);
    this.getEventPosts(this.state.eventId);
  }

  getEventStatus(ajdi) {
    fetch("http://localhost:8081/user/events/" + ajdi + "/status/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          eventStatus: response.eventStatus
        });
      })
      .catch(response => {
        this.setState({
          friendStatus: "FAILED"
        });
      });
  }

  joinEvent() {
    fetch("http://localhost:8081/user/events/" + this.state.eventId + "/join", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          eventStatus: response.groupStatus
        });
      })
      .catch(response => {
        this.setState({
          eventStatus: "FAILED"
        });
      });
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }

  getEvent(ajdi) {
    fetch("http://localhost:8081/user/events/" + ajdi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          event: response
        });
      });
  }

  leaveEvent() {
    fetch(
      "http://localhost:8081/user/events/" + this.state.eventId + "/leave",
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
          eventStatus: response.eventStatus
        });
      })
      .catch(response => {
        this.setState({
          eventStatus: "FAILED"
        });
      });
    setTimeout(function() {
      window.location.reload();
    }, 200);
  }

  getEventPosts(ajdi) {
    fetch("http://localhost:8081/user/event/" + ajdi + "/posts/", {
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
    if (this.state.eventStatus === "MEMBER") {
      return (
        <div>
          <div style={this.state.containerStyle}>
            {this.getLeaveButton()}
            {this.getEventInfo()}
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
    if (this.state.eventStatus === "OWNER") {
      return (
        <div>
          <div style={this.state.containerStyle}>
            {this.getDeleteButton()}
            {this.getEventInfo()}
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
    } //if size is max
    if (this.state.event.maxSize <= this.state.event.actualSize) {
      return (
        <div style={this.state.containerStyle}>
          {this.getInfoAboutMaxSize()}
          {this.getEventInfo()}
        </div>
      );
    }
    if (this.state.eventStatus === "NOT_MEMBER") {
      return (
        <div style={this.state.containerStyle}>
          {this.getJoinButton()}
          {this.getEventInfo()}
        </div>
      );
    } else {
      return <div>Ładowanie...</div>;
    }
  }

  getPostForm() {
    return <CreatePost id={this.state.eventId} />;
  }

  getJoinButton() {
    return (
      <button
        type="button"
        className="btn btn-success m-3 p-2"
        onClick={this.joinEvent}
      >
        Dołącz do grupy
      </button>
    );
  }

  getEventInfo() {
    return (
      <div>
        Nazwa grupy: {this.state.event.name} <br />
        Opis Grupy: {this.state.event.description} <br />
        Lokalizacja: {this.state.event.location} <br />
        Data: {this.state.event.localDateTime} <br />
        Ilość miejsc: {this.state.event.actualSize} / {this.state.event.maxSize}
        <br />
      </div>
    );
  }

  getLeaveButton() {
    return (
      <button
        type="button"
        className="btn btn-warning m-3 p-2"
        onClick={this.leaveEvent}
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

  getInfoAboutMaxSize() {
    return (
      <div class="alert alert-danger" role="alert">
        To wydarzenie posiada maksymalną ilość członków
      </div>
    );
  }
}

export default EventPanel;
