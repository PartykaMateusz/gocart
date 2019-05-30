package com.gocart.gocart.Group.Service;

import com.gocart.gocart.Group.DTO.GroupDTO;
import com.gocart.gocart.Group.DTO.GroupStatusDTO;
import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Group.Enum.GroupStatus;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import com.gocart.gocart.Group.Repository.GroupRepository;
import com.gocart.gocart.User.Entity.User;
import com.gocart.gocart.User.Repository.UserRepository;
import com.gocart.gocart.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @Override
    public GroupDTO addGroup(GroupDTO groupDTO, String ownerName) {
        Optional<User> optionalUser = userRepository.findByUsername(ownerName);

        if(optionalUser.isPresent()){
            User owner = optionalUser.get();

            groupDTO.setOwner(userService.getProfileDtoFromUser(owner));

            Group group = this.getGroupFromGroupDTO(groupDTO);
            group.setOwner(owner);
            group.setUsers(new ArrayList<>());

            userRepository.save(owner);
            groupRepository.save(group);

            group.addUser(owner);
            owner.addGroup(group);

            userRepository.save(owner);
            groupRepository.save(group);
            return this.getGroupDTOfromGroup(group);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<GroupDTO> getUserGroups(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()){
            List<GroupDTO> groupList = this.getGroupDTOListFromGroupList(optionalUser.get().getGroups());
            return groupList.stream()
                    .filter(p -> p.getOwner().getUser_id() == optionalUser.get().getUser_id())
                    .collect(Collectors.toList());
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<GroupDTO> getUserGroups(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<GroupDTO> groupList = this.getGroupDTOListFromGroupList(optionalUser.get().getGroups());
            return groupList.stream()
                    .filter(p -> p.getOwner().getUser_id() == optionalUser.get().getUser_id())
                    .collect(Collectors.toList());
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<GroupDTO> getUserGroupsWhichIsMember(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<GroupDTO> groupList = this.getGroupDTOListFromGroupList(optionalUser.get().getGroups());
            return groupList.stream()
                    .filter(p -> p.getOwner().getUser_id() != optionalUser.get().getUser_id())
                    .collect(Collectors.toList());
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public List<GroupDTO> getOtherGroups(String name) {
        Optional<User> optionalUser = userRepository.findByUsername(name);

        if (optionalUser.isPresent()){
            List<Group> groupList = groupRepository.findOtherGroups(optionalUser.get().getUser_id());
            groupList.removeAll(optionalUser.get().getGroups());

            return this.getGroupDTOListFromGroupList(groupList);
        }
        else{
            throw new UsernameNotFoundException("user not exist");
        }
    }

    @Override
    public GroupStatusDTO getGroupStatus(String name, Long id) {
        Optional<User> optionalUser = userRepository.findByUsername(name);
        Optional<Group> optionalGroup = groupRepository.findById(id);

        if(optionalUser.isPresent() && optionalGroup.isPresent()){
            User user = optionalUser.get();
            Group group = optionalGroup.get();

            //if groups contains member return MEMBER
            if(user.getGroups().contains(group)){
                //if user is group owner reurn OWNER
                if(group.getOwner().equals(user)){
                    return this.getGroupStatusDTOFromEnum(GroupStatus.OWNER);
                }
                else{
                    return this.getGroupStatusDTOFromEnum(GroupStatus.MEMBER);
                }
            }
            //else return NOT_MEMBER
            return this.getGroupStatusDTOFromEnum(GroupStatus.NOT_MEMBER);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    @Override
    public GroupDTO joinToGroup(Long groupId, String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        Optional<Group> optionalGroup = groupRepository.findById(groupId);

        if(optionalUser.isPresent() && optionalGroup.isPresent()){
            User user = optionalUser.get();
            Group group = optionalGroup.get();

            group.addUser(user);
            user.addGroup(group);

            userRepository.save(user);
            groupRepository.save(group);

            return this.getGroupDTOfromGroup(group);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    @Override
    public GroupDTO leaveGroup(Long groupId, String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        Optional<Group> optionalGroup = groupRepository.findById(groupId);

        if(optionalUser.isPresent() && optionalGroup.isPresent()){
            User user = optionalUser.get();
            Group group = optionalGroup.get();

            group.removeUser(user);
            user.removeGroup(group);

            userRepository.save(user);
            groupRepository.save(group);

            return this.getGroupDTOfromGroup(group);
        }
        else{
            throw new UsernameNotFoundException("user or group not exist");
        }
    }

    @Override
    public GroupDTO getGroup(Long id) throws GroupNotExistException {
        Optional<Group> optionalGroup = groupRepository.findById(id);

        if(optionalGroup.isPresent()){
            return this.getGroupDTOfromGroup(optionalGroup.get());
        }
        else{
            throw new GroupNotExistException("group not exist");
        }
    }


    /////////////////////////////////
    private GroupStatusDTO getGroupStatusDTOFromEnum(GroupStatus groupStatus){
        GroupStatusDTO groupStatusDTO = new GroupStatusDTO();
        groupStatusDTO.setGroupStatus(groupStatus);
        return groupStatusDTO;
    }

    private List<GroupDTO> getGroupDTOListFromGroupList(List<Group> groups) {
        List<GroupDTO> groupDTOS = new ArrayList<>();

        for(Group group: groups){
            groupDTOS.add(this.getGroupDTOfromGroup(group));
        }

        return groupDTOS;
    }

    private Group getGroupFromGroupDTO(GroupDTO groupDTO){
        Group group = new Group();

        //group.setGroup_id(groupDTO.getId());
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
        group.setOwner(userService.getUserFromProfileDTO(groupDTO.getOwner()));

        return group;
    }

    private GroupDTO getGroupDTOfromGroup(Group group){
        GroupDTO groupDTO = new GroupDTO();

        groupDTO.setId(group.getGroup_id());
        groupDTO.setName(group.getName());
        groupDTO.setDescription(group.getDescription());
        groupDTO.setOwner(userService.getProfileDtoFromUser(group.getOwner()));

        return groupDTO;
    }
}
