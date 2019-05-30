package com.gocart.gocart.Post.Post.DTO;

import com.gocart.gocart.Post.Comment.DTO.CommentDTO;
import com.gocart.gocart.User.DTO.ProfileDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
public class PostDTO {

    private Long post_id;

    @NotNull
    @NotEmpty
    @Size(min=1, max=200)
    private String tekst;

    private ProfileDTO creatorProfile;

    private String DateAndTime;

    private List<CommentDTO> commentList;

    private String postSource;
}
