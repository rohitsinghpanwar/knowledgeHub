import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Community from './components/Community.jsx'
import Courses from './components/Courses.jsx'
import Roadmaps from './components/Roadmaps.jsx'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
const route=createBrowserRouter([
  {
    path:"/",
    element: <><App/> <Home/></>
  },
  {
    path:"/about",
    element: <><App/> <About/></>
  },
  {
    path:"/community",
    element: <><App/> <Community/></>
  },
  {
    path:"/roadmaps",
    element: <><App/> <Roadmaps/></>
  },
  {
    path:"/courses",
    element: <><App/> <Courses/></>
  },
  {
    path:"/signup",
    element: <><App/> <Signup/></>
  },
  {
    path:"/signin",
    element: <><App/> <Signin/></>
  },
  {
    path:"/forgotpassword",
    element: <><App/> <ForgotPassword/></>
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
