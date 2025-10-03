import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  const yellowColor = "#FF9923";
  const bgColor = "#557a95";
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  // Handle scroll event for sticky effect and background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpening = () => setMenuOpen(() => true);
  const handleMenuClosing = () => {
    setMenuOpen(() => false);
  };

  return (
    <>
      {/* Main navbar */}
      <div 
        className="fixed top-0 left-0 w-full z-50 grid grid-cols-2 md:grid-cols-3 h-16 transition-all duration-300"
        style={{ 
          backgroundColor: bgColor,
          boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
        }}
      >
        {/* Mobile Menu Button */}
        <section className='self-center pl-5 lg:hidden'>
          <button 
            onClick={handleMenuOpening}
            className="hover:bg-blue-600 p-2 rounded-md transition-colors"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={yellowColor}
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
          </button>
        </section>

        {/* Logo */}
        <section className='self-center hidden md:flex md:justify-center lg:justify-start lg:pl-4'>
          <div className="transition-transform hover:scale-105 duration-300">
            <img src={logo} alt='logo' className='w-[150px]' />
          </div>
        </section>

        {/* Desktop Nav Links - Only visible on large screens */}
        <section className='hidden lg:flex items-center justify-center'>
          <div className='flex items-center space-x-6'>
            {/* Animated icon - left */}
            <svg
              className='w-5 h-5 animate-spin text-yellow-400'
              fill={yellowColor}
              focusable='false'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z'></path>
            </svg>
            
            {/* Home Link */}
            <Link
              to='/' replace={true}
              className='text-yellow-400 flex font-semibold hover:text-white transition-colors duration-300 group'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill={yellowColor}
                className='w-5 h-5 group-hover:scale-110 transition-transform duration-300'
              >
                <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
              </svg>
              <span className='self-center pl-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:bg-yellow-400'>Home</span>
            </Link>
            
            {/* Caregivers Link */}
            <Link
              to='/caregiver' replace={true}
              className='text-yellow-400 flex font-semibold hover:text-white transition-colors duration-300 group'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill={yellowColor}
                className='w-5 h-6 group-hover:scale-110 transition-transform duration-300'
              >
                <path d='M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z' />
              </svg>
              <span className='self-center pl-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:bg-yellow-400'>Caregivers</span>
            </Link>
            
            {/* Providers Link */}
            <Link
              to='/provider' replace={true}
              className='text-yellow-400 flex font-semibold hover:text-white transition-colors duration-300 group'
            >
              <svg
                focusable='false'
                viewBox='0 0 24 24'
                aria-hidden='true'
                className='w-6 h-6 group-hover:scale-110 transition-transform duration-300'
                fill={yellowColor}
              >
                <path d='M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z'></path>
              </svg>
              <span className='self-center pl-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:bg-yellow-400'>Providers</span>
            </Link>
            
            {/* Animated icon - right */}
            <svg
              className='w-5 h-5 animate-spin text-yellow-400'
              fill={yellowColor}
              focusable='false'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z'></path>
            </svg>
          </div>
        </section>
        
        {/* Auth Buttons */}
        <section className='flex justify-self-end self-center pr-2 space-x-2'>
          <div className='bg-white hover:bg-blue-50 text-yellow-400 flex items-center px-4 py-2 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-1'>
            <Link to='/login' replace={true} className='font-medium'>
              Login
            </Link>
          </div>

          <div className='bg-yellow-400 hover:bg-yellow-500 flex px-4 py-2 rounded-md shadow-md text-white transition-all duration-300 transform hover:-translate-y-1'>
            <Link to='/signup' replace={true} className='text-[16px] font-bold'>
              Sign Up
            </Link>
          </div>
        </section>
      </div>

      {/* Mobile Menu - Redesigned as a top dropdown instead of sidebar */}
      {isMenuOpen && (
        <div className='fixed top-16 left-0 w-full z-40 lg:hidden'>
          <div className='bg-white shadow-lg rounded-b-lg border-t border-gray-200'>
            {/* Mobile Logo centered */}
            <div className='flex justify-center py-4'>
              <img src={logo} alt='logo' className='w-[120px]' />
            </div>
            
            {/* Mobile Nav Links - Horizontal centering */}
            <div className='flex flex-col items-center py-4 space-y-4'>
              {/* Home Link */}
              <Link
                to='/' replace={true}
                onClick={handleMenuClosing}
                className='text-yellow-400 flex text-[18px] font-semibold hover:text-blue-600 transition-colors duration-300 w-full justify-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={yellowColor}
                  className='w-5 h-5'
                >
                  <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                  <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
                </svg>
                <span className='self-center pl-2'>Home</span>
              </Link>
              
              {/* Caregivers Link */}
              <Link
                to='/caregiver' replace={true}
                onClick={handleMenuClosing}
                className='text-yellow-400 flex text-[18px] font-semibold hover:text-blue-600 transition-colors duration-300 w-full justify-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={yellowColor}
                  className='w-5 h-6'
                >
                  <path d='M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z' />
                </svg>
                <span className='self-center pl-2'>Caregivers</span>
              </Link>
              
              {/* Providers Link */}
              <Link
                to='/provider' replace={true}
                onClick={handleMenuClosing}
                className='text-yellow-400 flex text-[18px] font-semibold hover:text-blue-600 transition-colors duration-300 w-full justify-center'
              >
                <svg
                  focusable='false'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  fill={yellowColor}
                  className='w-6 h-6'
                >
                  <path d='M8 10H5V7H3v3H0v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3S14.66 5 13 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z'></path>
                </svg>
                <span className='self-center pl-2'>Providers</span>
              </Link>

              {/* Close button */}
              <button
                className='mt-4 text-red-500 hover:text-red-700 font-medium flex items-center'
                onClick={handleMenuClosing}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill="currentColor"
                  className='w-5 h-5 mr-1'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
                    clipRule='evenodd'
                  />
                </svg>
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from being hidden under navbar */}

      <div className="h-16 mb-4"
       style={{ 
        backgroundColor: bgColor,
      }}>


      </div>
    </>
  );
};