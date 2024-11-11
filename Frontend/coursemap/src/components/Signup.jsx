import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [submit, setSubmit] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/signup', formdata)
      .then(response => {
        console.log(response.data);
        setSubmit(true);
        localStorage.setItem('user', JSON.stringify(formdata));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-2 bg-gradient-to-tr from-blue-500 items-center justify-center h-[100vh]'
      >
        <div className='flex flex-col bg-white/30 lg:h-[50vh] justify-around rounded-xl h-[70vh] lg:w-[50vw] p-5 '>
          <label htmlFor="name" className='text-xl italic flex justify-between flex-col lg:flex-row items-center'>
            Enter Your Name
            <input 
              type="text" 
              id="name" 
              name="name"
              className='border-2 shadow-xl rounded-lg h-10 lg:w-[30vw] text-center' 
              value={formdata.name}  
              onChange={handleChange}
              required  
            />
          </label>
          <label htmlFor="email" className='text-xl italic flex justify-between flex-col lg:flex-row items-center'>
            Enter Your Email
            <input 
              type="email" 
              id="email" 
              name="email"
              className='border-2 shadow-xl rounded-lg h-10 lg:w-[30vw] text-center' 
              value={formdata.email} 
              onChange={handleChange}
              required 
            />
          </label>
          <label htmlFor="phone" className='text-xl italic flex justify-between flex-col lg:flex-row items-center'>
            Enter Your Number
            <input 
              type="number" 
              id="phone" 
              name="phone"
              className='border-2 shadow-xl rounded-lg h-10 lg:w-[30vw] text-center' 
              value={formdata.phone} 
              onChange={handleChange}
              required 
            />
          </label>
          <label htmlFor="password" className='text-xl italic flex justify-between flex-col lg:flex-row items-center'>
            Enter your Password
            <input 
              type="password" 
              id="password" 
              name="password"
              className='border-2 shadow-xl rounded-lg h-10 lg:w-[30vw] text-center' 
              value={formdata.password} 
              onChange={handleChange}
              required 
            />
          </label>
          <nav className='flex flex-row lg:flex-col gap-5 '>
          <Link to={"/signin"} className='font-bold underline underline-offset-2 self-center text-sm lg:text-lg'> Already Have an Account ?</Link>
          <button type="submit" className='lg:text-xl bg-blue-800 lg:w-24 self-center lg:h-10 p-1 rounded-full text-sm '>Sign-up</button>
          </nav>
          {submit && (
            <>
              <p className='text-center bg-green-400 text-lg italic rounded-lg shadow-xl'>Sign-up Successful</p>
            </>
          )}  
        </div>
        {
          submit && (
            <h1 className='self-center text-2xl italic absolute top-24 lg:top-48'>Hello, {formdata.name}</h1>
          )}
      </form>
    </>
  );
}

export default Signup;
