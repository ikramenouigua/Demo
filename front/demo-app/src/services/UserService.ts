import { User } from '../types';

class UserService {
  static async getUsers(): Promise<User[]> {
    console.log("salam")
    const response = await fetch('http://127.0.0.1:8000/api/users/');
    if (!response.ok) {
      console.log("mochkil")
      throw new Error('Failed to fetch users');
    }
    const userData = await response.json(); // Stocker la réponse JSON dans une variable
    console.log(userData.results); // Afficher les données des utilisateurs
    const data = userData.results
    return data;
  }


  
  static async deleteUser(userId: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  }
}



export default UserService;
