import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);