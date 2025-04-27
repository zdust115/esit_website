import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="text-white text-lg font-semibold">MyApp</div>
      <ul className="flex space-x-4 items-center">
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
        {status === 'authenticated' && (
          <li>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-gray-300 hover:text-white bg-transparent border border-gray-400 hover:border-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
