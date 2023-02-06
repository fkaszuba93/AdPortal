package fk.adportal.service;

import fk.adportal.model.User;
import fk.adportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

    public void registerUser(User user){
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

        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
