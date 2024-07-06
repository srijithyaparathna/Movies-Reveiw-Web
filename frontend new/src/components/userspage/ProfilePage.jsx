import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Profile Information
                </Typography>
                <Typography variant="body1" paragraph>
                    Name: {profileInfo.name}
                </Typography>
                <Typography variant="body1" paragraph>
                    Email: {profileInfo.email}
                </Typography>
                
                {profileInfo.role === "ADMIN" && (
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" component={Link} to={`/update-user/${profileInfo.id}`} sx={{ mr: 2 }}>
                            Update This Profile
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/add-movie" sx={{ mr: 2 }}>
                            Add Movie
                        </Button>
                        <Button variant="contained" component={Link} to="/view-all-reviews">
                            View All Reviews
                        </Button>
                    </Box>
                )}
                <Box sx={{ mt: 4 }}>
                    <Button variant="outlined" component={Link} to="/movies">
                        Go to Movie List
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default ProfilePage;
