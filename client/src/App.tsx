import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MapDirection from './components/MapDirection'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'
import CustomerTagging from './pages/CustomerTagging'
import CustomersList from './pages/CustomersList'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/customer/info/:id',
          element: <MapDirection />,
        },
        {
          path: '/customer/list',
          element: <CustomersList />,
        },
         {
          path: '/customer/maintenance',
          element: <CustomerTagging />,
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
