import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfileInfo();
    fetchMovies();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this movie?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8081/api/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchMovies(); // Refresh movie list after deletion
      }
    } catch (error) {
      console.error(`Error deleting movie ${movieId}:`, error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Movies List
      </Typography>
      {profileInfo.role === "ADMIN" && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-movie"
          sx={{ mb: 3 }}
        >
          Add Movie
        </Button>
      )}
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={movie.image}
                alt={movie.title}
                sx={{ objectFit: "fit" }} // Ensures the image fits inside the card
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Director: {movie.director}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {movie.year}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {profileInfo.role === "ADMIN" && (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteMovie(movie.id)}
                        sx={{ mr: 1, mb: 1 }} // Add margin bottom for small gap
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/update-movie/${movie.id}`}
                        sx={{ mb: 1, mr: 1}}
                      >
                        Update
                      </Button>
                    </>
                  )}
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/add-review/${movie.id}`}
                    sx={{ mr: 1 }}
                  >
                    Add Review
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/view-movie/${movie.id}`}
                  >
                    View Reviews
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
