package com.gocart.gocart.Event.Entity;

import com.gocart.gocart.Post.Post.Entity.Post;
import com.gocart.gocart.User.Entity.User;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Table(name="g_event")
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long event_id;

    @Column
    private String name;

    @Column
    private LocalDateTime DateTime;

    @Column
    private Long maxSize;

    @Column
    private String location;

    @Column
    private String description;

    @ManyToOne
    private User owner;

    @ManyToMany
    private List<User> users;

    @OneToMany
    private List<Post> posts;

    public void addUser(User user){
        if(this.users == null){
            this.users = new ArrayList<>();
        }

        users.add(user);
    }

    public void removeUser(User user) {
        users.remove(user);
    }

    public void addPost(Post post){
        if (this.posts == null){
            this.posts = new ArrayList<>();
        }

        this.posts.add(post);
    }
}
