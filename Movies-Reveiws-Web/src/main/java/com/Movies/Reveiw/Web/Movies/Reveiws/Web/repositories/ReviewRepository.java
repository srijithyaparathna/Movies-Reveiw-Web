package com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long > {
    List<Review> findByMovieId(Long movieId);
}
