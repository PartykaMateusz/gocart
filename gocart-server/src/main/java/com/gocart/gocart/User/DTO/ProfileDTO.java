package com.gocart.gocart.User.DTO;

import com.gocart.gocart.User.Enum.Gender;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ProfileDTO {

    private Long user_id;

    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    private String email;

    private String avatar;

    private String city;

    private String telNumber;

    private Gender gender;

    private boolean isProfileCreated;

    private int groupNumber;

    private int eventsNumber;

}
