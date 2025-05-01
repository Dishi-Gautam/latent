import React from 'react';
import './User.css';

const UserView = ({ rejectedAdmins, buzz }) => {
  return (
    <div className="user-profile">
      <h1 className="user-heading">Live Rejection Panel</h1>
      <div className="crosses-container">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="cross-wrapper">
            <div className={`cross ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>✖</div>
            <div className={`admin ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>
              Admin {id}
            </div>
          </div>
        ))}
      </div>
      {buzz && <div className="buzz-animation">🔴 BUZZ!</div>}
    </div>
  );
};

export default UserView;
