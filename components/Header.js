import { useState, useEffect } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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

        <ul className='hidden space-x-4 md:flex'>
          <li className='navLink'>Home</li>
          <li className='navLink'>TV Shows</li>
          <li className='navLink'>Movies</li>
          <li className='navLink'>New & Popular</li>
          <li className='navLink'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-light'>
        <SearchIcon className='sm hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Children</p>
        <BellIcon className='h-6 w-6' />
        <Link href='/account'>
          <img
            src='/assets/profile.png'
            alt='avatar'
            className='cursor-pointer rounded'
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
