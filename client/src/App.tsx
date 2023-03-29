import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Api, ApiContext } from './contexts/api';
import { Root } from './pages/Root';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Reptile } from './pages/Reptile';
import { User } from '@prisma/client';
import { AuthContext } from './contexts/auth';
import { useAuth } from './hooks/useAuth';
import { CreateReptile } from './pages/CreateReptile';

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token") || "");
  useEffect(() => {
    if (token === "")
    {
        window.localStorage.removeItem("token");
    } else {
        window.localStorage.setItem("token", token);
    }
},[token]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/reptile/:id',
          element: <Reptile />
        },
        {
          path: '/createreptile',
          element: <CreateReptile />
        }
      ]
    }
  ]);


  return (
    <>
    <AuthContext.Provider value={{setToken, token}}>
      <ApiContext.Provider value={new Api(setToken)}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
    </AuthContext.Provider>
    </>
  )
}

export default App
