import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </Link>
  );
};

export default NavLink;