package com.gocart.gocart.Event.Service;

import com.gocart.gocart.Event.DTO.EventDTO;
import com.gocart.gocart.Event.DTO.EventStatusDTO;
import com.gocart.gocart.Event.Exception.EventNotExist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventService {

    EventDTO getEvent(Long id) throws EventNotExist;

    EventDTO addEvent(EventDTO eventDTO, String name);

    List<EventDTO> getUserEventsWhichIsOwner(String name);

    List<EventDTO> getUserEventsWhichIsMember(String name);

    List<EventDTO> getOtherEvents(String name);

    EventStatusDTO getGroupStatus(String name, Long id);

    EventDTO joinToGroup(Long id, String name);

    EventDTO leaveEvent(Long id, String name);
}
