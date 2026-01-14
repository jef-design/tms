import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CustomerInfo from "./components/CustomerInfo";
// import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import CustomerTagging from "./pages/CustomerTagging";
import CustomersList from "./pages/CustomersList";
import Account from "./pages/Account";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
    const router = createBrowserRouter([
        {
            element: <ProtectedRoutes />,
            children: [
               {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/customer/info/:id",
                    element: <CustomerInfo />,
                },
                {
                    path: "/customer/list",
                    element: <CustomersList />,
                },
                {
                    path: "/customer/maintenance",
                    element: <CustomerTagging />,
                },
                {
                    path: "/account",
                    element: <Account />,
                },
            ],
        },
        {
            path: "/login",
            element: <LogIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
