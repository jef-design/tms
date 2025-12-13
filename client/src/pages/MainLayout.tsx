import {Outlet} from "react-router-dom";
import Header from "../layout/Header";
// import ServerStatus from "../components/Loader/ServerStatus";

const MainLayout = () => {
    return (
        <main className='main-layout'>
            {/* <ServerStatus /> */}
            <Header />
            <Outlet />
        </main>
    );
};

export default MainLayout;