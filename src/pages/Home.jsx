import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Dumbbell, Globe2, MapPin, Phone, ShieldCheck, Wifi } from 'lucide-react';
import { ArrowButton, Eyebrow, Stars, TextLink } from '../components/Common';
import { MAP_URL, PHONE_DISPLAY, PHONE_TEL } from '../constants';

const ScrollDumbbell3D = lazy(() => import('../components/ScrollDumbbell3D'));
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const hero = useRef(null);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-dark-image', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-dark-content', { y: -42, opacity: .35, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, hero);
    return () => ctx.revert();
  }, []);
  return <section className="hero-dark" ref={hero}>
    <picture className="hero-dark-picture"><source media="(max-width: 700px)" srcSet="/images/dark-hero-mobile.jpg" /><img className="hero-dark-image" src="/images/dark-hero-wide.jpg" alt="A woman strength training in a gym" fetchpriority="high" /></picture>
    <div className="hero-dark-shade" aria-hidden="true" />
    <motion.div className="hero-dark-top" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .7}}><span><i /> WOMEN-OWNED &amp; WOMEN-ONLY</span><span>WAPDA TOWN, LAHORE</span></motion.div>
    <div className="hero-dark-inner container"><motion.div className="hero-dark-content" initial={{opacity: 0, y: 35}} animate={{opacity: 1, y: 0}} transition={{duration: .8, ease: [.2,.8,.2,1]}}>
      <div className="hero-dark-kicker"><span /> LAHORE'S WOMEN-ONLY FITNESS CLUB</div>
      <h1>STRONG<br /><em>STARTS HERE.</em></h1>
      <p>Women-owned. Women-only. Strength, movement and community in WAPDA Town, Lahore.</p>
      <div className="hero-dark-actions"><ArrowButton to="/contact?interest=Visit">Book a visit</ArrowButton><Link className="hero-outline-button" to="/classes">Explore classes <ArrowUpRight size={18} /></Link></div>
      <div className="hero-social-proof"><strong>4.9<span>/5</span></strong><div><Stars size={13} /><span>777+ GOOGLE REVIEWS</span></div></div>
    </motion.div></div>
    <div className="hero-dark-bottom"><span>ILLUSTRATIVE PHOTOGRAPHY</span><a href="#the-motion">SCROLL TO MOVE <ArrowDown size={15} /></a></div>
  </section>;
}

function MotionTicker() {
  const outer = useRef(null);
  const track = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.to(track.current, { xPercent: -50, duration: 23, repeat: -1, ease: 'none', paused: true });
    const observer = new IntersectionObserver(entries => entries[0]?.isIntersecting ? tween.play() : tween.pause(), { rootMargin: '80px' });
    observer.observe(outer.current);
    return () => { observer.disconnect(); tween.kill(); };
  }, []);
  const text = <><span>STRENGTH</span><b>+</b><span>CONFIDENCE</span><b>+</b><span>COMMUNITY</span><b>+</b><span>YOUR SPACE</span><b>+</b></>;
  return <div className="motion-ticker" ref={outer} aria-label="Strength, confidence, community, your space"><div className="motion-ticker-track" ref={track}><div>{text}</div><div aria-hidden="true">{text}</div></div></div>;
}

function ScrollStory() {
  const section = useRef(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setLoad(true); return; }
    const observer = new IntersectionObserver(entries => { if (entries[0]?.isIntersecting) { setLoad(true); observer.disconnect(); } }, { rootMargin: '900px' });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: 'top 72px', end: 'bottom bottom', scrub: .45, invalidateOnRefresh: true } });
      tl.to('.story-line-a', { xPercent: -15, opacity: 0, duration: .32, ease: 'none' }, .18)
        .fromTo('.story-line-b', { xPercent: 12, opacity: 0 }, { xPercent: 0, opacity: 1, duration: .3, ease: 'none' }, .42)
        .to('.story-ring', { rotation: 115, duration: 1, ease: 'none' }, 0)
        .to('.story-progress i', { scaleX: 1, duration: 1, ease: 'none' }, 0);
    }, section);
    return () => ctx.revert();
  }, []);
  return <section className="scroll-story" id="the-motion" ref={section}>
    <div className="story-stage">
      <div className="story-meta"><span>01 / THE RESHAPE DIFFERENCE</span><span>SCROLL TO MOVE <ArrowDown size={14} /></span></div>
      <div className="story-ring ring-outer" aria-hidden="true"/><div className="story-ring ring-inner" aria-hidden="true"/>
      {load && <Suspense fallback={<div className="story-canvas" />}><ScrollDumbbell3D sectionRef={section} /></Suspense>}
      <div className="story-title story-line-a"><span>THIS SPACE IS YOURS</span><h2>YOUR SPACE.<br /><em>YOUR STRENGTH.</em></h2></div>
      <div className="story-title story-line-b"><span>WOMEN-OWNED. WOMEN-ONLY.</span><h2>SHOW UP<br /><em>FOR YOU.</em></h2></div>
      <div className="story-bottom"><p>Strength looks different on everyone.<br />There's room for yours here.</p><div className="story-progress"><span>THE RESHAPE WAY</span><div><i /></div></div></div>
    </div>
  </section>;
}

const highlights = [
  { icon: ShieldCheck, title: 'WOMEN-OWNED', detail: 'A space made for women', to: '/the-club' },
  { icon: Dumbbell, title: 'MOVE YOUR WAY', detail: 'At the club or online', to: '/classes' },
  { icon: Wifi, title: 'THE ESSENTIALS', detail: 'Free Wi-Fi & restroom', to: '/the-club' },
  { icon: Clock3, title: 'ROOM IN YOUR DAY', detail: 'Mon - Sat, 7 AM - 10 PM', to: '/contact' },
];
function Highlights() {
  return <section className="highlights container" aria-label="Club highlights">{highlights.map(({icon: Icon, title, detail, to}, i) => <Link key={title} to={to} className="highlight-item" data-reveal><span className="highlight-icon"><Icon size={22} strokeWidth={1.5} /></span><span><strong>{title}</strong><small>{detail}</small></span><span className="highlight-n">0{i+1}</span></Link>)}</section>;
}

const programs = [
  { num: '01', img: '/images/dark-strength.jpg', alt: 'A woman training with a dumbbell', title: 'STRENGTH TRAINING', text: 'Find your rhythm on the gym floor.', label: 'AT THE CLUB', to: '/classes#onsite' },
  { num: '02', img: '/images/dark-classes.jpg', alt: 'Women moving together in a fitness class', title: 'CLASSES & MOVEMENT', text: 'Move together, at your own pace.', label: 'IN PERSON', to: '/classes#onsite' },
  { num: '03', img: '/images/dark-online.jpg', alt: 'A woman stretching at home beside a laptop', title: 'ONLINE SERVICES', text: 'Ask about ways to move from home.', label: 'FROM YOUR SPACE', to: '/classes#online' },
];
function Programs() {
  return <section className="program-section container section" id="programs">
    <div className="dark-section-heading" data-reveal><div><Eyebrow number="02">WAYS TO MOVE</Eyebrow><h2>FIND YOUR<br /><em>THING.</em></h2></div><div><p>On the gym floor, in a class, or from home. Find the movement that fits your day.</p><TextLink to="/classes">Explore all services</TextLink></div></div>
    <div className="program-swipe">SWIPE TO EXPLORE <ArrowRight size={15} /></div>
    <div className="program-grid">{programs.map(item => <div className="program-motion" data-reveal key={item.num}><motion.div className="program-card" whileHover={{y: -7, rotateY: -2}} transition={{type: 'spring', stiffness: 190, damping: 22}}><Link to={item.to}><div className="program-image"><img src={item.img} alt={item.alt} data-parallax loading="lazy" /><span className="program-number">{item.num} / 03</span><span className="program-arrow"><ArrowUpRight size={20} /></span></div><div className="program-card-body"><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><div className="program-more">EXPLORE <ArrowRight size={15} /></div></div></Link></motion.div></div>)}</div>
    <p className="dark-photo-note">Imagery is illustrative. Contact the club for current class details.</p>
  </section>;
}

function Community() {
  return <section className="community-dark"><div className="community-photo"><img src="/images/dark-community.jpg" alt="Two women smiling together after a workout" data-parallax loading="lazy" /><span>ILLUSTRATIVE PHOTOGRAPHY</span><div className="community-photo-label"><strong>WOMEN<br /><em>FOR WOMEN.</em></strong><small>WAPDA TOWN / LAHORE</small></div></div><div className="community-copy" data-reveal><Eyebrow number="03">MORE THAN A WORKOUT</Eyebrow><h2>A SPACE THAT<br /><em>FEELS LIKE YOURS.</em></h2><p>Reshape is a women-owned, women-only club where you can take your time, find your rhythm and feel comfortable showing up.</p><div className="community-points"><div><strong>01</strong><span>Women-owned &amp; women-only</span></div><div><strong>02</strong><span>On-site &amp; online services</span></div><div><strong>03</strong><span>Right here in Lahore</span></div></div><ArrowButton to="/the-club">Meet the club</ArrowButton></div></section>;
}

const reviewSource = 'https://www.top-rated.online/cities/Lahore+District/place/p/3249022/Reshape+Ladies+Fitness+Club';
const reviews = [
  { name: 'Minahil A.', initial: 'M', quote: 'The environment feels super comfortable, safe, and motivating...' },
  { name: 'Fatima A.', initial: 'F', quote: 'The trainers are friendly, and always ready to help...' },
];
function Testimonials() {
  const [current, setCurrent] = useState(0);
  const previous = () => setCurrent(n => (n + reviews.length - 1) % reviews.length);
  const next = () => setCurrent(n => (n + 1) % reviews.length);
  return <section className="testimonials-section section"><div className="container"><div className="dark-section-heading" data-reveal><div><Eyebrow number="04">THE COMMUNITY</Eyebrow><h2>REAL WOMEN.<br /><em>REAL WORDS.</em></h2></div><p>Don't just take our word for it. Here's what women have shared about Reshape.</p></div><div className="testimonials-layout" data-reveal><div className="review-summary"><span>OUR COMMUNITY RATING</span><div><strong>4.9</strong><small>/ 5</small></div><Stars size={18} /><p>777+ Google reviews</p><a href={MAP_URL} target="_blank" rel="noreferrer">See us on Google Maps <ArrowUpRight size={15} /></a></div><div className="testimonial-shell" aria-live="polite" aria-atomic="true"><div className="testimonial-top"><span>MEMBER WORDS</span><span>0{current + 1} / 0{reviews.length}</span></div><AnimatePresence mode="wait" initial={false}><motion.article className="testimonial-card" key={current} initial={{opacity: 0, x: 28}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -28}} transition={{duration: .28}}><Stars size={15} label="5 out of 5" /><blockquote>“{reviews[current].quote}”</blockquote><div className="review-person"><span className="review-avatar">{reviews[current].initial}</span><div><strong>{reviews[current].name}</strong><span>Google review</span></div><a href={reviewSource} target="_blank" rel="noreferrer" aria-label={`Read ${reviews[current].name}'s review`}><ArrowUpRight size={18} /></a></div></motion.article></AnimatePresence><div className="testimonial-bottom"><a href={reviewSource} target="_blank" rel="noreferrer">READ THE REVIEWS <ArrowUpRight size={14} /></a><div><button type="button" onClick={previous} aria-label="Previous review"><ArrowLeft size={18} /></button><button type="button" onClick={next} aria-label="Next review"><ArrowRight size={18} /></button></div></div></div></div></div></section>;
}

function Membership() {
  const types = ['MONTHLY', 'QUARTERLY', 'ANNUAL', 'ONLINE'];
  return <section className="home-plans section"><div className="container"><div className="dark-section-heading" data-reveal><div><Eyebrow number="05">YOUR NEXT STEP</Eyebrow><h2>MAKE IT<br /><em>YOUR ROUTINE.</em></h2></div><div><p>Membership is required. Talk to the club about current packages, availability and fees.</p><TextLink to="/membership">Explore membership</TextLink></div></div><div className="plan-preview-grid">{types.map((type, i) => <Link data-reveal to={`/contact?interest=${encodeURIComponent(i === 3 ? 'Online membership' : `${type.charAt(0)}${type.slice(1).toLowerCase()} membership`)}`} key={type}><span>0{i+1}</span><strong>{type}</strong><small>ASK ABOUT THIS OPTION</small><ArrowUpRight size={19} /></Link>)}</div><p className="plan-preview-note">Example package types. Availability and fees should be confirmed with the club.</p></div></section>;
}

function Visit() {
  return <section className="home-visit-dark container section"><div className="dark-section-heading" data-reveal><div><Eyebrow number="06">COME SAY HELLO</Eyebrow><h2>FIND US IN<br /><em>WAPDA TOWN.</em></h2></div><div><p>Questions about classes or membership? We'd love to hear from you.</p><ArrowButton to="/contact">Plan your visit</ArrowButton></div></div><div className="visit-dark-grid" data-reveal><div><MapPin size={21} /><span>FIND THE CLUB</span><strong>2nd Floor, Usmania Tower<br />Rehmat Market, WAPDA Town</strong><a href={MAP_URL} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={14} /></a></div><div><Clock3 size={21} /><span>CLUB HOURS</span><strong>Mon - Sat: 7 AM - 10 PM<br />Sunday: Closed</strong></div><div><Phone size={21} /><span>GIVE US A CALL</span><strong>{PHONE_DISPLAY}</strong><a href={`tel:${PHONE_TEL}`}>CALL THE CLUB <ArrowUpRight size={14} /></a></div></div></section>;
}

export default function Home() {
  return <><Hero /><MotionTicker /><ScrollStory /><Highlights /><Programs /><Community /><Testimonials /><Membership /><Visit /></>;
}
