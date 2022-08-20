import React from 'react'
import { StyledEngineProvider } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {

  return (
    <GoogleOAuthProvider clientId='212260666031-php8hgps7kbfpmdboj9qfbp6jn785tp6.apps.googleusercontent.com' >
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Routes>
          <Route path='social-media-app/' element={<Home />} />
          <Route path='social-media-app/auth' element={<Auth />} />
        </Routes>
      </StyledEngineProvider>
    </GoogleOAuthProvider>
)}

