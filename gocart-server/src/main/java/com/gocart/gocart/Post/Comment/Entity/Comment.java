package com.gocart.gocart.Post.Comment.Entity;

import com.gocart.gocart.User.Entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ToString
@Table(name="g_comment")
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long komentarz_id;

    @Column
    private String text;

    @Column
    private LocalDateTime dateTime;

    @ManyToOne
    private User creator;
}
