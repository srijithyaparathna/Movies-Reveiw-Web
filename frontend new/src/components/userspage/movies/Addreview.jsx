import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const AddReview = () => {
    const navigate = useNavigate();
  
    
    const { movieId } = useParams();
    console.log(movieId, 'search');
    
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null); // State to hold movie details

    useEffect(() => {
        fetchMovieDataById(movieId);
    }, [movieId]);
    console.log('movieId:', movieId);
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

            const { title, director, year } = response.data;
            setMovie({ title, director, year }); // Set movie details to state

        } catch (error) {
            console.error('Error fetching movie data:', error);
            setError('Error fetching movie data');
        }
    };

    const verifyToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            console.log('No token found. Please log in.');
            return null;
        }
        console.log('Token verified:', token);
        return token;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate input fields
            if (!username || !content || !rating) {
                setError('Please fill out all fields and provide a rating.');
                return;
            }
    
            // Verify token
            const token = verifyToken();
            if (!token) return;
    
            // Prepare review data
            const reviewData = { username, content, rating, movieId };
    
            // Add new review
            const response = await axios.post(`http://localhost:8081/api/reviews`, reviewData, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            // Check response and navigate on success
            if (response.status === 201) {
                navigate(`/movies/${movieId}`);
            } else {
                setError('Failed to add review. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError('No response received from server');
            } else {
                setError('Error adding review: ' + error.message);
            }
        }
    };
    

    return (
        <div className="add-review-container">
            <h2>Add Review</h2>
            {movie && (
                <div>
                    <p>Movie ID: {movieId}</p>
                    <p>Movie Title: {movie.title}</p>
                    <p>Director: {movie.director}</p>
                    <p>Year: {movie.year}</p>
                    <hr />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>

                <label>Rating:</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Add Review</button>
            </form>
        </div>
    );
};

export default AddReview;
