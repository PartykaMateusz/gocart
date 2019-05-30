package com.gocart.gocart.Event.DTO;

import com.gocart.gocart.Event.Enum.EventStatus;
import com.gocart.gocart.Group.Enum.GroupStatus;
import com.gocart.gocart.User.DTO.ProfileDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class EventStatusDTO {

    private EventStatus eventStatus;
}
