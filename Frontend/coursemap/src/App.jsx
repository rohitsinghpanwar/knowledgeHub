import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'

const App = () => {
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [revolvingItem, setRevolvingItem] = useState(0);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const navbarItems = ['Home', 'Roadmaps', 'Courses', 'Community', 'Signup/Signin'];
  const paths = ['/', '/roadmaps', '/courses', '/community', '/signin'];
  const itemRefs = useRef([]);

  // Fetch username from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.name); // Set username from localStorage
    }
  }, []);

  // Logic to revolve the ball around the selected item
  useEffect(() => {
    const orbitInterval = setInterval(() => {
      const item = itemRefs.current[revolvingItem];
      if (item) {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 10;
        const centerY = rect.top + rect.height / 5;

        setBallPosition({
          x: centerX + Math.cos(Date.now() / 500) * 20,
          y: centerY + Math.sin(Date.now() / 500) * 20,
        });
      }
    }, 20);

    return () => clearInterval(orbitInterval);
  }, [revolvingItem]);

  const handleItemClick = (index) => {
    setRevolvingItem(index);
    navigate(paths[index]);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername('');
    navigate('/signin'); // Redirect to sign-in page after logout
  };


  return (
    <div className="relative w-full flex justify-around items-center space-x-8 p-2 bg-gray-700 rounded-lg">
      <img src={logo} alt="" className='w-[5rem] rounded-full object-fill' />
      {navbarItems.map((item, index) => (
        <div
          key={item}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => handleItemClick(index)}
          className="text-lg font-semibold px-4 py-2 rounded-lg bg-gray-900 text-yellow-400 cursor-pointer"
        >
          {item === 'Signup/Signin' ? (
            username ? (
              // Show username and logout if logged in
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-400 mr-2 flex justify-center items-center text-black font-bold">
                  {username[0].toUpperCase()}
                </div>
                <span className="text-sm">{username}</span>
                <button onClick={handleLogout} className="ml-4 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                  Logout
                </button>
              </div>
            ) : (
              // Show Signup/Signin if user is not logged in
              <span>Signup/Signin</span>
            )
          ) : (
            item
          )}
        </div>
      ))}
      <div
        className="absolute bg-yellow-400 w-4 h-4 rounded-full transition-all duration-75"
        style={{ left: `${ballPosition.x}px`, top: `${ballPosition.y}px`, }}
      />
    </div>
  );
};

export default App;
