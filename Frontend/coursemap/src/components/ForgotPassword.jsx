import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Forgot() {
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    axios.post('http://localhost:3001/api/forgotpassword', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        console.log('Password reset successful:', response.data);
        setSubmit(true);
      })
      .catch(error => {
        console.error('Error resetting password:', error);
        setError('Error resetting password');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='bg-gradient-to-tr from-blue-500 h-[100vh] flex items-center justify-center flex-col'>
        <div className='bg-white/30 flex flex-col lg:w-[60vw] lg:h-[40vh] lg:p-2 justify-around rounded-xl w-[90vw] p-1 h-[50vh]'>
          <label htmlFor="email" className='flex justify-between text-xl flex-col lg:flex-row items-center'>E-mail
            <input type="email" id='email' name='email' className='lg:w-[30vw] rounded-xl lg:h-10  text-center' value={formData.email} onChange={handleChange} required />
          </label>
          <label htmlFor="password" className='flex justify-between text-xl items-center flex-col lg:flex-row'>New Password
            <input type="password" id='password' name='password' className='lg:w-[30vw] rounded-xl lg:h-10  text-center' value={formData.password} onChange={handleChange} required />
          </label>
          <label htmlFor="confirmPassword" className='flex justify-between text-xl  items-center flex-col lg:flex-row'>Confirm Password
            <input type="password" id='confirmPassword' name='confirmPassword' className='lg:w-[30vw] rounded-xl lg:h-10  text-center' value={formData.confirmPassword} onChange={handleChange} required />
          </label>
          <div className='flex justify-between px-10'>
            <Link to={"/signin"} className='font-bold underline underline-offset-2 self-center text-sm lg:text-lg'> I Remember</Link>
          <button type="submit" className='bg-blue-800 lg:p-3 lg:text-lg rounded-full self-center p-1'>Reset Password</button>
          </div>
         
          
          {submit && (
            <h1 className='bg-green-500 text-center text-lg italic rounded-xl'>Password Reset Successfully.</h1>
          )}
          {error && (
            <h1 className='bg-red-500 text-center text-lg italic rounded-xl'>{error}</h1>
          )}
        </div>
      </form>
    </div>
  );
}

export default Forgot;
