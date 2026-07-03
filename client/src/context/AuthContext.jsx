import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('RoboWorkZ_token'));
  const [loading, setLoading] = useState(true);

  // Set auth header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user on mount using Supabase session or fallback
  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session && session.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User',
            role: session.user.user_metadata?.role || 'user',
            favorites: []
          };
          setUser(userData);
          setToken(session.access_token);
          localStorage.setItem('RoboWorkZ_token', session.access_token);
        } else if (token && !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          // Fallback to Express backend if Supabase is not configured yet
          try {
            const res = await axios.get('/auth/me');
            setUser(res.data);
          } catch (error) {
            console.error('Token expired or invalid');
            logout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User',
          role: session.user.user_metadata?.role || 'user',
          favorites: []
        };
        setUser(userData);
        setToken(session.access_token);
        localStorage.setItem('RoboWorkZ_token', session.access_token);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setToken(null);
        localStorage.removeItem('RoboWorkZ_token');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signup = async (username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role: 'user'
          }
        }
      });
      if (error) throw error;
      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          username: username || data.user.email?.split('@')[0] || 'User',
          role: 'user',
          favorites: []
        };
        setUser(userData);
        setToken(data.session?.access_token || null);
        if (data.session?.access_token) {
          localStorage.setItem('RoboWorkZ_token', data.session.access_token);
        }
        return { user: userData, token: data.session?.access_token };
      }
      return data;
    } catch (err) {
      // If Supabase fails or is unconfigured, fallback to express API
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const res = await axios.post('/auth/signup', { username, email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('RoboWorkZ_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return res.data;
      }
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'User',
          role: data.user.user_metadata?.role || 'user',
          favorites: []
        };
        setUser(userData);
        setToken(data.session?.access_token || null);
        if (data.session?.access_token) {
          localStorage.setItem('RoboWorkZ_token', data.session.access_token);
        }
        return { user: userData, token: data.session?.access_token };
      }
      return data;
    } catch (err) {
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const res = await axios.post('/auth/login', { email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('RoboWorkZ_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return res.data;
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('RoboWorkZ_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const toggleFavorite = async (productId) => {
    try {
      const res = await axios.post(`/auth/favorites/${productId}`);
      setUser(prev => ({ ...prev, favorites: res.data.favorites }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      signup,
      login,
      logout,
      toggleFavorite,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
