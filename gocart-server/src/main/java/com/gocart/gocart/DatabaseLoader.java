package com.gocart.gocart;

import com.gocart.gocart.User.Repository.UserRepository;
import com.gocart.gocart.User.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
//        userRepository.save(new User("test","test"));
    }
}
