package com.gocart.gocart.User.Controller;

import com.gocart.gocart.User.DTO.UserDto;
import com.gocart.gocart.User.Exception.EmailIsUsed;
import com.gocart.gocart.User.Exception.LoginIsUsed;
import com.gocart.gocart.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping
public class HomeController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<Object> signup(@Valid UserDto accountDto,
                                         HttpServletRequest request,
                                         BindingResult result,
                                         Errors errors){



        try {
            userService.registerNewUserAccount(accountDto);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (EmailIsUsed emailIsUsed) {

            result.rejectValue("email", "message.regError");
            return new ResponseEntity<>("email exist",HttpStatus.NOT_ACCEPTABLE);

        } catch (LoginIsUsed loginIsUsed) {

            result.rejectValue("login", "message.regError");
            return new ResponseEntity<>("login exist",HttpStatus.LOCKED);
        }

    }


}
