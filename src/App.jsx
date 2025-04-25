import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/Admin';
import UserView from './components/User';

const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);

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
            />
          }
        />
        <Route
          path="/user"
          element={<UserView rejectedAdmins={rejectedAdmins} />}
        />
      </Routes>
    </div>
  );
};

export default App;
