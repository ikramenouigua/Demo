import React from 'react';
import { User } from '../../types';
import './UserDetail.css'; 

interface Props {
  user: User;
}

const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-detail">
      <h2>User Detail</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Profile:</strong></p>
      <p>- <strong>Hometown:</strong> {user.profile.hometown}</p>
      <p>- <strong>Age:</strong> {user.profile.age}</p>
      <p>- <strong>Gender:</strong> {user.profile.gender}</p>
    </div>
  );
};

export default UserDetail;
