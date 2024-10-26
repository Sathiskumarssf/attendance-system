import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Home from './components/Home'; // Make sure to create a basic Home component

function App() {
    return (
      <Router>
      <Routes>   
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />      
      </Routes>
    </Router>
    );
}

export default App;
