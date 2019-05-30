import React, { Component } from "react";
import NavBar from "../navBar/NavBar.js";
import localStorage from "local-storage";
import Post from "../Post.js";
import Comment from "./Comment.js";
import LoadingPost from "../LoadingPost.js";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    const { id } = this.props.match.params;

    this.state = {
      postId: id,
      post_id: 0,
      tekst: "test",
      creatorProfile: {},
      dataIGodzina: "",
      commentList: [],

      isLoaded: false
    };
    this.getPost(id);
  }

  getPost(ajdi) {
    fetch("http://localhost:8081/user/posts/" + ajdi, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.get("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          post_id: response.post_id,
          tekst: response.tekst,
          creatorProfile: response.creatorProfile,
          dataIGodzina: response.dateAndTime,
          commentList: response.commentList,
          isLoaded: true
        });
      });
  }

  render() {
    if (this.state.isLoaded === true) {
      return (
        <div>
          <NavBar />
          <div class="row">
            <div class="col-lg-8 col-sm-8 offset-lg-2 offset-sm-2">
              <Post
                id={this.state.post_id}
                tekst={this.state.tekst}
                creator={this.state.creatorProfile}
                dataIGodzina={this.state.dataIGodzina}
                commentList={this.state.commentList}
              />
            </div>
          </div>

          {this.state.commentList.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.text}
              creator={comment.creator}
              dataIGodzina={comment.dateAndTime}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <LoadingPost />
        </div>
      );
    }
  }
}

export default PostPage;
