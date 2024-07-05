package com.Movies.Reveiw.Web.Movies.Reveiws.Web.controllers;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Review;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.services.ReviewService;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable int movieId) {
        List<Review> reviews = reviewService.getReviewsByMovieId(movieId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping("/movie/{movieId}")
    public ResponseEntity<Review> createReviewForMovie(@PathVariable int movieId, @RequestBody Review review) {
        // Assuming Review class has a Movie field
        Movie movie = new Movie();
        movie.setId(movieId);
        review.setMovie(movie);

        Review createdReview = reviewService.createReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
    }


}
