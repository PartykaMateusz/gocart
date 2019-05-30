package com.gocart.gocart.Event.DTO;

import com.gocart.gocart.User.DTO.ProfileDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EventDTO {

    private Long id;

    @NotEmpty
    @NotNull
    @Size(min=1, max=200)
    private String name;

    @Size(min=1, max=200)
    private String description;

    private String location;

    private String localDateTime;

    private ProfileDTO owner;

    @NotNull
    private Long maxSize;

    private Long actualSize;


}
