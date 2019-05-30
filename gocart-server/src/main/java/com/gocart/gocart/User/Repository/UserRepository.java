package com.gocart.gocart.User.Repository;


import com.gocart.gocart.User.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    User findByEmail(String email);

    List<User> findByFirstName(String firstName);

    List<User> findByLastName(String lastName);

    @Query(value = "SELECT * from g_user u where u.first_name = :firstName AND u.last_name = :lastName", nativeQuery = true)
    List<User> findByFirstNameAndLastName(String firstName, String lastName);

    @Query(value = "SELECT * from g_user u where u.first_name = :name OR u.last_name = :name", nativeQuery = true)
    List<User> findByFirstNameOrLastName(String name);

    @Query(value = "SELECT * from g_user u " +
            "LEFT JOIN g_user_friends uf " +
            "ON u.user_id = uf.user_user_id " +
            "WHERE u.user_id NOT IN " +
            "( " +
            " SELECT u.user_id from g_user u " +
            " LEFT JOIN g_user_friends uf " +
            " ON u.user_id = uf.user_user_id " +
            " WHERE uf.friends = :id " +
            ") " +
            "AND u.user_id != :id "+
            "AND uf.user_user_id is NULL " +
            "AND u.first_name IS NOT NULL " +
            "ORDER BY RANDOM() " +
            "LIMIT :limit"
            , nativeQuery = true)
    HashSet<User> findSuggestedFriends(Long id, Long limit);

}
