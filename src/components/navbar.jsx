import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="text-white text-lg font-semibold">MyApp</div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="/sensors-data" className="text-gray-300 hover:text-white">
            Sensor Table
          </Link>
        </li>
      </ul>
    </nav>
  );
}
