import { useState, useEffect, useRef, useMemo } from 'react'
import { ArrowUpRight, Sparkles, Users, ChevronRight } from 'lucide-react'
import './PageStyles.css'

/**
 * ═══════════════════════════════════════════════════════════════
 * PRAVAHA TEAM — THE LEGACY CHRONICLE
 * Award-Grade Team Identity System (10/10)
 * 
 * Philosophy: "The Team page is not a roster — it's a living 
 * chronicle of leadership continuity."
 * 
 * Architecture:
 * - Year toggle for historical navigation
 * - Persistent Join CTA (aspiration engine)
 * - Editorial leadership layout (asymmetric, premium)
 * - Core team grid (collective identity)
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// TEAM DATA — Structured by Academic Year
// ═══════════════════════════════════════════════════════════════
const TEAM_DATA = {
    '2025-2026': {
        leadership: {
            secretary: {
                name: 'Priya Sharma',
                role: 'Secretary',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face',
                bio: 'Leading Pravaha with passion and dedication. A trained Bharatanatyam dancer who believes in the transformative power of dance to build community.',
                email: 'secretary@pravaha.iitm.ac.in',
                linkedin: '#',
            },
            deputy: {
                name: 'Arjun Menon',
                role: 'Deputy Secretary',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face',
                bio: 'Blending traditional forms with contemporary styles. Focused on shaping the unique identity of our performances.',
                email: 'deputy@pravaha.iitm.ac.in',
                linkedin: '#',
            },
        },
        coreTeam: [
            { id: 1, name: 'Sneha Reddy', role: 'Creative Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face' },
            { id: 2, name: 'Rahul Krishnan', role: 'Events Head', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face' },
            { id: 3, name: 'Ananya Patel', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face' },
            { id: 4, name: 'Vikram Singh', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face' },
            { id: 5, name: 'Kavya Nair', role: 'Media Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face' },
            { id: 6, name: 'Rohan Das', role: 'Finance Lead', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face' },
        ],
    },
    '2024-2025': {
        leadership: {
            secretary: {
                name: 'Aditya Kumar',
                role: 'Secretary',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face',
                bio: 'Led Pravaha through a transformative year with Dream2Dance 4.0 and multiple workshop collaborations.',
                email: 'aditya.k@pravaha.iitm.ac.in',
                linkedin: '#',
            },
            deputy: {
                name: 'Meera Iyer',
                role: 'Deputy Secretary',
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face',
                bio: 'Championed classical dance forms while building bridges with contemporary artists.',
                email: 'meera.i@pravaha.iitm.ac.in',
                linkedin: '#',
            },
        },
        coreTeam: [
            { id: 1, name: 'Karthik Rajan', role: 'Creative Head', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face' },
            { id: 2, name: 'Divya Sundar', role: 'Events Head', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face' },
            { id: 3, name: 'Sanjay Murthy', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face' },
            { id: 4, name: 'Preethi Nair', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face' },
            { id: 5, name: 'Ashwin Raj', role: 'Media Head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face' },
            { id: 6, name: 'Lakshmi Venkat', role: 'Finance Lead', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face' },
        ],
    },
    '2023-2024': {
        leadership: {
            secretary: {
                name: 'Ravi Shankar',
                role: 'Secretary',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face',
                bio: 'Established the foundations of Pravaha\'s event culture with Dream2Dance 3.0 and the first Margazhi celebration.',
                email: 'ravi.s@pravaha.iitm.ac.in',
                linkedin: '#',
            },
            deputy: {
                name: 'Anjali Sharma',
                role: 'Deputy Secretary',
                image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=800&fit=crop&crop=face',
                bio: 'Pioneered the workshop series and built lasting partnerships with dance communities.',
                email: 'anjali.s@pravaha.iitm.ac.in',
                linkedin: '#',
            },
        },
        coreTeam: [
            { id: 1, name: 'Nikhil Prasad', role: 'Creative Head', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face' },
            { id: 2, name: 'Swathi Kumar', role: 'Events Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face' },
            { id: 3, name: 'Varun Reddy', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face' },
            { id: 4, name: 'Deepa Menon', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face' },
        ],
    },
}

// Year configuration
const YEARS = [
    { id: '2025-2026', label: '2025–26', current: true },
    { id: '2024-2025', label: '2024–25', current: false },
    { id: '2023-2024', label: '2023–24', current: false },
]

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const Team = () => {
    const [selectedYear, setSelectedYear] = useState('2025-2026')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [headerVisible, setHeaderVisible] = useState(true)
    const [leadershipVisible, setLeadershipVisible] = useState(true)
    const [teamVisible, setTeamVisible] = useState(true)

    const headerRef = useRef(null)
    const leadershipRef = useRef(null)
    const teamRef = useRef(null)

    // Get current year data
    const currentTeam = useMemo(() => {
        return TEAM_DATA[selectedYear] || TEAM_DATA['2025-2026']
    }, [selectedYear])

    // Handle year change with smooth transition
    const handleYearChange = (yearId) => {
        if (yearId === selectedYear) return
        
        setIsTransitioning(true)
        setTimeout(() => {
            setSelectedYear(yearId)
            setTimeout(() => {
                setIsTransitioning(false)
            }, 50)
        }, 300)
    }

    // Intersection observers for scroll animations
    useEffect(() => {
        const observerConfig = { threshold: 0.1 }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === headerRef.current) setHeaderVisible(true)
                    if (entry.target === leadershipRef.current) setLeadershipVisible(true)
                    if (entry.target === teamRef.current) setTeamVisible(true)
                }
            })
        }, observerConfig)

        if (headerRef.current) observer.observe(headerRef.current)
        if (leadershipRef.current) observer.observe(leadershipRef.current)
        if (teamRef.current) observer.observe(teamRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div className="page team-chronicle">
            {/* ════════════════════════════════════════════════════
                SECTION 1: HERO HEADER
                Join CTA + Year Toggle + Page Title
                ════════════════════════════════════════════════════ */}
            <section 
                className={`team-chronicle__header ${headerVisible ? 'visible' : ''}`}
                ref={headerRef}
            >
                <div className="team-chronicle__header-bg">
                    <div className="team-chronicle__header-gradient" />
                    <div className="team-chronicle__header-orb team-chronicle__header-orb--1" />
                    <div className="team-chronicle__header-orb team-chronicle__header-orb--2" />
                </div>

                <div className="container">
                    {/* Top Bar: Join CTA + Year Toggle */}
                    <div className="team-chronicle__topbar">
                        <a href="/contact" className="team-chronicle__join-cta">
                            <Users size={16} />
                            <span>Join Our Team</span>
                            <ChevronRight size={16} className="team-chronicle__join-arrow" />
                        </a>

                        <div className="team-chronicle__year-toggle">
                            {YEARS.map((year) => (
                                <button
                                    key={year.id}
                                    className={`team-chronicle__year-btn ${selectedYear === year.id ? 'active' : ''}`}
                                    onClick={() => handleYearChange(year.id)}
                                >
                                    {year.label}
                                    {year.current && <span className="team-chronicle__year-current">Now</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="team-chronicle__intro">
                        <div className="team-chronicle__eyebrow">
                            <Sparkles size={14} />
                            <span>The People Behind the Movement</span>
                        </div>
                        <h1 className="team-chronicle__title">
                            <span className="team-chronicle__title-line">Our</span>{' '}
                            <span className="team-chronicle__title-line team-chronicle__title-line--accent">Team</span>
                        </h1>
                        <p className="team-chronicle__subtitle">
                            Where passion meets purpose, and leaders become legacy.
                        </p>
                    </div>

                    {/* Year Indicator */}
                    <div className="team-chronicle__year-indicator">
                        <span className="team-chronicle__year-label">Leadership</span>
                        <span className="team-chronicle__year-value">{YEARS.find(y => y.id === selectedYear)?.label}</span>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════
                SECTION 2: LEADERSHIP — ASYMMETRIC EDITORIAL
                Secretary (dominant) + Deputy (complementary)
                ════════════════════════════════════════════════════ */}
            <section 
                className={`team-chronicle__leadership ${leadershipVisible ? 'visible' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                ref={leadershipRef}
            >
                <div className="container">
                    <div className="team-chronicle__leadership-grid">
                        {/* Secretary — Primary Leader */}
                        <article className="team-chronicle__leader team-chronicle__leader--primary">
                            <div className="team-chronicle__leader-image-wrap">
                                <div className="team-chronicle__leader-image">
                                    <img 
                                        src={currentTeam.leadership.secretary.image} 
                                        alt={currentTeam.leadership.secretary.name}
                                        loading="eager"
                                    />
                                    <div className="team-chronicle__leader-image-overlay" />
                                </div>
                                <div className="team-chronicle__leader-accent" />
                            </div>
                            <div className="team-chronicle__leader-content">
                                <span className="team-chronicle__leader-role">
                                    {currentTeam.leadership.secretary.role}
                                </span>
                                <h2 className="team-chronicle__leader-name">
                                    {currentTeam.leadership.secretary.name}
                                </h2>
                                <p className="team-chronicle__leader-bio">
                                    {currentTeam.leadership.secretary.bio}
                                </p>
                                <a 
                                    href={`mailto:${currentTeam.leadership.secretary.email}`} 
                                    className="team-chronicle__leader-link"
                                >
                                    <span>Connect</span>
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </article>

                        {/* Deputy Secretary — Secondary Leader */}
                        <article className="team-chronicle__leader team-chronicle__leader--secondary">
                            <div className="team-chronicle__leader-content">
                                <span className="team-chronicle__leader-role">
                                    {currentTeam.leadership.deputy.role}
                                </span>
                                <h2 className="team-chronicle__leader-name">
                                    {currentTeam.leadership.deputy.name}
                                </h2>
                                <p className="team-chronicle__leader-bio">
                                    {currentTeam.leadership.deputy.bio}
                                </p>
                                <a 
                                    href={`mailto:${currentTeam.leadership.deputy.email}`} 
                                    className="team-chronicle__leader-link"
                                >
                                    <span>Connect</span>
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>
                            <div className="team-chronicle__leader-image-wrap">
                                <div className="team-chronicle__leader-image">
                                    <img 
                                        src={currentTeam.leadership.deputy.image} 
                                        alt={currentTeam.leadership.deputy.name}
                                        loading="eager"
                                    />
                                    <div className="team-chronicle__leader-image-overlay" />
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════
                SECTION 3: CORE TEAM — COLLECTIVE GRID
                Staggered masonry-style layout
                ════════════════════════════════════════════════════ */}
            <section 
                className={`team-chronicle__core ${teamVisible ? 'visible' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                ref={teamRef}
            >
                <div className="container">
                    <div className="team-chronicle__core-header">
                        <h2 className="team-chronicle__core-title">Core Team</h2>
                        <p className="team-chronicle__core-subtitle">
                            The driving force behind every performance
                        </p>
                    </div>

                    <div className="team-chronicle__core-grid">
                        {currentTeam.coreTeam.map((member, index) => (
                            <article 
                                key={member.id}
                                className="team-chronicle__member"
                                style={{ '--delay': `${index * 0.1}s` }}
                            >
                                <div className="team-chronicle__member-image">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        loading="lazy"
                                    />
                                    <div className="team-chronicle__member-overlay" />
                                </div>
                                <div className="team-chronicle__member-info">
                                    <h3 className="team-chronicle__member-name">{member.name}</h3>
                                    <p className="team-chronicle__member-role">{member.role}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════
                SECTION 4: JOIN CTA — BOTTOM REINFORCEMENT
                Aspirational recruitment signal
                ════════════════════════════════════════════════════ */}
            <section className="team-chronicle__join">
                <div className="container">
                    <div className="team-chronicle__join-content">
                        <h2 className="team-chronicle__join-title">
                            Ready to Write Your Chapter?
                        </h2>
                        <p className="team-chronicle__join-text">
                            Join the legacy of dancers, creators, and leaders who make Pravaha extraordinary.
                        </p>
                        <a href="/contact" className="team-chronicle__join-btn">
                            <span>Apply to Join</span>
                            <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Team
