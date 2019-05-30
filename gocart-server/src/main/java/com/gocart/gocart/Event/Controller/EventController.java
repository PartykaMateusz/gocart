package com.gocart.gocart.Event.Controller;

import com.gocart.gocart.Event.DTO.EventDTO;
import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Event.Service.EventService;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("events/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id){
        try {
            return new ResponseEntity<>(eventService.getEvent(id),HttpStatus.OK);
        } catch (EventNotExist eventNotExist) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/events")
    public ResponseEntity<?> addEvent(@Valid EventDTO eventDTO,
                                      Authentication authentication){
        return new ResponseEntity<>(  eventService.addEvent(eventDTO, authentication.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/events/ownerEvents")
    public ResponseEntity<?> getEventWhichUserIsOwner(Authentication authentication){
        return new ResponseEntity<>(eventService.getUserEventsWhichIsOwner(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/events/memberEvents")
    public ResponseEntity<?> getEventsWhichUserIsMember(Authentication authentication){
        return new ResponseEntity<>(eventService.getUserEventsWhichIsMember(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/events/otherEvents")
    public ResponseEntity<?> getOtherEvents(Authentication authentication){
        return new ResponseEntity<>(eventService.getOtherEvents(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/events/{id}/status")
    public ResponseEntity<?> getEventsStatus(@PathVariable Long id,
                                            Authentication authentication){
        return new ResponseEntity<>(eventService.getGroupStatus(authentication.getName(),id),HttpStatus.OK);
    }

    @PutMapping("events/{id}/join")
    public ResponseEntity<?> joinToEvent(@PathVariable Long id,
                                         Authentication authentication){
        return new ResponseEntity<>(eventService.joinToGroup(id, authentication.getName()),HttpStatus.ACCEPTED);
    }

    @PutMapping("events/{id}/leave")
    public ResponseEntity<?> leaveEvent(@PathVariable Long id,
                                         Authentication authentication){
        return new ResponseEntity<>(eventService.leaveEvent(id, authentication.getName()),HttpStatus.ACCEPTED);
    }
}
