import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Import AuthContext

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData); // Use the login function from AuthContext
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('src/assets/images-stocks/sean-pollock-PhYq704ffdA-unsplash.jpg')`
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-6 py-12 shadow-2xl hover:scale-115 duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-serif">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {err && (
          <p className="mt-4 text-center text-sm text-red-500">
            {err.message || 'Login failed. Please try again.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;