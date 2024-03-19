import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList/UserList';
import UserDetail from '../components/UserDetail/UserDetail';
import Pagination from '../components/Pagination/Pagination';
import { User } from '../types';
import UserService from '../services/UserService';

import './UserPage.css'; // Import du fichier CSS pour le composant UserPage


const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);

  const [filter, setFilter] = useState<{ name: string, city: string, age: string, gender: string }>({
    name: '',
    city: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    // Fetch users from API
    UserService.getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filter users
  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(filter.name.toLowerCase()) &&
      user.profile.hometown.toLowerCase().includes(filter.city.toLowerCase()) &&
      (filter.age === '' || user.profile.age.toString() === filter.age) &&
      (filter.gender === '' || user.profile.gender === filter.gender)
    );
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleFilterSubmit = () => {
    setCurrentPage(1); // Reset page number when filter is applied
  };

  return (
    <div className="app">
      <h1>User Management</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="filter-container">
              <input
                type="text"
                placeholder="Name"
                value={filter.name}
                onChange={e => setFilter({ ...filter, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                value={filter.city}
                onChange={e => setFilter({ ...filter, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Age"
                value={filter.age}
                onChange={e => setFilter({ ...filter, age: e.target.value })}
              />
              <select
                value={filter.gender}
                onChange={e => setFilter({ ...filter, gender: e.target.value })}
              >
                <option value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <button onClick={handleFilterSubmit}>Filter</button>
            </div>
            <UserList users={filteredUsers} onUserClick={handleUserClick} />
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={filteredUsers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          <div className="col-md-6">
            {selectedUser && <UserDetail user={selectedUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
