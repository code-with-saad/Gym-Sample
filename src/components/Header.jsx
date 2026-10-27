import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Common';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/the-club', label: 'The club' },
  { to: '/classes', label: 'Classes' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact', label: 'Find us' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    const onEscape = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);
  return <>
    <div className="announcement"><div className="announcement-inner"><span>WOMEN-OWNED <span className="announcement-dot">●</span> WOMEN-ONLY <span className="announcement-dot">●</span> LAHORE</span><span className="announcement-hours">MON - SAT, 7AM - 10PM <span className="announcement-dot">/</span> SUNDAY CLOSED</span></div></div>
    <header className="site-header">
      <div className="nav-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <NavLink end={link.end} key={link.to} to={link.to} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>{link.label}</NavLink>)}</nav>
        <div className="nav-actions"><Link to="/contact?interest=Visit" className="nav-book">Book a visit <ArrowUpRight size={16} strokeWidth={1.8} /></Link>
          <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} transition={{duration: .22}}>{links.map(link => <NavLink end={link.end} key={link.to} to={link.to} className={({isActive}) => isActive ? 'mobile-link active' : 'mobile-link'} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} /></NavLink>)}<Link className="mobile-book" to="/contact?interest=Visit" onClick={() => setOpen(false)}>Book a visit <ArrowUpRight size={17} /></Link></motion.nav>}</AnimatePresence>
    </header>
  </>;
}
