package com.Movies.Reveiw.Web.Movies.Reveiws.Web.services;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public ResponseEntity<Movie> getOneMovie(int id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<String> createMovie(Movie movie) {
        movieRepository.save(movie);
        return new ResponseEntity<>("Movie created", HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteMovieById(int id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return ResponseEntity.ok("Movie deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Movie> updateMovie(Movie movie) {
        if (movieRepository.existsById(movie.getId())) {
            Movie updatedMovie = movieRepository.save(movie);
            return ResponseEntity.ok(updatedMovie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> uploadImage(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String uploadDir = "C:\\Users\\syapa\\OneDrive\\Desktop\\Movies Reveiw Web\\Movies-Reveiws-Web\\uploads\\";
        File uploadFile = new File(uploadDir + fileName);

        try {
            file.transferTo(uploadFile);
            return new ResponseEntity<>("http://localhost:8081/uploads/" + fileName, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("File upload failed", HttpStatus.BAD_REQUEST);
        }
    }
}
