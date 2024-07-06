// FooterComponent.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const FooterComponent = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
                textAlign: 'center'
                
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    Your Footer Content Here.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {'Copyright © '}
                    <a color="inherit" href="https://mui.com/">
                        Your Website
                    </a>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
};

export default FooterComponent;
