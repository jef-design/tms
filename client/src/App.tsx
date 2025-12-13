import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MapDirection from './components/MapDirection'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'

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
