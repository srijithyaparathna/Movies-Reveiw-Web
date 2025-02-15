package com.Movies.Reveiw.Web.Movies.Reveiws.Web.services;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Review;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        return review.orElse(null);
    }

    public List<Review> getReviewsByMovieId(int movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReviewsByMovieId(int movieId) {
        List<Review> reviews = reviewRepository.findByMovieId(movieId);
        reviewRepository.deleteAll(reviews);
    }
}
