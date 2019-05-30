package com.gocart.gocart.Post.Post.Repository;

import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Post.Post.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value="SELECT * from g_post p INNER JOIN g_user_posts up ON p.post_id = up.posts WHERE up.user_user_id = :id ORDER BY date_time",
            nativeQuery = true)
    List<Post> findByUserAndSort(Long id);

    @Query(value="SELECT * from g_post WHERE creator = :user_id ORDER BY date_time", nativeQuery = true)
    List<Post> findMyPostsAndSort(Long user_id);

    @Query(value="SELECT * from g_post p INNER JOIN g_group_posts gp ON p.post_id = gp.posts WHERE gp.group_group_id = :id ORDER BY date_time",
            nativeQuery = true)
    List<Post> findByGroupAndSort(Long id);

    @Query(value="SELECT * from g_post p INNER JOIN g_event_posts ep ON p.post_id = ep.posts WHERE ep.event_event_id = :id ORDER BY date_time",
            nativeQuery = true)
    List<Post> findByEventAndSort(Long id);


}
