import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Common';
import { MAP_URL, PHONE_DISPLAY, PHONE_TEL } from '../constants';

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-top container">
      <div className="footer-intro"><Logo light /><p>A little more room to be you.<br />A lot more room to get strong.</p><Link to="/contact?interest=Visit" className="footer-cta">Come say hello <ArrowUpRight size={18} /></Link></div>
      <div className="footer-col"><span className="footer-label">EXPLORE</span><Link to="/the-club">The club</Link><Link to="/classes">Classes &amp; services</Link><Link to="/membership">Membership</Link><Link to="/contact">Find us</Link></div>
      <div className="footer-col"><span className="footer-label">COME FIND US</span><p>2nd floor, Usmania Tower,<br />Rehmat Market, WAPDA Town,<br />Lahore, 54770, Pakistan</p><a href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
      <div className="footer-col"><span className="footer-label">SAY HELLO</span><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a><p>Mon - Sat: 7:00 AM - 10:00 PM<br />Sunday: Closed</p></div>
    </div>
    <div className="footer-word" aria-hidden="true">RESHAPE<span>.</span></div>
    <div className="footer-bottom container"><span>© {new Date().getFullYear()} RESHAPE LADIES FITNESS CLUB</span><span>WOMEN-OWNED. WOMEN-ONLY. LAHORE.</span><span>IMAGERY IS ILLUSTRATIVE</span></div>
  </footer>;
}
