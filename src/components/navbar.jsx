import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="text-white text-lg font-semibold">MyApp</div>
      <ul className="flex items-center">
        <li className="text-gray-300 hover:text-white px-4">
          <Link href="/">Home</Link>
        </li>
        <li className="text-gray-300 hover:text-white px-4 border-l border-gray-600">
          <Link href="/sensors-data">Sensor Table</Link>
        </li>
        <li className="text-gray-300 hover:text-white px-4 border-l border-gray-600">
          <Link href="/alerts">Alerts</Link>
        </li>
        {status === 'authenticated' && (
          <li className="text-gray-300 hover:text-white px-4 border-l border-gray-600">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-transparent border border-gray-400 hover:border-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}