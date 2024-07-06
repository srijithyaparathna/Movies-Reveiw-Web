import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileInfo, setProfileInfo] = useState({});
    const token = localStorage.getItem("token");
    const location = useLocation();

    const checkAuth = async () => {
        try {
            const authenticated = UserService.isAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                const admin = UserService.isAdmin();
                setIsAdmin(admin);

                const response = await UserService.getYourProfile(token);
                setProfileInfo(response.ourUsers);
            }
        } catch (error) {
            console.error("Error fetching profile information:", error);
        }
    };

    useEffect(() => {
        checkAuth(); // Initial check when component mounts
    }, [token]);

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            setIsAuthenticated(false); // Assuming logout clears authentication state
        }
    };

    // Force refresh once after navigating to /profile
    useEffect(() => {
        if (location.pathname === '/profile') {
            checkAuth(); // Re-fetch authentication and profile info
        }
    }, [location.pathname]);

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Movies-Reviews-Web</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
