import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Api, ApiContext } from './contexts/api';
import { Root } from './pages/Root';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Reptile } from './pages/Reptile';

function App() {
  const [api, setApi] = useState(new Api())
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
        }
      ]
    }
  ]);

  return (
    <>
    <ApiContext.Provider value={api}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
    </>
  )
}

export default App
