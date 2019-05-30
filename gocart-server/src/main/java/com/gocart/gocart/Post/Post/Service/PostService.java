package com.gocart.gocart.Post.Post.Service;

import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Post.Post.DTO.PostDTO;

import java.time.LocalDateTime;
import java.util.List;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public interface PostService {

    PostDTO getPost(Long id) throws PostNotExistException;

    PostDTO addPostToUser(String name, PostDTO postDTO);

    List<PostDTO> getMyPost(String name);

    List<PostDTO> getUserPosts(Long id);

    List<PostDTO> getAllFrontPagePosts(String name);

    PostDTO addPostToGroup(Long id, PostDTO postDTO, String creator) throws GroupNotExistException;

    List<PostDTO> getGroupPosts(Long id);

    String getDateAndTimeFromLocalDateTime(LocalDateTime dateTime);

    PostDTO addPostToEvent(Long id, PostDTO postDTO, String name) throws EventNotExist;

    List<PostDTO> getEventPosts(Long id);
}
