package com.gocart.gocart.User.Service;

import com.gocart.gocart.Event.Entity.Event;
import com.gocart.gocart.Event.Exception.EventNotExist;
import com.gocart.gocart.Event.Repository.EventRepository;
import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Group.Repository.GroupRepository;
import com.gocart.gocart.User.DTO.ProfileDTO;
import com.gocart.gocart.User.DTO.UserDto;
import com.gocart.gocart.User.Entity.User;
import com.gocart.gocart.User.Exception.EmailIsUsed;
import com.gocart.gocart.User.Exception.LoginIsUsed;
import com.gocart.gocart.User.Exception.userNotExistException;
import com.gocart.gocart.User.Repository.RoleRepository;
import com.gocart.gocart.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public ProfileDTO getUserByUsername(String username) throws userNotExistException {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            return this.getProfileDtoFromUser(user.get());
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public ProfileDTO getProfileDtoFromUser(User user) {
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setProfileCreated(user.isProfileCreated());
        profileDTO.setUser_id(user.getUser_id());
        profileDTO.setTelNumber(user.getTelNumber());
        profileDTO.setCity(user.getCity());
        profileDTO.setGender(user.getGender());
        profileDTO.setFirstName(user.getFirstName());
        profileDTO.setLastName(user.getLastName());

        if (user.getEvents() != null){
            profileDTO.setEventsNumber(user.getEvents().size());
        }
        else{
            profileDTO.setEventsNumber(0);
        }

        if (user.getEvents() != null){
            profileDTO.setGroupNumber(user.getGroups().size());
        }
        else{
            profileDTO.setGroupNumber(0);
        }




        if (user.getAvatar()!=null) {
            profileDTO.setAvatar(user.getAvatar());
        }
        else{
            profileDTO.setAvatar("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png");
        }
        profileDTO.setEmail(user.getEmail());
        return profileDTO;
    }

    @Override
    public boolean createProfile(ProfileDTO profileDTO, String username) {

        Optional<User> optUser = userRepository.findByUsername(username);
        User user;
        if(optUser.isPresent()){
            user = optUser.get();
        }
        else{
            return false;
        }

        try {
            user.setFirstName(profileDTO.getFirstName());
            user.setLastName(profileDTO.getLastName());
            user.setCity(profileDTO.getCity());
            user.setTelNumber(profileDTO.getTelNumber());
            user.setProfileCreated(true);
            user.setGender(profileDTO.getGender());
            userRepository.save(user);
            return true;
        }
        catch(Exception ex){
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ProfileDTO> getUserFriends(String username) throws UsernameNotFoundException{
        Optional<User> optionalUser= userRepository.findByUsername(username);

        if (optionalUser.isPresent()){
            return this.userListToProfileDTOList(optionalUser.get().getFriends());
        }
        else{
            throw new UsernameNotFoundException("user not found");
        }
    }

    @Override
    public List<ProfileDTO> getUserFriends(Long id) {
        Optional<User> optionalUser= userRepository.findById(id);

        if (optionalUser.isPresent()){
            return this.userListToProfileDTOList(optionalUser.get().getFriends());
        }
        else{
            throw new UsernameNotFoundException("user not found");
        }
    }

    @Override
    public ProfileDTO getUserById(Long id) throws userNotExistException {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return this.getProfileDtoFromUser(user.get());
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public List<ProfileDTO> searchUsersByName(String name) {
        List<User> userList = new ArrayList<>();
        userList.addAll(userRepository.findByFirstNameOrLastName(name));

        String[] parts = name.split(" ");

        if(parts.length>1) {
            String firstName = parts[0];
            String lastName = parts[1];
            userList.addAll(userRepository.findByFirstNameAndLastName(firstName, lastName));
        }

        List<ProfileDTO> profileDTOList = this.userListToProfileDTOList(userList);

        return profileDTOList;
    }

    @Override
    public List<ProfileDTO> userListToProfileDTOList(List<User> userList) {
        List<ProfileDTO> profileDTOList = new ArrayList<>();
        for(User user : userList){
            profileDTOList.add(this.getProfileDtoFromUser(user));
        }
        return profileDTOList;
    }

    @Override
    public User getUserFromProfileDTO(ProfileDTO profileDTO) {
        User user = new User();

        user.setGender(profileDTO.getGender());
        user.setTelNumber(profileDTO.getTelNumber());
        user.setCity(profileDTO.getCity());
        user.setLastName(profileDTO.getLastName());
        user.setFirstName(profileDTO.getFirstName());
        user.setAvatar(profileDTO.getAvatar());
        user.setEmail(profileDTO.getEmail());
        user.setUser_id(profileDTO.getUser_id());
        user.setProfileCreated(profileDTO.isProfileCreated());

        return user;
    }

    @Override
    public List<ProfileDTO> getFriendSuggestions(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            User user = optionalUser.get();

            //load to hashset to eliminated same users
            HashSet<User> users = userRepository.findSuggestedFriends(user.getUser_id(),5L);
            ArrayList<User> usersArray = new ArrayList<>();
            usersArray.addAll(users);

            return this.userListToProfileDTOList(usersArray);
        }
        else{
            throw new UsernameNotFoundException("User not exist");
        }
    }

    @Override
    public List<ProfileDTO> getGroupMembers(Long id) throws GroupNotExistException {
        Optional<Group> optionalGroup = groupRepository.findById(id);

        if(optionalGroup.isPresent()){
            return this.userListToProfileDTOList(optionalGroup.get().getUsers());
        }
        else{
            throw new GroupNotExistException("group not exist");
        }
    }

    @Override
    public List<ProfileDTO> getEventMembers(Long id) throws EventNotExist {
        Optional<Event> optionalEvent = eventRepository.findById(id);

        if(optionalEvent.isPresent()){
            return this.userListToProfileDTOList(optionalEvent.get().getUsers());
        }
        else{
            throw new EventNotExist("event not exist");
        }
    }

    @Override
    public String getFriendStatus(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        if(optFirst.isPresent() && optSecond.isPresent()){
            if(optFirst.get().getFriends().contains(optSecond.get())) return "friends";
            if(optFirst.get().getInvitations().contains(optSecond.get())) return "hasInvitation";
            if(optFirst.get().getInvited().contains(optSecond.get())) return "invited";
            else return "unknown";
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public boolean sendInvitation(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        if(optFirst.isPresent() && optSecond.isPresent()){
            optFirst.get().getInvited().add(optSecond.get());
            optSecond.get().getInvitations().add(optFirst.get());
            userRepository.save(optFirst.get());
            userRepository.save(optSecond.get());
            return true;
        }
        else{
            throw new userNotExistException();
        }

    }

    @Override
    public boolean undoInvitation(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        if(optFirst.isPresent() && optSecond.isPresent()){
            optFirst.get().getInvited().remove(optSecond.get());
            optSecond.get().getInvitations().remove(optFirst.get());
            userRepository.save(optFirst.get());
            userRepository.save(optSecond.get());
            return true;
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public boolean acceptInvitation(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        //remove invitations and add to friends
        if(optFirst.isPresent() && optSecond.isPresent()){
            optFirst.get().getFriends().add(optSecond.get());
            optSecond.get().getFriends().add(optFirst.get());
            optFirst.get().getInvitations().remove(optSecond.get());
            optSecond.get().getInvited().remove(optFirst.get());
            userRepository.save(optFirst.get());
            userRepository.save(optSecond.get());

            return true;
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public boolean discardInvitation(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        if(optFirst.isPresent() && optSecond.isPresent()){
            optFirst.get().getInvitations().remove(optSecond.get());
            optSecond.get().getInvited().remove(optFirst.get());
            userRepository.save(optFirst.get());
            userRepository.save(optSecond.get());
            return true;
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public boolean removeFriends(String name, Long id) throws userNotExistException {
        Optional<User> optFirst = userRepository.findByUsername(name);
        Optional<User> optSecond = userRepository.findById(id);

        if(optFirst.isPresent() && optSecond.isPresent()){
            optFirst.get().getFriends().remove(optSecond.get());
            optFirst.get().getInvitations().remove(optSecond.get());
            optFirst.get().getInvited().remove(optSecond.get());

            optSecond.get().getFriends().remove(optFirst.get());
            optSecond.get().getFriends().remove(optSecond.get());
            optSecond.get().getFriends().remove(optSecond.get());

            userRepository.save(optFirst.get());
            userRepository.save(optSecond.get());
            return true;
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public List<ProfileDTO> getInvitations(String name) throws userNotExistException {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if(optionalUser.isPresent()){
            return this.userListToProfileDTOList(optionalUser.get().getInvitations());
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public boolean addAvatar(Long user_id, String avatar) throws userNotExistException, MalformedURLException {
        Optional<User> optionalUser = userRepository.findById(user_id);

        if (optionalUser.isPresent()){
            optionalUser.get().setAvatar(avatar);
            userRepository.save(optionalUser.get());
            return true;
        }
        else{
            throw new userNotExistException();
        }
    }

    @Override
    public String getAvatar(String name) throws userNotExistException {
       Optional<User> optionalUser = userRepository.findByUsername(name);

       if(optionalUser.isPresent()){
           return optionalUser.get().getAvatar();
       }
        else{
            throw new userNotExistException();
       }
    }

    @Override
    public ProfileDTO registerNewUserAccount(UserDto accountDto) throws EmailIsUsed, LoginIsUsed {

        if (emailExists(accountDto.getEmail())) {
            throw new EmailIsUsed();
        }
        if(loginExist(accountDto.getLogin())){
            throw new LoginIsUsed();
        }

        User user = new User();
        user.setUsername(accountDto.getLogin());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setEmail(accountDto.getEmail());
        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));
        user.setProfileCreated(false);
        return this.getProfileDtoFromUser(userRepository.save(user));
    }


    private boolean emailExists(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }

    private boolean loginExist(String login){
        Optional<User> user = userRepository.findByUsername(login);
        if (user.isPresent()){
            return true;
        }
        return false;
    }

}
