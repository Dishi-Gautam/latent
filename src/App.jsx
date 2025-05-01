import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import AdminPanel from './components/Admin';
import UserView from './components/User';
const socket = io('http://localhost:4000'); 
const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);
  const [buzz, setBuzz] = useState(false);
  useEffect(() => {
    socket.on('buzz', () => {
      setBuzz(true);
      setTimeout(() => setBuzz(false), 2000);  
    });

    return () => {
      socket.off('buzz'); 
    };
  }, []);

  const handleBuzzClick = () => {
    socket.emit('buzz');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/">Admin Panel</Link>
        <Link to="/user">User View</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <AdminPanel
              rejectedAdmins={rejectedAdmins}
              setRejectedAdmins={setRejectedAdmins}
              handleBuzzClick={handleBuzzClick}
            />
          }
        />
        <Route
          path="/user"
          element={
            <UserView
              rejectedAdmins={rejectedAdmins}
              buzz={buzz}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
