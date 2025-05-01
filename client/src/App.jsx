import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import AdminPanel from './components/Admin';
import UserView from './components/User';

const socket = io('https://latent-5t7k.onrender.com'); // your backend URL

const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);
  const [buzz, setBuzz] = useState(false);

  useEffect(() => {
    socket.on('buzz', () => {
      setBuzz(true);
      setTimeout(() => setBuzz(false), 2000);  // Reset after 2 seconds
    });

    socket.on('rejected', ({ adminId }) => {
      setRejectedAdmins(prev => {
        if (!prev.includes(adminId)) return [...prev, adminId];
        return prev;
      });
    });

    socket.on('unreject', ({ adminId }) => {
      setRejectedAdmins(prev => prev.filter(id => id !== adminId));
    });

    return () => {
      socket.off('buzz');
      socket.off('rejected');
      socket.off('unreject');
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
              handleBuzzClick={handleBuzzClick}
              socket={socket}
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
