package com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Optional<Movie> findById(Integer id);

    // You can add more custom query methods here if needed
}
