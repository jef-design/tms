
import { Navigate, Outlet } from "react-router-dom"
import { useStore } from "../services/useStore"
import Header from "../layout/Header"

const ProtectedRoutes = () => {
    const {user} = useStore()
  return (
   <>
   <Header/>
    <div>
        {user ? <Outlet/> : <Navigate to={'/login'} />}
    </div>
   </>
  )
}

export default ProtectedRoutes