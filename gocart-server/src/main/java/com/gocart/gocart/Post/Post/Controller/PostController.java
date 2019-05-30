package com.gocart.gocart.Post.Post.Controller;

import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Post.Post.DTO.PostDTO;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import com.gocart.gocart.Post.Post.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("")
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping("user/posts/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id){
        try {
            return new ResponseEntity<>(postService.getPost(id), HttpStatus.OK);
        } catch (PostNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("user/posts/")
    public ResponseEntity<?> getMyPost(Authentication authentication){
        return new ResponseEntity<>(postService.getMyPost(authentication.getName()), HttpStatus.OK);
    }

    @GetMapping("user/{id}/posts/")
    public ResponseEntity<?> getMyPost(@PathVariable Long id){
        return new ResponseEntity<>(postService.getUserPosts(id), HttpStatus.OK);
    }

    @PostMapping("user/posts/user")
    public ResponseEntity<?> addPostToUser(Authentication authentication,
                                           @Valid PostDTO postDTO){
        return new ResponseEntity<>(postService.addPostToUser(authentication.getName(),postDTO),HttpStatus.OK);
    }

    @GetMapping("/user/dashboard/posts")
    public ResponseEntity<?> getAllFrontPagePosts(Authentication authentication){
        return new ResponseEntity<>(postService.getAllFrontPagePosts(authentication.getName()),HttpStatus.OK);
    }

    //GROUP:
    @PostMapping("user/posts/group/{id}")
    public ResponseEntity<?> addPostToGroup(@PathVariable Long id,
                                           @Valid PostDTO postDTO,
                                            Authentication authentication){
        try {
            return new ResponseEntity<>(postService.addPostToGroup(id,postDTO,authentication.getName()),HttpStatus.CREATED);
        } catch (GroupNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("user/group/{id}/posts")
    public ResponseEntity<?> getGroupPost(@PathVariable Long id){
        return new ResponseEntity<>(postService.getGroupPosts(id), HttpStatus.OK);
    }

    //EVENTS:
    @PostMapping("user/posts/events/{id}")
    public ResponseEntity<?> addPostToEvent(@PathVariable Long id,
                                            @Valid PostDTO postDTO,
                                            Authentication authentication){
        try {
            return new ResponseEntity<>(postService.addPostToEvent(id,postDTO,authentication.getName()),HttpStatus.CREATED);
        } catch (EventNotExist eventNotExist) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("user/event/{id}/posts")
    public ResponseEntity<?> getEventPost(@PathVariable Long id){
        return new ResponseEntity<>(postService.getEventPosts(id), HttpStatus.OK);
    }

}
