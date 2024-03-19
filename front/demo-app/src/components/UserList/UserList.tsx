import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import './UserList.css';
import UserService from '../../services/UserService'; 
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import Modal from 'react-modal';

interface Props {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserList: React.FC<Props> = ({ users, onUserClick }) => {
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    setUserList(users); // Initialiser la liste des utilisateurs
  }, [users]);

  const handleShowConfirmationModal = (userId: number) => {
    setDeleteUserId(userId);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setDeleteUserId(null);
    setShowConfirmationModal(false);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserService.deleteUser(userId);
      console.log('User deleted successfully');
      const updatedUserList = userList.filter(user => user.id !== userId);
      setUserList(updatedUserList);
      handleCloseConfirmationModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleShowConfirmationModal(user.id)} className="delete-btn">
                  <FaTrash /> 
                </button>
                <button onClick={() => onUserClick(user)} className="details-btn">
                  <FaInfoCircle /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={handleCloseConfirmationModal}
        contentLabel="Confirmation de suppression"
        className="modal"
      >
        <h2>Confirmation de suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        <button onClick={handleCloseConfirmationModal}>Annuler</button>
        <button onClick={() => handleDeleteUser(deleteUserId!)}>Supprimer</button>
      </Modal>
    </div>
  );
};

export default UserList;
