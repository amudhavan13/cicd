import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="page">
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
