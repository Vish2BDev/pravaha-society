import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

// Import the Pravaha logo from assets
import PravahaLogo from '../../assets/images/pravaha-logo.png'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 })
    const navRef = useRef(null)
    const location = useLocation()

    // Handle scroll state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    // Update active indicator position
    useEffect(() => {
        const updateIndicator = () => {
            if (navRef.current) {
                const activeLink = navRef.current.querySelector('.navbar__link--active')
                if (activeLink) {
                    const navRect = navRef.current.getBoundingClientRect()
                    const linkRect = activeLink.getBoundingClientRect()
                    setActiveIndicator({
                        left: linkRect.left - navRect.left,
                        width: linkRect.width
                    })
                } else {
                    setActiveIndicator({ left: 0, width: 0 })
                }
            }
        }
        
        // Small delay to ensure DOM is updated
        const timer = setTimeout(updateIndicator, 50)
        window.addEventListener('resize', updateIndicator)
        
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', updateIndicator)
        }
    }, [location.pathname])

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
        <>
            <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMobileMenuOpen ? 'navbar--menu-open' : ''}`}>
                <div className="navbar__container">
                    {/* Logo Zone */}
                    <Link to="/" className="navbar__brand" onClick={closeMobileMenu}>
                        <div className="navbar__logo-mark">
                            <img 
                                src={PravahaLogo} 
                                alt="Pravaha - Feel. Flow. Dance." 
                                className="navbar__logo-image"
                            />
                        </div>
                        <div className="navbar__brand-text">
                            <span className="navbar__wordmark">PRAVAHA</span>
                        </div>
                    </Link>

                    {/* Navigation Zone - Desktop */}
                    <nav className="navbar__nav" ref={navRef} aria-label="Main navigation">
                        <ul className="navbar__links">
                            {navLinks.map((link, index) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                                        }
                                        style={{ '--index': index }}
                                    >
                                        <span className="navbar__link-text">{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        {/* Sliding active indicator */}
                        <div 
                            className="navbar__indicator"
                            style={{ 
                                left: activeIndicator.left,
                                width: activeIndicator.width,
                                opacity: activeIndicator.width > 0 ? 1 : 0
                            }}
                        />
                    </nav>

                    {/* Action Zone */}
                    <div className="navbar__actions">
                        <Link to="/contact" className="navbar__cta">
                            <span className="navbar__cta-text">Join Us</span>
                            <span className="navbar__cta-icon">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className={`navbar__toggle ${isMobileMenuOpen ? 'navbar__toggle--active' : ''}`}
                            onClick={toggleMobileMenu}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="navbar__toggle-line"></span>
                            <span className="navbar__toggle-line"></span>
                            <span className="navbar__toggle-line"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Immersive */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
                <div className="mobile-menu__backdrop" onClick={closeMobileMenu} />
                
                <div className="mobile-menu__content">
                    {/* Brand Reassurance */}
                    <div className="mobile-menu__header">
                        <span className="mobile-menu__brand">PRAVAHA</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="mobile-menu__nav">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                                }
                                onClick={closeMobileMenu}
                                style={{ '--index': index }}
                            >
                                <span className="mobile-menu__link-number">0{index + 1}</span>
                                <span className="mobile-menu__link-text">{link.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="mobile-menu__cta-wrapper">
                        <Link to="/contact" className="mobile-menu__cta" onClick={closeMobileMenu}>
                            Join the Movement
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>

                    {/* Tagline */}
                    <div className="mobile-menu__footer">
                        <p className="mobile-menu__tagline">We Create Memories</p>
                        <p className="mobile-menu__sub">Feel. Flow. Dance.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
