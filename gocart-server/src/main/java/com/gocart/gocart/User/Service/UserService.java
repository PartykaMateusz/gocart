package com.gocart.gocart.User.Service;

import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.User.DTO.ProfileDTO;
import com.gocart.gocart.User.DTO.UserDto;
import com.gocart.gocart.User.Entity.User;
import com.gocart.gocart.User.Exception.EmailIsUsed;
import com.gocart.gocart.User.Exception.LoginIsUsed;
import com.gocart.gocart.User.Exception.userNotExistException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.util.List;


@Service
public interface UserService {


    ProfileDTO registerNewUserAccount(UserDto accountDto) throws EmailIsUsed, LoginIsUsed;

    ProfileDTO getUserByUsername(String username) throws userNotExistException;

    boolean createProfile(ProfileDTO profileDTO, String username);

    List<ProfileDTO> getUserFriends(String username);

    List<ProfileDTO> getUserFriends(Long id);

    ProfileDTO getUserById(Long id) throws userNotExistException;

    List<ProfileDTO> searchUsersByName(String name);

    String getFriendStatus(String name, Long id) throws userNotExistException;

    boolean sendInvitation(String name, Long id) throws userNotExistException;

    boolean undoInvitation(String name, Long id) throws userNotExistException;

    boolean acceptInvitation(String name, Long id) throws userNotExistException;

    boolean discardInvitation(String name, Long id) throws userNotExistException;

    boolean removeFriends(String name, Long id) throws userNotExistException;

    List<ProfileDTO> getInvitations(String name) throws userNotExistException;

    boolean addAvatar(Long user_id, String avatar) throws userNotExistException, MalformedURLException;

    String getAvatar(String name) throws userNotExistException;

    ProfileDTO getProfileDtoFromUser(User user);

    public List<ProfileDTO> userListToProfileDTOList(List<User> userList);

    User getUserFromProfileDTO(ProfileDTO creatorProfile);

    List<ProfileDTO> getFriendSuggestions(String name);

    List<ProfileDTO> getGroupMembers(Long id) throws GroupNotExistException;

    List<ProfileDTO> getEventMembers(Long id) throws EventNotExist;
}
