package fk.adportal.service;

import fk.adportal.model.User;
import fk.adportal.repository.UserRepository;
import fk.adportal.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailValidator emailValidator;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, EmailValidator emailValidator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailValidator = emailValidator;
    }

    public Token registerUser(User user){
        boolean isValidEmail = emailValidator.test(user.getEmail());
        if (!isValidEmail){
            throw new IllegalStateException("Invalid email");
        }
        boolean emailExists = userRepository.findByEmail(user.getEmail())
                .isPresent();
        if (emailExists){
            throw new IllegalStateException("Email already taken");
        }

        boolean usernameExists = userRepository.findByUsername(user.getUsername())
                .isPresent();
        if (usernameExists){
            throw new IllegalStateException("Username already taken");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        User newUser = userRepository.save(user);

        return new Token(newUser.getId());
    }

    public Token loginUser(Map<String, String> request){
        String username = request.get("username"),
            password = request.get("password");
        if (username == null || password == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Optional<User> userInDb = userRepository.findByUsername(username);
        if (userInDb.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        User user = userInDb.get();

        if (!passwordEncoder.matches(password, user.getPassword())){
            throw new AuthenticationException("Incorrect password"){};
        }

        return new Token(user.getId());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
