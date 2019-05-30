package com.gocart.gocart.Group.Controller;

import com.gocart.gocart.Group.DTO.GroupDTO;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Group.Service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class GroupController {

    @Autowired
    GroupService groupService;

    @GetMapping("groups/{id}")
    public ResponseEntity<?> getGroup(@PathVariable Long id){
        try {
            return new ResponseEntity<>(groupService.getGroup(id),HttpStatus.OK);
        } catch (GroupNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/groups")
    public ResponseEntity<?> addGroup(@Valid GroupDTO groupDTO,
                                      Authentication authentication){
        return new ResponseEntity<>(  groupService.addGroup(groupDTO, authentication.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/groups")
    public ResponseEntity<?> getUserGrouos(@PathVariable Long id){
        return new ResponseEntity<>(groupService.getUserGroups(id),HttpStatus.OK);
    }

    @GetMapping("/groups/ownerGroups")
    public ResponseEntity<?> getGroupsWhichUserIsOwner(Authentication authentication){
        return new ResponseEntity<>(groupService.getUserGroups(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/groups/myGroups")
    public ResponseEntity<?> getGroupsWhichUserIsMember(Authentication authentication){
        return new ResponseEntity<>(groupService.getUserGroupsWhichIsMember(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/groups/other")
    public ResponseEntity<?> getOtherGrouos(Authentication authentication){
        return new ResponseEntity<>(groupService.getOtherGroups(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/groups/{id}/status")
    public ResponseEntity<?> getGroupStatus(@PathVariable Long id,
                                            Authentication authentication){
        return new ResponseEntity<>(groupService.getGroupStatus(authentication.getName(),id),HttpStatus.OK);
    }

    @PutMapping("groups/{id}/join")
    public ResponseEntity<?> joinToGroup(@PathVariable Long id,
                                         Authentication authentication){
        return new ResponseEntity<>(groupService.joinToGroup(id, authentication.getName()),HttpStatus.ACCEPTED);
    }

    @PutMapping("groups/{id}/leave")
    public ResponseEntity<?> leaveGroup(@PathVariable Long id,
                                         Authentication authentication){
        return new ResponseEntity<>(groupService.leaveGroup(id, authentication.getName()),HttpStatus.ACCEPTED);
    }


}
