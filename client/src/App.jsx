import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Admin from './components/Admin';
import User from './components/User';

// Connect to the server
const socket = io.connect('https://latent-xqak.onrender.com');

const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);
  const [isAdminView, setIsAdminView] = useState(true); // State to toggle between views

  useEffect(() => {
    // Listen for rejected events
    socket.on('rejected', ({ adminId }) => {
      setRejectedAdmins((prev) => [...new Set([...prev, adminId])]);
    });

    // Listen for unrejected events
    socket.on('unreject', ({ adminId }) => {
      setRejectedAdmins((prev) => prev.filter((id) => id !== adminId));
    });

    // Cleanup the socket listeners when component unmounts
    return () => {
      socket.off('rejected');
      socket.off('unreject');
    };
  }, []);

  return (
    <div>
  <nav className="navbar">
  <a
    href="#"
    className={isAdminView ? "active" : ""}
    onClick={() => setIsAdminView(true)}
  >
    Admin Panel
  </a>
  <a
    href="#"
    className={!isAdminView ? "active" : ""}
    onClick={() => setIsAdminView(false)}
  >
    User View
  </a>
</nav>



      {/* Conditionally render Admin or User */}
      {isAdminView ? (
        <Admin rejectedAdmins={rejectedAdmins} socket={socket} />
      ) : (
        <User rejectedAdmins={rejectedAdmins} />
      )}
    </div>
  );
};

export default App;
