import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-title">Register</h2>
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
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
        Register
      </button>
    </form>
  );
};

export default Register;
