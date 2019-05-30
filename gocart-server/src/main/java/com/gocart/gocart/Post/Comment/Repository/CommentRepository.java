package com.gocart.gocart.Post.Comment.Repository;

import com.gocart.gocart.Post.Comment.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query(value="SELECT * FROM g_comment c INNER JOIN g_post_komentarze pk ON c.komentarz_id = pk.komentarze WHERE pk.post_post_id = :postid",
            nativeQuery = true)
    List<Comment> findByPost(@Param("postid") Long postid);
}
