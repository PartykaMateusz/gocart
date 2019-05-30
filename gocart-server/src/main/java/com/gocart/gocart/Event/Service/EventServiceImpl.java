package com.gocart.gocart.Event.Service;

import com.gocart.gocart.Event.DTO.EventDTO;
import com.gocart.gocart.Event.DTO.EventStatusDTO;
import com.gocart.gocart.Event.Entity.Event;
import com.gocart.gocart.Event.Enum.EventStatus;
import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Event.Repository.EventRepository;
import com.gocart.gocart.Group.DTO.GroupStatusDTO;
import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Group.Enum.GroupStatus;
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
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    UserRepository userRepository;

    @Override
    public EventDTO getEvent(Long id) throws EventNotExist {
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if(optionalEvent.isPresent()){
            Event event = optionalEvent.get();
            return this.getEventDtoFromEvent(event);
        }
        else{
            throw new EventNotExist("event not exist");
        }
    }

    @Override
    public EventDTO addEvent(EventDTO eventDTO, String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            User creator = optionalUser.get();

            eventDTO.setOwner(userService.getProfileDtoFromUser(creator));

            Event event= this.getEventFromEventDto(eventDTO);
            event.setOwner(creator);
            event.setUsers(new ArrayList<>());

            userRepository.save(creator);
            eventRepository.save(event);

            event.addUser(creator);
            creator.addEvent(event);

            eventRepository.save(event);
            userRepository.save(creator);

            return this.getEventDtoFromEvent(event);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<EventDTO> getUserEventsWhichIsOwner(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<EventDTO> eventList = this.getEventDtoListFromEventList(optionalUser.get().getEvents());
            return eventList.stream()
                    .filter(p -> p.getOwner().getUser_id() == optionalUser.get().getUser_id())
                    .collect(Collectors.toList());
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<EventDTO> getUserEventsWhichIsMember(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<EventDTO> eventList = this.getEventDtoListFromEventList(optionalUser.get().getEvents());
            return eventList.stream()
                    .filter(p -> p.getOwner().getUser_id() != optionalUser.get().getUser_id())
                    .collect(Collectors.toList());
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<EventDTO> getOtherEvents(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<Event> eventList = eventRepository.findOtherEvents(optionalUser.get().getUser_id());
            eventList.removeAll(optionalUser.get().getEvents());

            return this.getEventDtoListFromEventList(eventList);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public EventStatusDTO getGroupStatus(String name, Long id) {
        Optional<User> optionalUser = userRepository.findByUsername(name);
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if(optionalUser.isPresent() && optionalEvent.isPresent()){
            User user = optionalUser.get();
            Event event = optionalEvent.get();

            //if event contains member return MEMBER
            if(user.getEvents().contains(event)){
                //if user is group owner reurn OWNER
                if(event.getOwner().equals(user)){
                    return this.getEventStatusDtoFromEnum(EventStatus.OWNER);
                }
                else{
                    return this.getEventStatusDtoFromEnum(EventStatus.MEMBER);
                }
            }
            //else return NOT_MEMBER
            return this.getEventStatusDtoFromEnum(EventStatus.NOT_MEMBER);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    @Override
    public EventDTO joinToGroup(Long id, String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if(optionalUser.isPresent() && optionalEvent.isPresent()){
            User user = optionalUser.get();
            Event event = optionalEvent.get();

            event.addUser(user);
            user.addEvent(event);

            userRepository.save(user);
            eventRepository.save(event);

            return this.getEventDtoFromEvent(event);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    @Override
    public EventDTO leaveEvent(Long id, String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if(optionalUser.isPresent() && optionalEvent.isPresent()){
            User user = optionalUser.get();
            Event event = optionalEvent.get();

            event.removeUser(user);
            user.removeEvent(event);

            userRepository.save(user);
            eventRepository.save(event);

            return this.getEventDtoFromEvent(event);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    private EventStatusDTO getEventStatusDtoFromEnum(EventStatus eventStatus) {
        EventStatusDTO eventStatusDTO = new EventStatusDTO();
        eventStatusDTO.setEventStatus(eventStatus);
        return eventStatusDTO;
    }

    private List<EventDTO> getEventDtoListFromEventList(List<Event> events) {
        List<EventDTO> eventDTOS = new ArrayList<>();

        for(Event event : events){
            eventDTOS.add(this.getEventDtoFromEvent(event));
        }

        return eventDTOS;
    }

    private EventDTO getEventDtoFromEvent(Event event){
        EventDTO eventDTO = new EventDTO();
        eventDTO.setId(event.getEvent_id());
        eventDTO.setName(event.getName());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setOwner(userService.getProfileDtoFromUser(event.getOwner()));
        eventDTO.setLocation(event.getLocation());
        eventDTO.setLocalDateTime(event.getDateTime().toString());
        eventDTO.setMaxSize(event.getMaxSize());
        eventDTO.setActualSize((long) event.getUsers().size());

        return eventDTO;
    }

    private Event getEventFromEventDto(EventDTO eventDTO){
        Event event = new Event();

        event.setName(eventDTO.getName());
        event.setDescription(eventDTO.getDescription());
        event.setLocation(eventDTO.getLocation());
        event.setDateTime(this.getLocalDateTimeFromString(eventDTO.getLocalDateTime()));
        event.setMaxSize(eventDTO.getMaxSize());

        return event;
    }

    private LocalDateTime getLocalDateTimeFromString(String date){


//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd*HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(date);

        return dateTime;
    }

}
