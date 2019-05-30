import React, { Component } from "react";
import "./ProfileContentPosts.css";
import Post from "../../Post.js";
import localStorage from "local-storage";

class ProfileContentPosts extends Component {
  constructor(props) {
    super(props);
    this.getUserPosts();
    this.state = {
      posts: []
    };
  }

  getUserPosts() {
    fetch("http://localhost:8081/user/posts/", {
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
    if (this.state.posts.length != []) {
      return (
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-sm-8 offset-lg-2 offset-sm-2">
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
        </div>
      );
    } else {
      return (
        <ul class="timeline">
          <li>
            <div class="timeline-body">
              <div class="timeline-content">
                <p>Użytkownik nie posiada jeszcze postów</p>
              </div>
            </div>
          </li>
        </ul>
      );
    }
  }
}

export default ProfileContentPosts;
