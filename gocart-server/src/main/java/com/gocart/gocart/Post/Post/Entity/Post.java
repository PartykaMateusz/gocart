package com.gocart.gocart.Post.Post.Entity;

import com.gocart.gocart.Post.Comment.Entity.Comment;
import com.gocart.gocart.User.Entity.User;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name="g_post")
@ToString
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @ManyToOne
    private User creator;

    @Column
    private String text;

    @Column
    private LocalDateTime dateTime;

    @OneToMany
    private List<Comment> komentarze;

    @Column
    private String postSource;

    public void addComment(Comment comment) {
        if(this.komentarze == null){
            komentarze = new ArrayList<>();
        }

        komentarze.add(comment);
    }
}
