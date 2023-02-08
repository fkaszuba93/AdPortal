package fk.adportal.json;

import fk.adportal.model.User;

import java.util.HashMap;

public class UserResponse extends HashMap<String, Object> {

    public UserResponse(User user) {
        super();
        put("id", user.getId());
        put("username", user.getUsername());
        put("firstName", user.getFirstName());
        put("lastName", user.getLastName());
        put("email", user.getEmail());
        put("phone", user.getPhone());
        put("registerDate", user.getRegisterDate());
    }
}
