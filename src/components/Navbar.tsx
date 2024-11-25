import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dices, Search, Settings } from 'lucide-react';
import NavLink from './NavLink';

const Navbar = () => {
  return (
    <nav className="bg-[#0f1219] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Dices className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold">Sports Logic Zone</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <NavLink to="/" label="Home" />
                <NavLink to="/ev-bets" label="+EV Bets" />
                <NavLink to="/arbitrage" label="Arbitrage" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;