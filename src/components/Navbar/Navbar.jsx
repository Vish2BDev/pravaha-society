import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const navLinks = [
        { path: '/about', label: 'About' },
        { path: '/events', label: 'Events' },
        { path: '/members', label: 'Members' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/stories', label: 'Stories' },
        { path: '/sponsors', label: 'Sponsors' },
    ]

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
                    <div className="navbar__logo-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" stroke="url(#logo-gradient)" strokeWidth="2" />
                            <path d="M20 8C20 8 28 14 28 22C28 26.4183 24.4183 30 20 30C15.5817 30 12 26.4183 12 22C12 14 20 8 20 8Z" fill="url(#logo-gradient)" />
                            <defs>
                                <linearGradient id="logo-gradient" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#10404C" />
                                    <stop offset="1" stopColor="#27142A" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="navbar__logo-text">PRAVAHA</span>
                </Link>

                <div className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--open' : ''}`}>
                    <ul className="navbar__links">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                                    }
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <Link to="/contact" className="btn btn-primary navbar__cta" onClick={closeMobileMenu}>
                        Join Us
                    </Link>
                </div>

                <button
                    className="navbar__toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`navbar__overlay ${isMobileMenuOpen ? 'navbar__overlay--visible' : ''}`}
                onClick={closeMobileMenu}
            />
        </nav>
    )
}

export default Navbar
