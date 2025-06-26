import React,{ useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import BackToTop from '../components/BackToTop';
import '../assets/css/backToTop.css'

export default function RootLayout(props) {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  };

  return (
    <div className='root-layout'>
      <Header />
      <main>
        <Outlet />
      </main>
      {showComponent && (
          <BackToTop />
      )}
      <Footer />
    </div>
  );
};