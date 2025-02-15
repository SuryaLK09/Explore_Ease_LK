import React from 'react';
import Logo from '../Logo';

export function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Logo />
      </div>
    </nav>
  );
}