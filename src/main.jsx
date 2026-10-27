import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './styles.css';
import './redesign.css';
import './dark.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user"><BrowserRouter><App /></BrowserRouter></MotionConfig>
  </React.StrictMode>
);
