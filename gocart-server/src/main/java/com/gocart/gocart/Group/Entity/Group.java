package com.gocart.gocart.Group.Entity;

import com.gocart.gocart.Post.Post.Entity.Post;
import com.gocart.gocart.User.Entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@Table(name="g_group")
@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long group_id;

    @Column(unique = true)
    private String name;

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
