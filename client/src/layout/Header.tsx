import { Link } from "react-router-dom"
import { MdMenu } from "react-icons/md"
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react"
import TransFlowLogo from "../components/TransFlowLogo";

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* HEADER */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        {/* Menu Button (Mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="text-white text-2xl cursor-pointer"
          >
            <MdMenu />
          </button>
          <h1 className="font-bold text-lg text-white cursor-pointer">
            <Link to="/" onClick={() => setOpen(false)}>
              <TransFlowLogo/>
            </Link>
          </h1>
        </div>
        <div className="text-white text-2xl">
          <MdAccountCircle />
        </div>


      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SLIDE MENU */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <TransFlowLogo/>
          <button
            onClick={() => setOpen(true)}
            className="text-white text-2xl md:hidden"
          >
            <MdMenu />
          </button>

        </div>

        <ul className="flex flex-col p-4 gap-4">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/customer/list" onClick={() => setOpen(false)}>
              Customers
            </Link>
          </li>
          <li>
            <Link to="/customer/configuration" onClick={() => setOpen(false)}>
              Customer Tagging
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header
