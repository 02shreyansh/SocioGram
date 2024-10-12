import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
  Menu as MenuIcon,
  Close as CloseIcon

} from '@mui/icons-material';

const Header = () => {
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    setTab(location.pathname);
  }, [location]);

  const handleMenuClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      navigate("/account");
    } else {
      setMenuOpen(true);
      navigate('/menu');
    }
  };

  const NavLink = ({ to, Icon, ActiveIcon, className = '' ,onClick }) => (
    <Link
      to={to}
      onClick={() => {
        setTab(to);
        if (onClick) onClick();
      }}
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out 
        ${tab === to ? 'bg-blue-100' : 'hover:bg-gray-100'} ${className}`}
    >
      {tab === to ? (
        <ActiveIcon className="w-6 h-6 text-blue-600" />
      ) : (
        <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
      )}
    </Link>
  );
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-screen-lg mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">SocioGram</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <NavLink to="/" Icon={HomeOutlined} ActiveIcon={Home} />
            <NavLink to="/newpost" Icon={AddOutlined} ActiveIcon={Add} />
            <NavLink to="/search" Icon={SearchOutlined} ActiveIcon={Search} />
            <NavLink to="/account" Icon={AccountCircleOutlined} ActiveIcon={AccountCircle} />
          </nav>

          {/* Mobile Account Icon */}
          <button
            onClick={handleMenuClick}
            className="md:hidden lg:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-100"
          >
            {menuOpen ? (
              <CloseIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>

          
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
        <div className="max-w-screen-lg mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <NavLink to="/" Icon={HomeOutlined} ActiveIcon={Home} />
            <NavLink to="/newpost" Icon={AddOutlined} ActiveIcon={Add} />
            <NavLink to="/search" Icon={SearchOutlined} ActiveIcon={Search} />
            <NavLink to="/account" Icon={AccountCircleOutlined} ActiveIcon={AccountCircle}  />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
