import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MapDirection from './components/MapDirection'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'
import Orders from './pages/Orders'

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
          path: '/direction',
          element: <MapDirection />,
        },
        {
          path: '/orders',
          element: <Orders />,
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
