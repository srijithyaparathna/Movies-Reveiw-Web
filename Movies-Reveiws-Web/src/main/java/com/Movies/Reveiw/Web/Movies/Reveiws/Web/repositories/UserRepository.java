package com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.User;


import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail (String email);

}
