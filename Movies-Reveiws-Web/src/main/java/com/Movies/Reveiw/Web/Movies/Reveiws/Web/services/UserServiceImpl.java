package com.Movies.Reveiw.Web.Movies.Reveiws.Web.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;




import com.Movies.Reveiw.Web.Movies.Reveiws.Web.DTO.UserDTO;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.User;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(UserDTO userDTO) {
        User user = new User(userDTO.getEmail(), passwordEncoder.encode(userDTO.getPassword()) , userDTO.getRole(), userDTO.getFullname());
        return userRepository.save(user);
    }

}
