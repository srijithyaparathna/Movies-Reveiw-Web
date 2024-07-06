import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import MovieList from './components/userspage/movies/MovieList';
import AddMovie from './components/userspage/movies/AddMovie';
import UpdateMovie from './components/userspage/movies/UpdateMovie';
import AddReview from './components/userspage/movies/Addreview.jsx'; // Corrected import
import ViewAllReviews from './components/userspage/movies/viewallreviews.jsx'; // Corrected import
import ViewMovieByID from './components/userspage/movies/ViewReviewByID'; // Import ViewMovieByID

import { Box, CssBaseline } from '@mui/material';

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                <CssBaseline />
                <Navbar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 3,
                    }}
                >
                    <Routes>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/admin/user-management" element={<UserManagementPage />} />
                        <Route path="/update-user/:userId" element={<UpdateUser />} />
                        <Route path="/movies" element={<MovieList />} />
                        <Route path="/add-movie" element={<AddMovie />} />
                        <Route path="/update-movie/:movieId" element={<UpdateMovie />} />
                        <Route path="/add-review/:movieId" element={<AddReview />} />
                        <Route path="/view-all-reviews" element={<ViewAllReviews />} />
                        <Route path="/view-movie/:movieId" element={<ViewMovieByID />} /> {/* New Route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Box>
                <FooterComponent />
            </Box>
        </BrowserRouter>
    );
}

export default App;
