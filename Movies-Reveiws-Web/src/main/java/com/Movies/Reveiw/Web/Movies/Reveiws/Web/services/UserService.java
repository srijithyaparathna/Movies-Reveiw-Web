package com.Movies.Reveiw.Web.Movies.Reveiws.Web.services;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.DTO.UserDTO;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User save(UserDTO userDTO);
}
