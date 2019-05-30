import React, { Component } from "react";
import CreatePost from "./CreatePost.js";
import Post from "../Post.js";
import localStorage from "local-storage";

class CenterPanel extends Component {
  constructor(props) {
    super(props);
    this.getAllMyFrontPagePosts = this.getAllMyFrontPagePosts.bind(this);
    this.getAllMyFrontPagePosts();
    this.state = {
      containerStyle: {
        margin: "25px 10px",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "6px"
      },
      postStyle: { margin: "0px", padding: "0px" },
      posts: []
    };
  }

  getAllMyFrontPagePosts() {
    fetch("http://localhost:8081/user/dashboard/posts/", {
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
    return (
      <div>
        <div style={this.state.containerStyle}>
          <CreatePost />
        </div>
        <div className={this.state.postStyle}>
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
}

export default CenterPanel;
