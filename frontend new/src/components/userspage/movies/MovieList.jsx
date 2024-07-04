import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [imageLinks, setImageLinks] = useState({});
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
      fetchImageLinks(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchImageLinks = async (movies) => {
    const links = {};
    for (const movie of movies) {
      if (movie.image) {
        try {
          const response = await axios.get(movie.image, {
            headers: { Authorization: `Bearer ${token}` },
          });
          links[movie.id] = response.data;
        } catch (error) {
          console.error(`Error fetching image for movie ${movie.id}:`, error);
        }
      }
    }
    setImageLinks(links);
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
    <div>
      <h1>Movies List</h1>
      {profileInfo.role === "ADMIN" && (
        <button className="reg-button">
          <Link to="/add-movie">Add Movie</Link>
        </button>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                {imageLinks[movie.id] && (
                  <img
                    src={imageLinks[movie.id]}
                    alt={movie.title}
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                )}
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
                {profileInfo.role === "ADMIN" && (
                  <>
                    <button>
                      <Link to={`/update-movie/${movie.id}`}>Update</Link>
                    </button>
                  </>
                )}

                <button>
                  <Link to={`/add-review/${movie.id}`}>Add Review</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
