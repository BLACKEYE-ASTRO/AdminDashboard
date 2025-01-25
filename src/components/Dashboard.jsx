import { Box, Typography } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: '#f5f5f5',
                minHeight: '100vh',
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Sidebar />       
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2, 
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        fontWeight: 500,
                        color: '#333',
                        textAlign: 'center',
                    }}
                >
                    This is a Dashboard
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
