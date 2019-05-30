package com.gocart.gocart.Post.Comment.Controller;

import com.gocart.gocart.Post.Comment.DTO.CommentDTO;
import com.gocart.gocart.Post.Comment.Service.CommentService;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getAllPostComments(@PathVariable Long id){
        try {
            return new ResponseEntity<>(commentService.getAllPostComments(id), HttpStatus.OK);
        } catch (PostNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addCommentToPost(@PathVariable Long id,
                                              @Valid CommentDTO commentDTO,
                                              Authentication authentication){
        try {
            return new ResponseEntity<>(commentService.addCommentToPost(id,commentDTO,authentication.getName()), HttpStatus.OK);
        } catch (PostNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
