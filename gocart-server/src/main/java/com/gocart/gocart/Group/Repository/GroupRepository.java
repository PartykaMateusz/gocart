package com.gocart.gocart.Group.Repository;

import com.gocart.gocart.Group.DTO.GroupDTO;
import com.gocart.gocart.Group.Entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query(value="SELECT * FROM g_group g " +
            "INNER JOIN g_group_users gu " +
            "ON g.group_id = gu.group_group_id " +
            "WHERE gu.users != :user_id", nativeQuery = true)
    List<Group> findOtherGroups(Long user_id);
}
