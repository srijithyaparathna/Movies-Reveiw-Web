import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/movies', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div>
            <h1>Movies List</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Year:</strong> {movie.year}</p>
                        {movie.image && <img src={movie.image} alt={movie.title} style={{ maxWidth: '200px' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
