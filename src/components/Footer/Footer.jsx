import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Instagram,
    Youtube,
    Mail,
    MapPin,
    ArrowRight,
    Heart,
    Sparkles
} from 'lucide-react'
import PravahaLogo from '../../assets/images/pravaha-logo.png'
import './Footer.css'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const location = useLocation()
    const isEventsPage = location.pathname === '/events'

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
            {/* Background Elements */}
            <div className="footer__bg">
                <div className="footer__bg-gradient" />
            </div>

            {!isEventsPage && (
                <div className="footer__wave">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1300,60 1400,50 1440,40 L1440,100 L0,100 Z" />
                    </svg>
                </div>
            )}

            <div className="footer__container container">
                <div className="footer__grid">
                    {/* Column 1: Brand & Contact */}
                    <div className="footer__col-brand">
                        <Link to="/" className="footer__logo">
                            <div className="footer__logo-icon">
                                <img src={PravahaLogo} alt="Pravaha" />
                            </div>
                            <span className="footer__logo-text">PRAVAHA</span>
                        </Link>
                        <p className="footer__tagline">
                            <Sparkles size={12} className="footer__tagline-icon" />
                            We Create Memories
                        </p>
                        <p className="footer__description">
                            IITM BS Official Dance Society. Where passion meets expression through the art of dance.
                        </p>

                        <div className="footer__contact-minimal">
                            <a href="mailto:pravaha@iitm.ac.in" className="footer__contact-link">
                                <Mail size={16} /> pravaha@iitm.ac.in
                            </a>
                            <div className="footer__contact-text">
                                <MapPin size={16} /> IIT Madras, Chennai
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="footer__col-links">
                        <h3 className="footer__heading">Explore</h3>
                        <ul className="footer__links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="footer__link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Newsletter & Socials */}
                    <div className="footer__col-engage">
                        <h3 className="footer__heading">Stay Updated</h3>
                        <p className="footer__newsletter-text">
                            Subscribe for updates on our latest events.
                        </p>
                        <form className="footer__form" onSubmit={handleSubscribe}>
                            <div className="footer__input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="footer__input"
                                    required
                                />
                                <button type="submit" className="footer__submit">
                                    {subscribed ? '✓' : <ArrowRight size={16} />}
                                </button>
                            </div>
                            {subscribed && (
                                <p className="footer__success">Thank you!</p>
                            )}
                        </form>

                        <div className="footer__social-group">
                            <h4 className="footer__subheading">Follow Us</h4>
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
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
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
