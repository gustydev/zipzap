import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx';
import ProtectedRoute from './hooks/useAuth/ProtectedRoute.jsx';
import ErrorPage from './components/error/ErrorPage.jsx';
import Home from './components/home/Home.jsx';
import Chat from './components/chat/Chat.jsx';
import User from './components/user/User.jsx';
import './styles.scss';
import * as bootstrap from 'bootstrap'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      { element: <ProtectedRoute />, children: [
        { index: true, element: <Home/> },
        { path: '/chat/:chatId', element: <Chat/>},
        { path: '/user/:userId', element: <User/>}
      ]} 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
