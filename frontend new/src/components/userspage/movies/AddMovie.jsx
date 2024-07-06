import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Paper,
    Alert
} from '@mui/material';

const AddMovie = () => {
    const navigate = useNavigate(); // Use for navigation
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);

    // Function to check token presence and validity
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

    const uploadImage = useCallback(async () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            const token = verifyToken();
            if (!token) return;

            try {
                const response = await axios.post('http://localhost:8081/api/upload', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setImageURL(response.data);
                console.log('Image uploaded:', response.data);
            } catch (error) {
                console.log('Error uploading image:', error);
                setError('Error uploading image');
            }
        }
    }, [image]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        uploadImage();
    }, [uploadImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title || !director || !year || !imageURL) {
                setError('Please fill out all fields.');
                return;
            }

            const token = verifyToken();
            if (!token) return;

            const movieData = { title, director, year, image: imageURL };
            console.log('Movie data:', movieData);

            // Add new movie
            await axios.post('http://localhost:8081/api/movie', movieData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate('/movies');
        } catch (error) {
            console.log('Error adding movie:', error);
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError('No response received from server');
            } else {
                setError('Error adding movie: ' + error.message);
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Add Movie
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Director"
                                variant="outlined"
                                fullWidth
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Year"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    required
                                />
                            </Button>
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Add Movie
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddMovie;
