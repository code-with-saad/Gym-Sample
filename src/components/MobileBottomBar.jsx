import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Building2, Dumbbell, House, MapPin, Ticket } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/the-club', label: 'Club', icon: Building2 },
  { to: '/classes', label: 'Classes', icon: Dumbbell },
  { to: '/membership', label: 'Plans', icon: Ticket },
  { to: '/contact', label: 'Find us', icon: MapPin },
];

export default function MobileBottomBar() {
  const { pathname } = useLocation();
  const returnToTop = to => {
    if (pathname !== to) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };
  return <nav className="mobile-bottom-bar" aria-label="Quick page navigation">
    {items.map(({to, label, icon: Icon, end}) => <NavLink key={to} to={to} end={end} onClick={() => returnToTop(to)} className={({isActive}) => `bottom-item ${isActive ? 'is-active' : ''}`}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span></NavLink>)}
  </nav>;
}
