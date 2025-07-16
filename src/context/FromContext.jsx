import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const FromContext = createContext();

export const FromProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Usuario autenticado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(response.data); // Establecer el usuario autenticado
        } catch (error) {
          console.error('Token inválido o expirado', error);
          logout(); // Si el token no es válido, cerrar sesión
        }
      }
    };

    fetchUsers();
    fetchItems();
    validateToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        correo: email,
        contraseña: password,
      });
      const { user, token } = response.data;

      setCurrentUser(user); // Guardar el usuario en el estado local
      localStorage.setItem('token', token); // Guardar el token en localStorage
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const register = async (nombre, apellido, correo, contraseña) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        { nombre, apellido, correo, contraseña }
      );
      if (response.status === 201) {
        setUsers((prevUsers) => [...prevUsers, response.data.user]);
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error al registrar el usuario.' };
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`);
      if (response.status === 200) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
      } else {
        alert('Error al eliminar el registro. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
      alert('Error al eliminar el ítem: ' + (error.response?.data?.message || error.message));
    }
  };

  const editItem = async (id, editedItem) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/from/${id}`,
         editedItem,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        const updatedItems = items.map((item) =>
          item.id === editedItem.id ? editedItem : item
        );
        setItems(updatedItems);
      } else {
        alert('Error al editar el registro. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al editar el ítem:', error);
      alert('Error al editar el ítem: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <FromContext.Provider value={{ deleteItem, editItem, items, users, currentUser, loading, error, register, login, logout }}>
      {children}
    </FromContext.Provider>
  );
};

// Hook para utilizar el contexto
export const useFromContext = () => {
  return useContext(FromContext);
};