import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewMovieByID = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchMovieDataById(movieId);
    }, [movieId]);

    const fetchMovieDataById = async (movieId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            const movieResponse = await axios.get(`http://localhost:8081/api/movie/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { title, director, year, image } = movieResponse.data;
            setMovie({ title, director, year, image });

        } catch (error) {
            console.error('Error fetching movie data:', error);
            setMovie(null);
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/reviews/movie/${movieId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };

        if (token) {
            fetchReviews();
        }
    }, [token, movieId]);

    return (
        <div className="view-movie-by-id">
            <header className="App-header">
                <h1>Movie Review App</h1>
            </header>
            <main>
                {movie && (
                    <div className="movie-details">
                        <h2>Movie Details</h2>
                        <p>Title: {movie.title}</p>
                        <p>Director: {movie.director}</p>
                        <p>Year: {movie.year}</p>
                        {movie.image && (
                            <div className="movie-image">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    style={{ maxWidth: "300px", height: "200px" }}
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className="reviews">
                    <h2>Reviews for Movie ID: {movieId}</h2>
                    {loading ? (
                        <p>Loading reviews...</p>
                    ) : reviews.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Content</th>
                                    <th>Rating</th>
                                    <th>Reviewed On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(review => (
                                    <tr key={review.id}>
                                        <td>{review.username}</td>
                                        <td>{review.content}</td>
                                        <td>{review.rating}</td>
                                        <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No reviews available for this movie.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ViewMovieByID;
