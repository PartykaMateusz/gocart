package com.gocart.gocart.Group.Service;

import com.gocart.gocart.Group.DTO.GroupDTO;
import com.gocart.gocart.Group.DTO.GroupStatusDTO;
import com.gocart.gocart.Group.Exception.GroupNotExistException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {

    GroupDTO addGroup(GroupDTO groupDTO, String ownerName);

    List<GroupDTO> getUserGroups(Long userId);

    List<GroupDTO> getUserGroups(String name);

    List<GroupDTO> getUserGroupsWhichIsMember(String name);

    List<GroupDTO> getOtherGroups(String name);

    GroupStatusDTO getGroupStatus(String name, Long id);

    GroupDTO joinToGroup(Long groupId, String userName);

    GroupDTO leaveGroup(Long groupId, String userName);;

    GroupDTO getGroup(Long id) throws GroupNotExistException;


}
