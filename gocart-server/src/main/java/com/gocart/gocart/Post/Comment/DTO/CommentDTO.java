package com.gocart.gocart.Post.Comment.DTO;

import com.gocart.gocart.User.DTO.ProfileDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class CommentDTO {

    @NotNull
    @NotEmpty
    @Size(min=1, max=200)
    private String text;

    private Long id;

    private String DateAndTime;

    private ProfileDTO creator;
}
