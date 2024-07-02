package com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories;




import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByEmail(String email);
}
