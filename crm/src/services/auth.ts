import axios from "axios";

interface User {
  // id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const API_URL = `http://localhost:3000`

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {

    
    const response = await axios.post(`${API_URL}/api/auth/login`, {  email, password });
    const data = response?.data;

    const user: User = {
      // id: data._id,
      name: data.name,
      email: data.email,
    };


  
    return { user, token: data.token };

   
  },

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    // TODO: Replace with actual API call

 
    const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
    const data = response?.data;

    const user: User = {
      // id: data._id,
      name: data.name,
      email: data.email,
    };


  
    return { user, token: data.token };
 
  },

  logout(): void {
    // TODO: Implement actual logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
}; 