import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useMultipleCountUp } from '../hooks/useCountUp'
import './PageStyles.css'
import AboutHeroImg from '../assets/images/about-hero.jpg'

const About = () => {
    const [visibleSections, setVisibleSections] = useState({})
    const [heroLoaded, setHeroLoaded] = useState(false)
    const sectionRefs = useRef([])
    const statsRef = useRef(null)

    // Premium CountUp configuration for stats
    const statsConfig = [
        { end: 100, duration: 2000, suffix: '+' },
        { end: 50, duration: 2200, suffix: '+' },
        { end: 15, duration: 1800, suffix: '+' },
        { end: 3, duration: 2500, suffix: 'K+', useK: false }
    ]
    
    const { counters, triggerAll } = useMultipleCountUp(statsConfig, 150)

    // Hero load animation
    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Section visibility observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = entry.target.dataset.section
                        setVisibleSections((prev) => ({
                            ...prev,
                            [section]: true,
                        }))
                        
                        // Trigger stats animation when stats section is visible
                        if (section === 'stats') {
                            triggerAll()
                        }
                    }
                })
            },
            { threshold: 0.2 }
        )

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [triggerAll])

    const addToRefs = (el, index) => {
        sectionRefs.current[index] = el
    }

    // Stats data
    const stats = [
        { label: 'Performances' },
        { label: 'Active Members' },
        { label: 'Dance Styles' },
        { label: 'Community Reach' }
    ]

    // Values data
    const values = [
        {
            number: '01',
            title: 'Excellence',
            description: 'We strive for perfection in every movement, every performance, every moment.'
        },
        {
            number: '02',
            title: 'Community',
            description: 'Dance is better together. We build lasting connections through shared passion.'
        },
        {
            number: '03',
            title: 'Expression',
            description: 'Every dancer has a unique voice. We celebrate individuality and creativity.'
        },
        {
            number: '04',
            title: 'Growth',
            description: 'Continuous learning and improvement drive everything we do.'
        }
    ]

    return (
        <div className="page about">
            {/* ========================================
                HERO SECTION — 10/10 Award Grade
                ======================================== */}
            <section className={`about__hero ${heroLoaded ? 'about__hero--loaded' : ''}`}>
                <div className="about__hero-bg">
                    <img
                        src={AboutHeroImg}
                        alt="Pravaha Dance Team performing"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="about__hero-overlay" />
                    <div className="about__hero-grain" />
                </div>
                <div className="container">
                    <div className="about__hero-content">
                        <div className="about__hero-eyebrow">
                            <Sparkles size={14} className="about__hero-sparkle" />
                            <span>About Pravaha</span>
                        </div>
                        <h1 className="about__hero-title">
                            <span className="about__hero-line">
                                <span className="about__hero-word">Where</span>
                            </span>
                            <span className="about__hero-line">
                                <span className="about__hero-word about__hero-word--accent">Passion</span>
                            </span>
                            <span className="about__hero-line">
                                <span className="about__hero-word">Meets</span>
                                <span className="about__hero-word about__hero-word--accent"> Expression</span>
                            </span>
                        </h1>
                        <div className="about__hero-scroll">
                            <span>Scroll to explore</span>
                            <div className="about__hero-scroll-line" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================
                STORY SECTION — 10/10 Award Grade
                ======================================== */}
            <section
                className={`about__story ${visibleSections.story ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 0)}
                data-section="story"
            >
                <div className="container">
                    <div className="about__story-grid">
                        <div className="about__story-content">
                            <div className="about__story-label">
                                <span className="about__story-label-line" />
                                <span>Our Journey</span>
                            </div>
                            <h2 className="about__story-title">Our Story</h2>
                            <p className="about__story-lead">
                                Founded with a vision to create a vibrant community of dancers,
                                Pravaha has grown to become IITM BS's premier dance society.
                            </p>
                            <div className="about__story-paragraphs">
                                <p>
                                    What started as a small group of passionate dancers has evolved into
                                    a movement that celebrates diverse dance forms—from classical
                                    Bharatanatyam and Kathak to contemporary, hip-hop, and fusion styles.
                                </p>
                                <p>
                                    Today, we continue to push boundaries, create meaningful performances,
                                    and nurture the next generation of dancers who carry forward our legacy
                                    of excellence and expression.
                                </p>
                            </div>
                        </div>
                        <div className="about__story-visual">
                            <div className="about__story-image-wrapper">
                                <div className="about__story-image-frame">
                                    <img
                                        src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=1000&fit=crop"
                                        alt="Dancer expressing through movement"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="about__story-image-accent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================
                VALUES SECTION — 10/10 Award Grade
                ======================================== */}
            <section
                className={`about__values ${visibleSections.values ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 1)}
                data-section="values"
            >
                <div className="container">
                    <div className="about__values-header">
                        <span className="about__values-eyebrow">What We Believe</span>
                        <h2 className="about__values-title">Our Core Values</h2>
                    </div>
                    <div className="about__values-grid">
                        {values.map((value, index) => (
                            <article 
                                key={value.number}
                                className="about__value"
                                style={{ '--delay': `${index * 0.1}s` }}
                            >
                                <span className="about__value-number">{value.number}</span>
                                <div className="about__value-content">
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                                <div className="about__value-glow" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
                QUOTE SECTION — 10/10 Award Grade
                ======================================== */}
            <section
                className={`about__quote ${visibleSections.quote ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 2)}
                data-section="quote"
            >
                <div className="container">
                    <div className="about__quote-wrapper">
                        <span className="about__quote-mark about__quote-mark--open">"</span>
                        <blockquote className="about__quote-text">
                            Dance is the hidden language of the soul, and Pravaha is where
                            we learn to speak it fluently.
                        </blockquote>
                        <span className="about__quote-mark about__quote-mark--close">"</span>
                    </div>
                    <cite className="about__quote-author">
                        <span className="about__quote-author-line" />
                        <span className="about__quote-author-name">Pravaha Founding Team</span>
                    </cite>
                </div>
            </section>

            {/* ========================================
                STATS SECTION — 10/10 Award Grade
                Premium CountUp Animation
                ======================================== */}
            <section
                className={`about__stats ${visibleSections.stats ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 3)}
                data-section="stats"
            >
                <div className="about__stats-bg" />
                <div className="container">
                    <div className="about__stats-grid" ref={statsRef}>
                        {stats.map((stat, index) => (
                            <div 
                                key={stat.label}
                                className="about__stat"
                                style={{ '--delay': `${index * 0.1}s` }}
                            >
                                <span className="about__stat-number">
                                    {index === 3 
                                        ? `${counters[index]?.count || 0}K` 
                                        : counters[index]?.count || 0
                                    }
                                    <span className="about__stat-plus">+</span>
                                </span>
                                <span className="about__stat-label">{stat.label}</span>
                                <div className="about__stat-glow" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================
                CTA SECTION — 10/10 Award Grade
                ======================================== */}
            <section className={`about__cta ${visibleSections.cta ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 4)}
                data-section="cta"
            >
                <div className="about__cta-bg">
                    <div className="about__cta-orb about__cta-orb--1" />
                    <div className="about__cta-orb about__cta-orb--2" />
                </div>
                <div className="container">
                    <div className="about__cta-content">
                        <span className="about__cta-eyebrow">Join Us</span>
                        <h2 className="about__cta-title">Ready to Begin Your Journey?</h2>
                        <p className="about__cta-desc">
                            Join our community of passionate dancers and discover your potential.
                        </p>
                        <Link to="/contact" className="about__cta-btn">
                            <span className="about__cta-btn-text">Get in Touch</span>
                            <span className="about__cta-btn-icon">
                                <ArrowRight size={18} />
                            </span>
                            <span className="about__cta-btn-shine" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
