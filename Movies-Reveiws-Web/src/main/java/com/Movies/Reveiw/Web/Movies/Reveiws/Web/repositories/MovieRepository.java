
package com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.services.MovieService;

import java.util.List;



@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    // Custom query methods

    // Find movies by category


    // Search movies by name containing a specific string

}