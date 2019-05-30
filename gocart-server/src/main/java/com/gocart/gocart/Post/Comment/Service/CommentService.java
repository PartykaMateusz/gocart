package com.gocart.gocart.Post.Comment.Service;

import com.gocart.gocart.Post.Comment.DTO.CommentDTO;
import com.gocart.gocart.Post.Comment.Entity.Comment;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    List<CommentDTO> getAllPostComments(Long id) throws PostNotExistException;

    CommentDTO addCommentToPost(Long id, CommentDTO commentDTO, String name) throws PostNotExistException;

    List<CommentDTO> getCommentDtoListFromCommentList(List<Comment> comments);

    CommentDTO getCommentDtoFromComment(Comment comment);
}
