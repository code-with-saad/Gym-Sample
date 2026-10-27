import React, { useEffect, useLayoutEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import Home from './pages/Home';
import Club from './pages/Club';
import Classes from './pages/Classes';
import Membership from './pages/Membership';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' }), 200);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { y: mobile ? 42 : 65, opacity: 0, scale: .97 }, {
          y: 0, opacity: 1, scale: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 91%', once: true },
        });
      });
      document.querySelectorAll('[data-parallax]').forEach(el => {
        gsap.fromTo(el, { yPercent: mobile ? -3 : -6, scale: 1.1 }, {
          yPercent: mobile ? 3 : 6, scale: 1.1, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });
    return () => { ctx.revert(); };
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <PageEffects />
    <motion.main id="main-content" key={location.pathname} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .35}}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/the-club" element={<Club />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<section className="not-found container"><h1>Let's get you back on track.</h1><Link to="/" className="text-link">Back to home →</Link></section>} />
      </Routes>
    </motion.main>
    <Footer />
    <MobileBottomBar />
  </>;
}
