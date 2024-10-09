import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { apiRequest, API_URL } from "../utils/api";
import PropTypes from 'prop-types';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function userLogin(data) {
    try {
        const response = await apiRequest(`${API_URL}/user/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })      

        setUser(response.user)
        setToken(response.token)
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        setError('')
        navigate('/')
    } catch (errors) {
        setError(errors)
    }
  }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider value={{ token, user, userLogin, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array
}