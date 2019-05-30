package com.gocart.gocart.Post.Comment.Service;

import com.gocart.gocart.Post.Comment.DTO.CommentDTO;
import com.gocart.gocart.Post.Comment.Entity.Comment;
import com.gocart.gocart.Post.Comment.Repository.CommentRepository;
import com.gocart.gocart.Post.Post.Entity.Post;
import com.gocart.gocart.Post.Post.Exception.PostNotExistException;
import com.gocart.gocart.Post.Post.Repository.PostRepository;
import com.gocart.gocart.Post.Post.Service.PostService;
import com.gocart.gocart.User.Entity.User;
import com.gocart.gocart.User.Repository.UserRepository;
import com.gocart.gocart.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Override
    public List<CommentDTO> getAllPostComments(Long id) throws PostNotExistException {
        Optional<Post> optionalPost = postRepository.findById(id);

        if(optionalPost.isPresent()){
            return this.getCommentDtoListFromCommentList(commentRepository.findByPost(optionalPost.get().getPost_id()));
        }
        else{
            throw new PostNotExistException("post not exist");
        }
    }

    @Override
    public List<CommentDTO> getCommentDtoListFromCommentList(List<Comment> comments) {
        List<CommentDTO> commentDTOList = new ArrayList<>();

        for(Comment comment: comments){
            commentDTOList.add(this.getCommentDtoFromComment(comment));
        }
        return commentDTOList;
    }

    @Override
    public CommentDTO getCommentDtoFromComment(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getKomentarz_id());
        commentDTO.setCreator(userService.getProfileDtoFromUser(comment.getCreator()));
        commentDTO.setDateAndTime(this.getDateAndTimeFromLocalDateTime(comment.getDateTime()));
        commentDTO.setText(comment.getText());

        return commentDTO;
    }

    private String getDateAndTimeFromLocalDateTime(LocalDateTime dateTime) {
        if(dateTime.getMinute()>9) {
            return dateTime.getDayOfMonth() + "-"
                    + dateTime.getMonth().getValue() + "-"
                    + dateTime.getYear() + "  "
                    + dateTime.getHour() + ":"
                    + dateTime.getMinute();
        }
        else {
            return dateTime.getDayOfMonth() + "-"
                    + dateTime.getMonth().getValue() + "-"
                    + dateTime.getYear() + "   "
                    + dateTime.getHour() + ":0"
                    + dateTime.getMinute();
        }
    }

    @Override
    public CommentDTO addCommentToPost(Long id, CommentDTO commentDTO, String name) throws PostNotExistException {
        Optional<Post> optionalPost = postRepository.findById(id);
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalPost.isPresent()){
            Post post = optionalPost.get();

            if(optionalUser.isPresent()) {
                commentDTO.setCreator(userService.getProfileDtoFromUser(optionalUser.get()));
            }
            else{
                throw new UsernameNotFoundException("user not exist");
            }
            Comment comment = this.getCommentFromCommentDTO(commentDTO);

            comment.setDateTime(LocalDateTime.now());

            commentRepository.save(comment);

            post.addComment(comment);
            postRepository.save(post);
            return commentDTO;
        }
        else{
            throw new PostNotExistException("post not exist");
        }

    }

    private Comment getCommentFromCommentDTO(CommentDTO commentDTO) {

        Comment comment = new Comment();
//        comment.setDateTime(commentDTO.getDateTime());
//        comment.setKomentarz_id(commentDTO.getId());
        comment.setText(commentDTO.getText());
        comment.setCreator(userService.getUserFromProfileDTO(commentDTO.getCreator()));

        return comment;
    }
}
