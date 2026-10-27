import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CreditCard, Plus, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowButton, CtaBand, Eyebrow } from '../components/Common';

const options = [
  { n: '01', label: 'MONTHLY', title: 'A month at a time.', description: 'Ask about a shorter-term way to get started.', interest: 'Monthly membership' },
  { n: '02', label: 'QUARTERLY', title: 'A little more time.', description: 'Ask about building a routine over a few months.', interest: 'Quarterly membership' },
  { n: '03', label: 'ANNUAL', title: 'In it for the long run.', description: 'Ask about options for making movement a habit.', interest: 'Annual membership' },
  { n: '04', label: 'ONLINE', title: 'From wherever you are.', description: 'Ask about taking part in online services from home.', interest: 'Online membership' },
];
const questions = [
  ['Is membership required?', 'Yes. Membership is required. Please contact the club to find out what is included and how to join.'],
  ['How much does membership cost?', 'Current fees and package availability have not been provided for this sample. Please contact the club for up-to-date pricing.'],
  ['Are there online classes?', 'Yes, online classes and services are listed. Ask the club about current formats, schedules, and any online membership options.'],
  ['Which payment methods are accepted?', 'Credit and debit cards and NFC payments are listed as accepted. Please confirm payment arrangements with the club. Online checkout is not connected in this sample.'],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{questions.map(([q,a], i) => <div className="faq-item" key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><Plus size={20} className={open === i ? 'faq-plus is-open' : 'faq-plus'} /></button><AnimatePresence initial={false}>{open === i && <motion.div className="faq-answer" initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}} transition={{duration: .2}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div>;
}

export default function Membership() {
  return <>
    <section className="membership-hero"><div className="container membership-hero-inner"><div><Eyebrow>MEMBERSHIP AT RESHAPE</Eyebrow><h1>A little commitment.<br /><em>A lot of you time.</em></h1><p>Good things start with showing up. Let's find the right way for you to be part of Reshape.</p><a href="#options" className="membership-scroll">EXPLORE YOUR OPTIONS <ArrowDown size={16} /></a></div><div className="membership-hero-stamp" aria-hidden="true"><span>MADE FOR YOU</span><strong>R<span>.</span></strong><small>WOMEN ONLY · LAHORE</small></div></div></section>
    <section id="options" className="section container membership-options"><div className="section-heading" data-reveal><div><Eyebrow number="01">LET'S FIND YOUR FIT</Eyebrow><h2>Membership,<br />made <em>personal.</em></h2></div><div className="section-heading-side"><p>Membership is required. The options below are examples; please check current package availability and fees directly with the club.</p></div></div><div className="plan-grid">{options.map(option => <motion.div data-reveal key={option.n} className="plan-card" whileHover={{y: -5, rotateY: -1}} transition={{type: 'spring', stiffness: 180, damping: 20}}><div className="plan-top"><span>{option.label}</span><span>{option.n} / 04</span></div><h3>{option.title}</h3><p>{option.description}</p><div className="plan-price"><strong>Fees on request</strong><span>Confirm availability with the club</span></div><Link to={`/contact?interest=${encodeURIComponent(option.interest)}`}>Enquire about this option <ArrowUpRight size={17} /></Link></motion.div>)}</div><div className="membership-disclaimer">These package types are sample options, not confirmed offers. Please contact Reshape for actual packages and prices.</div></section>
    <section className="payment-section"><div className="container payment-inner" data-reveal><div><Eyebrow number="02">THE PRACTICAL BITS</Eyebrow><h2>Simple from<br />the <em>start.</em></h2><p>Credit and debit cards and NFC payments are listed as accepted. Ask the club to confirm current payment arrangements.</p><p className="payment-small">Online checkout is not connected in this sample website.</p></div><div className="payment-cards"><div><CreditCard size={27} strokeWidth={1.4} /><strong>Credit &amp; debit cards</strong><span>Ask the club for payment details.</span></div><div><Radio size={27} strokeWidth={1.4} /><strong>NFC payments</strong><span>Contactless payment is listed.</span></div></div></div></section>
    <section className="section container faq-section"><div data-reveal><Eyebrow number="03">GOOD TO KNOW</Eyebrow><h2>A few things<br />you might <em>ask.</em></h2><p>Still have a question? We'd be happy to help.</p><ArrowButton to="/contact?interest=Membership">Talk to us</ArrowButton></div><div data-reveal><Faq /></div></section>
    <CtaBand eyebrow="TAKE THE FIRST STEP" title={<>Your space<br />is <em>waiting.</em></>} text="Ask us about the latest membership options and plan a visit." />
  </>;
}
