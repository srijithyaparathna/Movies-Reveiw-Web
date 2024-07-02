package com.Movies.Reveiw.Web.Movies.Reveiws.Web.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.User;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }

        return new CustomUserDetail(user);

    }


}
