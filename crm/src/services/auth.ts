interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name: 'Test User',
            email: email,
          },
          token: 'fake-jwt-token',
        });
      }, 1000);
    });
  },

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name,
            email,
          },
          token: 'fake-jwt-token',
        });
      }, 1000);
    });
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