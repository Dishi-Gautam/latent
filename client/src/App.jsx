import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Admin from './components/Admin';
import User from './components/User';
const socket = io.connect('https://latent-xqak.onrender.com');
// const socket = io.connect(import.meta.env.VITE_SERVER_URI);

const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);
  const [isAdminView, setIsAdminView] = useState(true); 
  useEffect(() => {
    socket.on('rejected', ({ adminId }) => {
      setRejectedAdmins((prev) => [...new Set([...prev, adminId])]);
    });
    socket.on('unreject', ({ adminId }) => {
      setRejectedAdmins((prev) => prev.filter((id) => id !== adminId));
    });

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
