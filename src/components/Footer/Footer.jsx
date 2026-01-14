import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Heart
} from 'lucide-react'
import './Footer.css'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    const quickLinks = [
        { path: '/about', label: 'About Us' },
        { path: '/events', label: 'Events' },
        { path: '/members', label: 'Members' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/stories', label: 'Stories' },
        { path: '/contact', label: 'Contact' },
    ]

    const socialLinks = [
        { icon: Instagram, href: 'https://instagram.com/pravaha', label: 'Instagram' },
        { icon: Youtube, href: 'https://youtube.com/pravaha', label: 'YouTube' },
        { icon: Mail, href: 'mailto:pravaha@iitm.ac.in', label: 'Email' },
    ]

    return (
        <footer className="footer">
            <div className="footer__wave">
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1300,60 1400,50 1440,40 L1440,100 L0,100 Z" />
                </svg>
            </div>

            <div className="footer__container container">
                <div className="footer__grid">
                    {/* Brand Section */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <div className="footer__logo-icon">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" stroke="url(#footer-logo-gradient)" strokeWidth="2" />
                                    <path d="M20 8C20 8 28 14 28 22C28 26.4183 24.4183 30 20 30C15.5817 30 12 26.4183 12 22C12 14 20 8 20 8Z" fill="url(#footer-logo-gradient)" />
                                    <defs>
                                        <linearGradient id="footer-logo-gradient" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#10404C" />
                                            <stop offset="1" stopColor="#27142A" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="footer__logo-text">PRAVAHA</span>
                        </Link>
                        <p className="footer__tagline">We Lead By Serving</p>
                        <p className="footer__description">
                            IITM BS Official Dance Society - Where passion meets expression through the art of dance.
                        </p>
                        <div className="footer__social">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__social-link"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__section">
                        <h3 className="footer__heading">Quick Links</h3>
                        <ul className="footer__links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="footer__link">
                                        <ArrowRight size={14} />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer__section">
                        <h3 className="footer__heading">Contact</h3>
                        <div className="footer__contact">
                            <div className="footer__contact-item">
                                <MapPin size={18} />
                                <span>IIT Madras, Chennai, India</span>
                            </div>
                            <div className="footer__contact-item">
                                <Mail size={18} />
                                <a href="mailto:pravaha@iitm.ac.in">pravaha@iitm.ac.in</a>
                            </div>
                            <div className="footer__contact-item">
                                <Phone size={18} />
                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="footer__section footer__newsletter">
                        <h3 className="footer__heading">Stay Updated</h3>
                        <p className="footer__newsletter-text">
                            Subscribe to get updates on our latest events and performances.
                        </p>
                        <form className="footer__form" onSubmit={handleSubscribe}>
                            <div className="footer__input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="footer__input"
                                    required
                                />
                                <button type="submit" className="footer__submit">
                                    {subscribed ? '✓' : <ArrowRight size={18} />}
                                </button>
                            </div>
                            {subscribed && (
                                <p className="footer__success">Thank you for subscribing!</p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 Pravaha Dance Society. All rights reserved.
                    </p>
                    <p className="footer__credit">
                        Made with <Heart size={14} className="footer__heart" /> by Pravaha Team
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
