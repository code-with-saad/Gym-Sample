import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { Eyebrow } from '../components/Common';
import { ADDRESS, MAP_EMBED_URL, MAP_URL, PHONE_DISPLAY, PHONE_TEL } from '../constants';

const interests = ['Visit', 'Classes', 'On-site training', 'Online classes', 'Membership', 'Monthly membership', 'Quarterly membership', 'Annual membership', 'Online membership', 'Something else'];

function InquiryForm() {
  const [params] = useSearchParams();
  const initialInterest = interests.includes(params.get('interest')) ? params.get('interest') : 'Visit';
  const [fields, setFields] = useState({ name: '', phone: '', interest: initialInterest, message: '' });
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const interest = interests.includes(params.get('interest')) ? params.get('interest') : 'Visit';
    setFields(prev => ({ ...prev, interest }));
  }, [params]);
  const update = e => { setFields({...fields, [e.target.name]: e.target.value}); setOpened(false); };
  const text = `Hello Reshape Ladies Fitness Club,\n\nMy name is ${fields.name}.\nPhone: ${fields.phone}\nI'm interested in: ${fields.interest}.${fields.message ? `\n\n${fields.message}` : ''}`;
  const whatsappLink = `https://wa.me/${PHONE_TEL.replace('+', '')}?text=${encodeURIComponent(text)}`;
  const submit = e => {
    e.preventDefault();
    setOpened(true);
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-title"><span>LET'S TALK</span><h2>Send us a <em>note.</em></h2><p>Tell us a little about what you're looking for.</p></div>
    <div className="form-row"><label>Your name <input name="name" value={fields.name} onChange={update} placeholder="Your name" autoComplete="name" required /></label><label>Phone number <input name="phone" type="tel" value={fields.phone} onChange={update} placeholder="Your phone number" autoComplete="tel" required /></label></div>
    <label>I'm interested in <select name="interest" value={fields.interest} onChange={update}>{interests.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
    <label>Your message <span className="optional">(optional)</span><textarea name="message" value={fields.message} onChange={update} placeholder="Anything you'd like us to know?" rows="4" /></label>
    <button className="form-submit" type="submit">Continue on WhatsApp <ArrowUpRight size={18} /></button>
    <p className="form-footnote">Your message opens in WhatsApp for you to review and send. Please confirm this number is available on WhatsApp, or call us instead.</p>
    {opened && <p className="form-status" role="status">Your message is ready in WhatsApp. If it did not open, <a href={whatsappLink} target="_blank" rel="noreferrer">open it here</a>.</p>}
  </form>;
}

export default function Contact() {
  return <>
    <section className="contact-hero"><div className="container"><Eyebrow>FIND US IN LAHORE</Eyebrow><div className="contact-hero-row"><h1>Come say <em>hello.</em></h1><p>Questions about the club, classes, or membership? We'd love to hear from you.</p></div></div></section>
    <section className="contact-main container"><div className="contact-details" data-reveal><Eyebrow number="01">THE DETAILS</Eyebrow><h2>Let's make<br />a <em>plan.</em></h2><p>We are on the second floor of Usmania Tower in WAPDA Town, Lahore.</p><div className="contact-detail-list"><div><span><MapPin size={20} strokeWidth={1.5} /></span><div><small>FIND THE CLUB</small><strong>{ADDRESS}</strong><a href={MAP_URL} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={14} /></a></div></div><div><span><Phone size={20} strokeWidth={1.5} /></span><div><small>GIVE US A CALL</small><strong><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></strong><a href={`tel:${PHONE_TEL}`}>Call the club <ArrowUpRight size={14} /></a></div></div><div><span><Clock3 size={20} strokeWidth={1.5} /></span><div><small>OPENING HOURS</small><strong>Monday - Saturday: 7:00 AM - 10:00 PM<br />Sunday: Closed</strong></div></div></div></div><div data-reveal><InquiryForm /></div></section>
    <section className="map-section"><div className="container"><div className="map-title" data-reveal><div><Eyebrow number="02">SEE YOU SOON</Eyebrow><h2>Right here in<br /><em>WAPDA Town.</em></h2></div><a href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a></div><div className="map-frame"><iframe title="Map showing the supplied Reshape Ladies Fitness Club address" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="map-overlay"><span>RESHAPE LADIES FITNESS CLUB</span><strong>WAPDA Town, Lahore</strong><a href={MAP_URL} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a></div></div><p className="map-caption">Map based on the supplied address. Please confirm the location with the club before visiting.</p></div></section>
  </>;
}
