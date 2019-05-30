package com.gocart.gocart.Track.Entity;

import com.gocart.gocart.User.Entity.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="g_track")
@Entity
public class Track {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long tor_id;

        @Column
        private String name;

        @Column
        private String location;

        @ManyToOne(cascade=CascadeType.DETACH, fetch = FetchType.EAGER)
        @JoinColumn(name="user_id")
        private User owner;

        @Column
        private Long size;


        //TODO
//        @Column
//        private List<Integer> rate;
}
