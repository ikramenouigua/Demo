export interface Profile {
    hometown: string;
    age: number;
    gender: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    profile: Profile;
  }
  