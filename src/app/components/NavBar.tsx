'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 group" aria-label="MovieHub - Home">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-amber-500 group-hover:text-amber-400 transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
                    />
                  </svg>
                  <span className="ml-2 text-2xl font-bold text-amber-500 group-hover:text-amber-400 transition-colors">MovieHub</span>
                </div>
              </Link>
              <div className="ml-10 flex items-baseline space-x-4" role="menubar">
                <NavLink href="/" isActive={pathname === '/'} current={pathname === '/'}>
                  Home
                </NavLink>
                <NavLink 
                  href="/movies" 
                  isActive={pathname === '/movies' || pathname.startsWith('/movies/')}
                  current={pathname === '/movies' || pathname.startsWith('/movies/')}
                >
                  Movies
                </NavLink>
                <NavLink href="/guides" isActive={pathname === '/guides'} current={pathname === '/guides'}>
                  Watch Guides
                </NavLink>
                <NavLink href="/admin" isActive={pathname === '/admin'} current={pathname === '/admin'}>
                  Admin
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  current: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, current, children }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-amber-500 text-gray-900 hover:bg-amber-600' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
      role="menuitem"
      aria-current={current ? 'page' : undefined}
    >
      {children}
    </Link>
  );
} 