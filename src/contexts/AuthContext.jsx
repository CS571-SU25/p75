import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mtg-community-user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('mtg-community-user', JSON.stringify(currentUser));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    } else {
      localStorage.removeItem('mtg-community-user');
    }
  }, [currentUser]);

  // Get all users from localStorage
  const getUsers = () => {
    try {
      const users = localStorage.getItem('mtg-community-users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    try {
      localStorage.setItem('mtg-community-users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  // Register new user
  const register = async (userData) => {
    const { username, email, password, confirmPassword } = userData;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    const users = getUsers();

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }

    if (users.find(user => user.username === username)) {
      throw new Error('Username already taken');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      username,
      email,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=100&background=random`,
    };

    // Save user to users list
    users.push({ ...newUser, password }); // In real app, hash password
    saveUsers(users);

    // Set as current user (auto-login after register)
    setCurrentUser(newUser);

    return newUser;
  };

  // Login user
  const login = async (credentials) => {
    const { username, password } = credentials;

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Remove password from user object before setting as current user
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);

    // Update in users list too
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      saveUsers(users);
    }
  };

  const value = {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
    isLoggedIn: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;