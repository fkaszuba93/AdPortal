package fk.adportal.controller;

import fk.adportal.model.User;
import fk.adportal.security.Token;
import fk.adportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/login")
    public Token loginUser(@RequestBody Map<String, String> request){
        try {
            return userService.loginUser(request);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
    }

    @PostMapping(path = "/register")
    public Token registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }
}
