import React from 'react';

function Profile({ userData, setIsProfileOpen }) {
  if (!userData) {
    console.log('User not found.');
    return null;
  }

  const { name, email, photoURL } = userData;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-picture" src={photoURL} alt="Profile" />
        <div className="profile-info">
          <h1 className="profile-name">{name}</h1>
          <p className="profile-email">{email}</p>
        </div>
      </div>
      <div className="profile-body">
        <p className="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus tincidunt justo, et pretium nisi. Fusce interdum eleifend eros. Vestibulum euismod, lorem nec hendrerit commodo, velit turpis efficitur turpis, non aliquam sapien ipsum ut ex.</p>
      </div>
    </div>
  );
}

export default Profile;
