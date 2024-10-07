import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing stored favorites:', error);
        setFavorites([]);
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const addToFavorites = (movie) => {
    if (!isAuthenticated()) {
      console.error('User must be logged in to add favorites');
      return;
    }
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (movieId) => {
    if (!isAuthenticated()) {
      console.error('User must be logged in to remove favorites');
      return;
    }
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(movie => movie.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const value = {
    user,
    favorites: favorites || [],
    isAuthenticated,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};