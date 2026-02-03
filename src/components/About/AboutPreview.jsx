import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './AboutPreview.css'

/**
 * CASCADING SHUTTER — 6-Image Layout System
 *
 * Narrative Flow: OFFLINE → COMMUNITY → WORKSHOP → LEADERSHIP → ONLINE → UNITY
 * "Dance Has No Boundaries — And Neither Does Pravaha"
 *
 * Each image role:
 * 1. ANCHOR    - Street Dance Battle (largest, hooks with energy)
 * 2. LEAD      - Crowd/Fest Energy (reveals community scale)
 * 3. RHYTHM-A  - Jodi Anoorabh Workshop (shows depth)
 * 4. COUNTER   - BS Coordinators Dancing (humanizes leadership)
 * 5. RHYTHM-B  - Online Operation/Reel'volution (USP reveal)
 * 6. CLOSURE   - Online + Offline Unity (closes the loop)
 */

const cascadeImages = [
    {
        id: 1,
        role: 'anchor',
        alt: 'Street dance battle - Pravaha dancers in competition',
        // Replace with actual Pravaha street battle image
        src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=780&fit=crop',
        parallaxRate: 0.03,
    },
    {
        id: 2,
        role: 'lead',
        alt: 'Crowd energy at Pravaha fest',
        // Replace with actual Pravaha crowd/fest image
        src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=520&h=680&fit=crop',
        parallaxRate: 0.035,
    },
    {
        id: 3,
        role: 'rhythm-a',
        alt: 'Jodi Anoorabh workshop - partner dance training',
        // Replace with actual Jodi Anoorabh workshop image
        src: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=520&fit=crop',
        parallaxRate: 0.04,
    },
    {
        id: 4,
        role: 'counter',
        alt: 'BS Coordinators dancing with the community',
        // Replace with actual coordinators dancing image
        src: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=360&h=460&fit=crop',
        parallaxRate: 0.045,
    },
    {
        id: 5,
        role: 'rhythm-b',
        alt: 'Online dance session - Reel\'volution virtual performance',
        // Replace with actual online operation/Reel'volution image
        src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=390&fit=crop',
        parallaxRate: 0.05,
    },
    {
        id: 6,
        role: 'closure',
        alt: 'Online meets offline - Pravaha bridging digital and physical dance',
        // Replace with actual unity/both-worlds image
        src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=240&h=310&fit=crop',
        parallaxRate: 0.06,
    },
]

const AboutPreview = () => {
    const [visible, setVisible] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const sectionTop = rect.top
                const windowHeight = window.innerHeight
                const offset = (windowHeight - sectionTop) * 0.15
                setScrollY(offset)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className={`about-preview ${visible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Background Gradient Mesh */}
            <div className="about-preview__bg">
                <div className="about-preview__bg-gradient" />
                <div className="about-preview__bg-orb about-preview__bg-orb--1" />
                <div className="about-preview__bg-orb about-preview__bg-orb--2" />
            </div>

            {/* Cascading Shutter — 6 Images */}
            <div className="about-preview__images">
                {cascadeImages.map((image, index) => (
                    <div
                        key={image.id}
                        className={`about-preview__img about-preview__img--${image.id}`}
                        data-role={image.role}
                    >
                        <div
                            className="about-preview__img-frame"
                            style={{
                                transform: `translateY(${scrollY * image.parallaxRate * (index % 2 === 0 ? 1 : -1)}px)`
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading={index < 2 ? 'eager' : 'lazy'}
                                decoding="async"
                            />
                            <div className="about-preview__img-overlay" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="about-preview__decorations">
                <span className="about-preview__deco about-preview__deco--1" />
                <span className="about-preview__deco about-preview__deco--2" />
                <span className="about-preview__deco about-preview__deco--3" />
            </div>

            {/* Content */}
            <div className="about-preview__content">
                <div className="about-preview__sticky">
                    {/* Section Label */}
                    <div className="about-preview__label-group">
                        <Sparkles size={14} className="about-preview__label-icon" />
                        <span className="about-preview__label">Our Story</span>
                    </div>

                    {/* Headline */}
                    <h2 className="about-preview__headline">
                        <span className="about-preview__line">
                            <span className="about-preview__word">Where</span>
                        </span>
                        <span className="about-preview__line about-preview__line--accent">
                            <span className="about-preview__word">Passion</span>
                        </span>
                        <span className="about-preview__line">
                            <span className="about-preview__word">Meets</span>
                        </span>
                        <span className="about-preview__line about-preview__line--accent">
                            <span className="about-preview__word">Expression</span>
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="about-preview__desc">
                        Pravaha is more than a dance society — it's a sanctuary where movement
                        becomes language, and every step tells a story. Here, tradition flows
                        into innovation, and passion transforms into art.
                    </p>

                    {/* Stats Row */}
                    <div className="about-preview__stats">
                        <div className="about-preview__stat">
                            <span className="about-preview__stat-number">4+</span>
                            <span className="about-preview__stat-label">Years of Excellence</span>
                        </div>
                        <div className="about-preview__stat">
                            <span className="about-preview__stat-number">500+</span>
                            <span className="about-preview__stat-label">Community Members</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link to="/about" className="about-preview__cta">
                        <span className="about-preview__cta-text">Discover Our Journey</span>
                        <span className="about-preview__cta-icon">
                            <ArrowRight size={18} />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutPreview
