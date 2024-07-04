import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMovie = () => {
  const navigate = useNavigate();
  const { movieId } = useParams(); // Corrected: useParams() should match the route parameter name
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    year: '',
    image: null
  });
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDataById(movieId);
  }, [movieId]);

  const fetchMovieDataById = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.get(`http://localhost:8081/api/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { title, director, year, image } = response.data;
      setMovieData({ title, director, year, image: null });
      setImageURL(image);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Error fetching movie data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      image: e.target.files[0]
    }));
  };

  const uploadImage = useCallback(async () => {
    if (movieData.image) {
      const formData = new FormData();
      formData.append('image', movieData.image);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8081/api/upload', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setImageURL(response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
      }
    }
  }, [movieData.image]);

  useEffect(() => {
    uploadImage();
  }, [uploadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!movieData.title || !movieData.director || !movieData.year || !imageURL) {
        setError('Please fill out all fields.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const updatedMovieData = { ...movieData, image: imageURL };

      await axios.put(`http://localhost:8081/api/movie/${movieId}`, updatedMovieData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/movies');
    } catch (error) {
      console.error('Error updating movie:', error);
      setError(error.response?.data?.message || 'Error updating movie');
    }
  };

  return (
    <div className="update-movie-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
