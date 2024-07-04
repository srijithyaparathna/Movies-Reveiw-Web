package com.Movies.Reveiw.Web.Movies.Reveiws.Web.controllers;

import com.Movies.Reveiw.Web.Movies.Reveiws.Web.models.Movie;
import com.Movies.Reveiw.Web.Movies.Reveiws.Web.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MovieController {

    private final MovieService service;

    @Autowired
    public MovieController(MovieService service) {
        this.service = service;
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return service.getAllMovies();
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Movie> getOneMovie(@PathVariable int id) {
        return service.getOneMovie(id);
    }

    @PostMapping("/movie")
    public ResponseEntity<String> createMovie(@RequestBody Movie movie) {
        return service.createMovie(movie);
    }

    @DeleteMapping("/movie/{id}")
    public ResponseEntity<String> deleteMovieById(@PathVariable int id) {
        return service.deleteMovieById(id);
    }

    @PutMapping("/movie/{movieId}")
    public ResponseEntity<Movie> updateMovie(@PathVariable int movieId, @RequestBody Movie movie) {
        return service.updateMovie(movieId, movie);
    }

    // Image upload for movie posters
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return service.uploadImage(file);
    }
}
