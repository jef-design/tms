import {Link, useNavigate} from "react-router-dom";
import {MdMenu, MdAccountCircle} from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import TransFlowLogo from "../components/TransFlowLogo";
import {useStore} from "../services/useStore";
import {axiosInstance} from "../services/axiosInstance";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const {setLogOutUser, user} = useStore();

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setAccountOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        setAccountOpen(false);
        setLogOutUser();
        await axiosInstance.get("/api/auth/logout");

        navigate("/login");
    };
    console.log(user?.username);
    return (
        <>
            {/* HEADER */}
            <header className='sticky top-0 z-50 bg-gray-800 px-4 py-3 flex items-center justify-between'>
                {/* Left */}
                <div className='flex items-center gap-4'>
                    <button onClick={() => setOpen(true)} className='text-white text-2xl cursor-pointer'>
                        <MdMenu />
                    </button>

                    <Link to='/' onClick={() => setOpen(false)}>
                        <TransFlowLogo />
                    </Link>
                </div>

                {/* Right - Account */}
                <div className="flex items-center gap-2">
                    <div className='text-white text-xs'>{user?.username}</div>
                    <div className='relative' ref={dropdownRef}>
                        <button
                            onClick={() => setAccountOpen((prev) => !prev)}
                            className='text-white text-2xl cursor-pointer'
                        >
                            <MdAccountCircle />
                        </button>

                        {accountOpen && (
                            <div className='absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border z-50'>
                                <Link
                                    to='/account'
                                    onClick={() => setAccountOpen(false)}
                                    className='block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-xl'
                                >
                                    Account
                                </Link>
                                <div>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* OVERLAY */}
            {open && <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/50 z-40' />}

            {/* SLIDE MENU */}
            <nav
                className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className='flex items-center justify-between px-4 py-3 border-b'>
                    <TransFlowLogo />
                    <button onClick={() => setOpen(false)} className='text-2xl md:hidden'>
                        <MdMenu />
                    </button>
                </div>

                <ul className='flex flex-col p-4 gap-4'>
                    <li>
                        <Link to='/' onClick={() => setOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/customer/list' onClick={() => setOpen(false)}>
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link to='/customer/maintenance' onClick={() => setOpen(false)}>
                            Customer Maintenance
                        </Link>
                    </li>
                    <li>
                        <Link to='/account' onClick={() => setOpen(false)}>
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
