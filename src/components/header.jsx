'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import '../componentCss/header.css';

export default function HeaderCompo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="websiteName">My AI Friend</div>
        <div className="dropdown">
          <button className="dropdownButton" onClick={toggleDropdown}>
            Menu
          </button>
          {isDropdownOpen && (
            <div className="dropdownContent">
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
