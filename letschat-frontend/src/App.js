// import logo from './logo.svg';
import './App.css';
import Login from '../src/components/Login';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MasterLayout from '../src/components/MasterLayout';
import PrivateRoute from './PrivateRoute';
import Chat from '../src/components/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Existing login route */}
          <Route path="/" element={<Login />} />

          {/* Protected route for chat */}
          <Route path="/chat" element={<PrivateRoute />}>
            <Route path="" element={<Chat />} /> {/* Chat component for chat route */}
          </Route>

          {/* Existing protected route for master layout */}
          <Route path="/master-layout" element={<PrivateRoute />}>
            <Route path="" element={<MasterLayout />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
