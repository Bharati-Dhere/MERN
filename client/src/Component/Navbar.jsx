import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <a href="/">MyLogo</a>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a href="#about" className="text-gray-700 hover:text-blue-600">About Us</a>
          <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact Us</a>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
