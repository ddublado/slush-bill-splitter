'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="text-3xl font-bold text-primary">
          $LUSH
        </Link>
        <nav className="hidden items-center space-x-8 text-lg font-semibold md:flex">
          <button 
            onClick={() => isHomePage ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.location.href = '/'}
            className="text-gray-700 hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-primary transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('cta')}
            className="text-gray-700 hover:text-primary transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </nav>
        <a 
          href="/split"
          className="primary-btn px-6 py-3 text-base inline-flex items-center justify-center rounded-2xl font-bold text-white transition-all hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
          style={{ 
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            textDecoration: 'none'
          }}
        >
          Split a Bill
        </a>
      </div>
    </header>
  );
};

export default Header; 