"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'home', label: 'Map', href: '/' },
  { id: 'about', label: 'Table', href: '/sensor-data' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isMenuOpen = false; // placeholder for mobile menu state

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">
        <Link href="/">IlMioLogo</Link>
      </div>

      {/* Main Nav Links */}
      <ul className="hidden md:flex gap-6">
        {navItems.map(item => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`hover:underline ${pathname === item.href ? 'font-semibold text-blue-600' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle menu"
        className="md:hidden focus:outline-none"
        onClick={() => {
          // implement mobile menu toggle logic here
          // e.g., setIsMenuOpen(prev => !prev)
        }}
      >
        {/* Example icon, replace with react-icons if desired */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Nav Links (Toggle) */}
      {isMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`hover:underline ${pathname === item.href ? 'font-semibold text-blue-600' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
