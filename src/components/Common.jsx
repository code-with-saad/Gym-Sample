import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function Logo({ light = false }) {
  return (
    <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="Reshape Ladies Fitness Club, home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23.5" fill="currentColor"/><path d="M15.5 33V15h8.6c5 0 7.7 2.6 7.7 6.4s-2.7 6.3-7.7 6.3h-8.6m9 0L32 33" stroke="var(--brand-mark-line, #f8f3e9)" strokeWidth="2.05" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <span className="brand-words"><span className="brand-name">RESHAPE<span className="brand-dot">.</span></span><span className="brand-sub">LADIES FITNESS CLUB</span></span>
    </Link>
  );
}

export function Eyebrow({ children, number, light = false }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-mark" aria-hidden="true">{number || '+'}</span><span>{children}</span></div>;
}

export function ArrowButton({ children, to, href, light = false, outline = false, className = '', ...props }) {
  const classes = `arrow-button ${light ? 'arrow-button-light' : ''} ${outline ? 'arrow-button-outline' : ''} ${className}`;
  const content = <>{children}<ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" /></>;
  return to ? <Link className={classes} to={to} {...props}>{content}</Link> : <a className={classes} href={href} {...props}>{content}</a>;
}

export function TextLink({ children, to, href, className = '', ...props }) {
  const content = <>{children}<ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></>;
  return to ? <Link className={`text-link ${className}`} to={to} {...props}>{content}</Link> : <a className={`text-link ${className}`} href={href} {...props}>{content}</a>;
}

export function Stars({ size = 12, label = 'Rated 4.9 out of 5' }) {
  return <span className="stars" aria-label={label}>{[0,1,2,3,4].map(i => <Star key={i} size={size} strokeWidth={1} fill="currentColor" aria-hidden="true" />)}</span>;
}

export function RoundArrow({ diagonal = false }) {
  return <span className="round-arrow" aria-hidden="true">{diagonal ? <ArrowUpRight size={19} strokeWidth={1.6} /> : <ArrowRight size={19} strokeWidth={1.6} />}</span>;
}

export function SectionHeader({ eyebrow, title, description, link, linkText }) {
  return <div className="section-heading" data-reveal>
    <div><Eyebrow number="01">{eyebrow}</Eyebrow><h2>{title}</h2></div>
    <div className="section-heading-side"><p>{description}</p>{link && <TextLink to={link}>{linkText}</TextLink>}</div>
  </div>;
}

export function PageHero({ eyebrow, title, description, image, imageAlt, imagePosition = 'center', extra }) {
  return <section className="page-hero">
    <div className="page-hero-copy">
      <motion.div initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: .6}}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        {extra}
      </motion.div>
      <span className="page-hero-bottom">RESHAPE LADIES FITNESS CLUB <ArrowDown size={15} /></span>
    </div>
    <div className="page-hero-image">
      <motion.img initial={{scale: 1.04, opacity: .6}} animate={{scale: 1, opacity: 1}} transition={{duration: .9}} src={image} alt={imageAlt} style={{objectPosition: imagePosition}} />
      <span className="photo-note">ILLUSTRATIVE PHOTOGRAPHY</span>
    </div>
  </section>;
}

export function CtaBand({ eyebrow = 'A LITTLE SOMETHING FOR YOU', title = <>Ready when <em>you are.</em></>, text = 'Have a question or want to see the club? We would love to hear from you.' }) {
  return <section className="cta-band">
    <div className="container cta-band-inner" data-reveal>
      <div><Eyebrow light>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p></div>
      <ArrowButton light to="/contact">Get in touch</ArrowButton>
    </div>
  </section>;
}
