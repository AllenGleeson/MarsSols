import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import BackToTop from '../components/BackToTop';
import '../assets/css/backToTop.css'

export default function RootLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='root-layout'>
      <Header scrolled={scrolled} />
      <main>
        <Outlet />
      </main>
      {scrolled && <BackToTop />}
      <Footer />
    </div>
  );
};
