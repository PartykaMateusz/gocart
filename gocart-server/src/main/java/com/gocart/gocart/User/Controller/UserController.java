package com.gocart.gocart.User.Controller;

import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.User.DTO.FriendStatusDTO;
import com.gocart.gocart.User.DTO.ProfileDTO;
import com.gocart.gocart.User.Exception.userNotExistException;
import com.gocart.gocart.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.QueryParam;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/isAuthenticated")
    public ResponseEntity<?> isAuthenticated(){
        return new ResponseEntity<Object>("User is authenticated", HttpStatus.OK);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<?> currentUser(Authentication authentication) {
        String name =  authentication.getName();
        try {
            return new ResponseEntity<>(this.getCurrentUser(authentication), HttpStatus.OK);
        } catch (userNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>("User not exist", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id){
        try {
            return new ResponseEntity<>(userService.getUserById(id),HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUsersProfile(@QueryParam("name") String name){
        return new ResponseEntity<>(userService.searchUsersByName(name),HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid ProfileDTO profileDTO,
                                                Authentication authentication){

        if(userService.createProfile(profileDTO, authentication.getName())){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private ProfileDTO getCurrentUser(Authentication authentication) throws userNotExistException {
        return userService.getUserByUsername(authentication.getName());
    }

    @PutMapping("/profile/avatar")
    public ResponseEntity<?> addAvatar(@RequestParam("avatar") String avatar,
                                       Authentication authentication){
        try {
            ProfileDTO profileDTO = this.getCurrentUser(authentication);
            return new ResponseEntity<>( userService.addAvatar(profileDTO.getUser_id(),avatar),HttpStatus.CREATED);
        } catch (userNotExistException | MalformedURLException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/profile/avatar")
    public ResponseEntity<?> getAvatar(Authentication authentication){

        try {
            return new ResponseEntity<>( userService.getAvatar(authentication.getName()),HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/friends")
    public ResponseEntity<?> getAllCurrentUserFriend(Authentication authentication){
        return new ResponseEntity<>(userService.getUserFriends(authentication.getName()), HttpStatus.OK);
    }

    @GetMapping("/friends/{id}")
    public ResponseEntity<?> getAllUserFriend(@PathVariable Long id,
                                              Authentication authentication){
        return new ResponseEntity<>(userService.getUserFriends(id), HttpStatus.OK);
    }

    @DeleteMapping("/friends/{id}")
    public ResponseEntity<?> removeFriend(@PathVariable Long id,
                                    Authentication authentication){
        try {
            return new ResponseEntity<>(userService.removeFriends(authentication.getName(),id), HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/friends/status/{id}")
    public ResponseEntity<?> getFriendStatus(@PathVariable Long id,
                                             Authentication authentication){
        try {
            FriendStatusDTO friendStatusDTO = new FriendStatusDTO();
            friendStatusDTO.setStatus(userService.getFriendStatus(authentication.getName(),id));
            return new ResponseEntity<>(friendStatusDTO,HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/friends/invitations/{id}")
    public ResponseEntity<?> sendInvitation(@PathVariable Long id,
                                            Authentication authentication){

        try {
            return new ResponseEntity<>(userService.sendInvitation(authentication.getName(),id), HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/friends/invitations/{id}")
    public ResponseEntity<?> undoInvitation(@PathVariable Long id,
                                            Authentication authentication){
        try {
            return new ResponseEntity<>(userService.undoInvitation(authentication.getName(),id), HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/friends/invitations/accept/{id}")
    public ResponseEntity<?> acceptInvitation(@PathVariable Long id,
                                              Authentication authentication){
        try {
            return new ResponseEntity<>(userService.acceptInvitation(authentication.getName(),id), HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/friends/invitations/discard/{id}")
    public ResponseEntity<?> discardInvitation(@PathVariable Long id,
                                              Authentication authentication){
        try {
            return new ResponseEntity<>(userService.discardInvitation(authentication.getName(),id), HttpStatus.OK);
        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/friends/invitations")
    public ResponseEntity<?> getInvitations(Authentication authentication){
        try {
            return new ResponseEntity<>( userService.getInvitations(authentication.getName()), HttpStatus.OK);

        } catch (userNotExistException e) {
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("friends/suggestions")
    public ResponseEntity<?> getFriendsSuggestions(Authentication authentication){
        return new ResponseEntity<>(userService.getFriendSuggestions(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("groups/{id}/users")
    public ResponseEntity<?> getGroupMembers(@PathVariable Long id){
        try {
            return new ResponseEntity<>(userService.getGroupMembers(id),HttpStatus.OK);
        } catch (GroupNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("events/{id}/users")
    public ResponseEntity<?> getEventMembers(@PathVariable Long id){
        try {
            return new ResponseEntity<>(userService.getEventMembers(id),HttpStatus.OK);
        } catch (EventNotExist eventNotExist) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
