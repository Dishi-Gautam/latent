import React from 'react';

const admins = [
  { id: 1, name: 'Admin 1' },
  { id: 2, name: 'Admin 2' },
  { id: 3, name: 'Admin 3' },
  { id: 4, name: 'Admin 4' },
];

const UserView = ({ rejectedAdmins }) => {
  return (
    <div>
      <h1>User</h1>
      <div className="admins-container">
        {admins.map((admin) => (
          <div key={admin.id} className="admin-card">
          <h2>Rejected By:</h2>
            <h3>{admin.name}</h3>
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

export default UserView;
