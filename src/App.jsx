import React, { useState } from 'react';
import './App.css';

const admins = [
  { id: 1, name: 'Admin 1' },
  { id: 2, name: 'Admin 2' },
  { id: 3, name: 'Admin 3' },
  { id: 4, name: 'Admin 4' },
];

const App = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);

  const handleRejectUser = (admin) => {
        if (!rejectedAdmins.includes(admin.id)) {
      setRejectedAdmins((prev) => [...prev, admin.id]);

      setTimeout(() => {
        setRejectedAdmins((prev) => prev.filter(id => id !== admin.id));
      }, 10000);
    }
  };

  return (
    <div className="App">
      <h1>Admin Rejection Panel</h1>
      <div className="admins-container">
        {admins.map((admin) => (
          <div key={admin.id} className="admin-card">
            <h3>{admin.name}</h3>
            <button onClick={() => handleRejectUser(admin)}>Reject User</button>
            {rejectedAdmins.includes(admin.id) && (
              <div className="rejection-cross">
                <span className="big-cross">✖</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
