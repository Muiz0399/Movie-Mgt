import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.token);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Login</h2>
      <div className="form-group">
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button className="form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
