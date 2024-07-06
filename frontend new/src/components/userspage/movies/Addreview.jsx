import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Typography,
    TextField,
    TextareaAutosize,
    Button,
    Grid,
    Paper,
    Rating,
} from '@mui/material';

const AddReview = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();

    const [username, setUsername] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // State for rating (starts at 0)
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null); // State to hold movie details
    const [loading, setLoading] = useState(true);

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

            const { title, director, year, imageUrl } = response.data;
            setMovie({ title, director, year, imageUrl });
            setLoading(false); // Set loading to false after fetching data

        } catch (error) {
            console.error('Error fetching movie data:', error);
            setError('Error fetching movie data');
            setLoading(false); // Set loading to false on error
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
            if (!username || !review || rating === 0) {
                setError('Please fill out all fields and provide a rating.');
                return;
            }

            // Verify token
            const token = verifyToken();
            if (!token) return;

            // Prepare review data
            const reviewData = { username, content: review, rating, movieId };

            // Add new review
            const response = await axios.post(`http://localhost:8081/api/reviews/movie/${movieId}`, reviewData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Check response and navigate on success
            if (response.status === 201) {
                navigate(`/movies`);
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
            <Typography variant="h4" gutterBottom>Add Review</Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : movie ? (
                <Grid container spacing={3} alignItems="center">
                    
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>{movie.title}</Typography>
                            <Typography variant="body1">Director: {movie.director}</Typography>
                            <Typography variant="body1">Year: {movie.year}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            ) : (
                <Typography>Error fetching movie details.</Typography>
            )}
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <TextareaAutosize
                    rowsMin={6} // Increased rows for larger input area
                    placeholder="Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    style={{ width: '100%', marginTop: '10px' }}
                    required
                />

                <Typography variant="body1" style={{ marginTop: '10px' }}>Rating:</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    precision={1}
                />

                {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                >
                    Add Review
                </Button>
            </form>
        </div>
    );
};

export default AddReview;
