import { Box, Container, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} md={6} lg={6} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '5em' }}>404</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="outlined" onClick={() => router.push('/')}>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/49/82/error-404-page-not-found-creative-web-design-vector-46724982.jpg"
              alt=""
              width={550}
              height="auto"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
