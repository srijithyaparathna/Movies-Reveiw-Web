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
import AddReview from './components/userspage/movies/Addreview'; // Corrected import
import ViewAllReviews from './components/userspage/movies/viewallreviews'; // Corrected import

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="content">
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
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}

export default App;
