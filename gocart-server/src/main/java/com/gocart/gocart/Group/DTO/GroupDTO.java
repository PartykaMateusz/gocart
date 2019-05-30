package com.gocart.gocart.Group.DTO;

import com.gocart.gocart.User.DTO.ProfileDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class GroupDTO {

    private Long id;

    @NotEmpty
    @NotNull
    @Size(min=1, max=200)
    private String name;

    private String description;

    private ProfileDTO owner;
}
