import { useState, useEffect } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${scrolled && "bg-[#141414]"}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='/assets/logo.svg'
          alt='logo'
          width={100}
          height={100}
          className='cursor-pointer object-contain z-40'
        />

        <div className='menu'>
          <button
            className='ml-2 text-sm flex items-center'
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            Browse
            <FaCaretDown className='h-5 w-5 ml-1' />
          </button>
          <AnimatePresence>
            {mobileMenu && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='menuUl'
              >
                <div
                  className='absolute -top-[16px] left-1/2 border-[7px] h-0 w-0'
                  style={{ borderColor: "transparent transparent #e5e5e5" }}
                />
                <div className='absolute -top-[2px] left-0 right-0 h-[2px] bg-[#e5e5e5]' />
                <li className='menuItemLi text-white'>Home</li>
                <li className='menuItemLi'>TV Shows</li>
                <li className='menuItemLi'>Movies</li>
                <li className='menuItemLi'>New & Popular</li>
                <li className='menuItemLi'>My List</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <ul className='hidden space-x-4 md:flex'>
          <li className='navLink'>Home</li>
          <li className='navLink'>TV Shows</li>
          <li className='navLink'>Movies</li>
          <li className='navLink'>New & Popular</li>
          <li className='navLink'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-medium'>
        <SearchIcon className='sm hidden h-6 w-6 sm:inline cursor-pointer' />
        <p className='hidden lg:inline cursor-pointer'>Children</p>
        <BellIcon className='h-6 w-6 cursor-pointer' />

        <div
          onClick={() => setAccountMenu(!accountMenu)}
          className='flex items-center cursor-pointer'
        >
          <img src='/assets/profile.png' alt='avatar' className='rounded' />
          <motion.div
            className='w-4 h-4 ml-2 hidden md:inline-flex '
            initial={{ rotate: 0 }}
            animate={{ rotate: accountMenu ? 180 : 0 }}
          >
            <FaCaretDown className='h-full w-full' />
          </motion.div>
        </div>

        <AnimatePresence>
          {accountMenu && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='accountMenu'
            >
              <div
                className='absolute -top-[16px] right-1 md:right-3 border-[7px] h-0 w-0'
                style={{ borderColor: "transparent transparent #e5e5e5" }}
              />
              <div className='absolute -top-[2px] left-0 right-0 h-[2px] bg-[#e5e5e5]' />
              <li className='acccountMenuItem'>
                <img
                  className='rounded-md mr-3'
                  src='/assets/kids.png'
                  alt='kids logo'
                />
                Children
              </li>
              <Link href='/account'>
                <li className='acccountMenuItem'>
                  <UserIcon className='h-6 w-6 text-gray-400 mr-3' />
                  Account
                </li>
              </Link>
              <li onClick={logout} className='acccountMenuItem'>
                Sign out of Netflix
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
