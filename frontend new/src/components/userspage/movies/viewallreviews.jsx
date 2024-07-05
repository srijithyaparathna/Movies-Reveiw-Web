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
                setReviews(response.data);
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
                        reviews.map(review => (
                            <div key={review.id} className="review">
                                <h3>{review.username}</h3>
                                <p>{review.content}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
                                <p>Movie ID: {review.movie.id}</p> {/* Displaying movieId */}
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ViewAllReviews;
