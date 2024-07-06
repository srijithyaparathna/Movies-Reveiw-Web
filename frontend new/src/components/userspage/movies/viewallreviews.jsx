import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';

const ViewAllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/reviews', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const reviewsData = response.data;

                // Fetch movie details for each review
                const reviewsWithMovies = await Promise.all(
                    reviewsData.map(async (review) => {
                        const movieResponse = await axios.get(`http://localhost:8081/api/movie/${review.movie.id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const movieData = movieResponse.data;
                        return {
                            ...review,
                            movie: {
                                ...movieData,
                                id: review.movie.id // Keep movie ID from original review
                            }
                        };
                    })
                );

                setReviews(reviewsWithMovies);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false); // Set loading to false on error
            }
        };

        if (token) {
            fetchReviews();
        }
    }, [token]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Movie Reviews
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : reviews.length > 0 ? (
                <Grid container spacing={3}>
                    {reviews.map(review => (
                        <Grid item xs={12} sm={6} md={4} key={review.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={review.movie.image}
                                    alt={review.movie.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {review.movie.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Username:</strong> {review.username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Content:</strong> {review.content}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Rating:</strong> {review.rating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Reviewed On:</strong> {new Date(review.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Alert severity="info">No reviews available.</Alert>
            )}
        </Container>
    );
};

export default ViewAllReviews;
