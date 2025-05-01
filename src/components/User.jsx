import React from 'react';
import './User.css';

const User = ({ rejectedAdmins = [] }) => {
  return (
    <div className="user-profile">
      <div className="crosses-container">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="cross-wrapper">
            <div className={`cross ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>✖</div>
            <div className={`admin-name ${rejectedAdmins.includes(id) ? 'rejected' : ''}`}>
              Admin {id}
            </div>
          </div>
        ))}
      </div>
    
    
    </div>
  );
};

export default User;