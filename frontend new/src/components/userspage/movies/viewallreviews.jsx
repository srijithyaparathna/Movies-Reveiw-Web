import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className="view-all-reviews">
            <header className="App-header">
                <h1>Movie Review App</h1>
            </header>
            <main>
                <div className="reviews">
                    <h2>Movie Reviews</h2>
                    {loading ? (
                        <p>Loading reviews...</p> // Display loading message
                    ) : reviews.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Content</th>
                                    <th>Rating</th>
                                    <th>Reviewed On</th>
                                    <th>Movie Title</th>
                                    <th>Movie Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(review => (
                                    <tr key={review.id}>
                                        <td>{review.username}</td>
                                        <td>{review.content}</td>
                                        <td>{review.rating}</td>
                                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                        <td>{review.movie.title}</td>
                                        <td>
                                            <img
                                                src={review.movie.image}
                                                alt={review.movie.title}
                                                style={{ maxWidth: "100px", height: "auto" }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ViewAllReviews;
