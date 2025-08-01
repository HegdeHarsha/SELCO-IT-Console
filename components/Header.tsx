import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4">
            <LogoIcon />
            <div>
              <h1 className="text-2xl font-bold text-primary">SELCO India</h1>
              <p className="text-sm text-text-light -mt-1">Sustaining future</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;