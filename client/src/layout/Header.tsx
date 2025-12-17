import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <div className="bg-mainbg px-4 py-2">
        <div className="font-bold text-lg text-white">
          <Link to={'/'}>MyBuddyLocator</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
