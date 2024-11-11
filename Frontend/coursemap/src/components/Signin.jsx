import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/Signin', formData)
      .then((response) => {
        console.log('Signin successful:', response.data);
        setSubmit(true);
        setError('');

        // Store the username or user data in localStorage for access in other components
        localStorage.setItem('user', JSON.stringify({ name: formData.name }));

        navigate('/'); // Redirect to the homepage
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setSubmit(false);
        setError('Invalid credentials');
      });
  };

  return (
    <>
      <form
        className="bg-gradient-to-tr from-blue-500 h-[100vh] flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col bg-white/30 lg:h-[40vh]  rounded-xl lg:w-[50vw] p-5 h-[50vh] justify-around">
          <label htmlFor="name" className="flex text-xl items-center justify-between italic flex-col lg:flex-row">
            Username
            <input
              type="text"
              id="name"
              name="name"
              className="lg:w-[25vw] rounded-xl h-10 text-center shadow-xl"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password" className="flex text-xl items-center justify-between italic flex-col lg:flex-row">
            Password
            <input
              type="password"
              id="password"
              name="password"
              className="lg:w-[25vw] rounded-xl h-10 text-center shadow-xl"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <div className="flex justify-between gap-3">
            <Link to="/signup" className="font-semibold underline underline-offset-2 self-center text-sm lg:text-lg">
              Create New Account?
            </Link>
            <Link
              to="/forgotpassword"
              className="font-semibold underline underline-offset-2 self-center text-sm lg:text-lg"
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="text-xl bg-blue-800 w-24 lg:h-10 rounded-full self-center">
            Sign-in
          </button>
          {submit && (
            <>
              <p className="text-center bg-green-400 text-lg italic rounded-lg shadow-xl">Sign-in Successful</p>
            </>
          )}
          {error && (
            <p className="text-center bg-red-400 text-lg italic rounded-lg shadow-xl">{error}</p>
          )}
        </div>
        {submit && (
          <h1 className="self-center text-2xl italic absolute top-40">Welcome-Back, {formData.name}</h1>
        )}
      </form>
    </>
  );
}

export default Signin;
