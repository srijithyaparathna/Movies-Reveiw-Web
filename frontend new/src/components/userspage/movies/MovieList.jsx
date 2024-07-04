import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";

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
               
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                
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
