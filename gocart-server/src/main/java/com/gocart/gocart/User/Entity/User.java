package com.gocart.gocart.User.Entity;

import com.gocart.gocart.Event.Entity.Event;
import com.gocart.gocart.Group.Entity.Group;
import com.gocart.gocart.Post.Post.Entity.Post;
import com.gocart.gocart.User.Enum.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@EqualsAndHashCode
@Table(name= "g_user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String avatar;

    @Column
    private String firstName;

    @Column String lastName;

    @Column
    private boolean isProfileCreated;

    @Column
    private String email;

    @Column
    private String city;

    @Column
    private Gender gender;

    @Column
    private String telNumber;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<Role> roles;

    @ManyToMany
    private List<Group> groups;

    @ManyToMany
    private List<Event> events;

    @ManyToMany
    private List<User> friends;

    @ManyToMany
    private List<User> invitations;

    @ManyToMany
    private List<User> invited;

    @OneToMany
    private List<Post> posts;

    public User(String name, String password) {
        this.username = name;
        this.password = password;
    }

    public User(User user) {
        this.isProfileCreated = user.isProfileCreated();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.roles = user.getRoles();
        this.user_id = user.getUser_id();
        this.friends = user.getFriends();
        this.groups = user.getGroups();
        this.invitations = user.getInvitations();
        this.invitations = user.getInvited();
        this.events = user.getEvents();
        this.city = user.getCity();
        this.telNumber = user.getTelNumber();
        this.gender = user.getGender();
    }

    public User(String user, String user1, List<Role> asList) {
        this.username = user;
        this.password = user1;
        this.roles = asList;
    }

    public void addPost(Post post){
        if (this.posts == null){
            this.posts = new ArrayList<>();
        }

        this.posts.add(post);
    }

    @Override
    public String toString() {
        return firstName + " " +lastName;
    }

    public void addGroup(Group group) {
        if (this.groups == null){
            this.groups = new ArrayList<>();
        }

        this.groups.add(group);
    }

    public void removeGroup(Group group) {
        this.groups.remove(group);
    }

    public void addEvent(Event event) {
        if (this.events == null){
            this.events = new ArrayList<>();
        }

        this.events.add(event);
    }

    public void removeEvent(Event event) {
        this.events.remove(event);
    }
}
