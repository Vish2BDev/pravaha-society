import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './AboutPreview.css'

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

            {/* Floating Images - Break the grid */}
            <div className="about-preview__images">
                <div
                    className="about-preview__img about-preview__img--1"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <div className="about-preview__img-frame">
                        <img
                            src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&h=700&fit=crop"
                            alt="Classical dance pose"
                        />
                        <div className="about-preview__img-overlay" />
                    </div>
                </div>
                <div
                    className="about-preview__img about-preview__img--2"
                    style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
                >
                    <div className="about-preview__img-frame">
                        <img
                            src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=500&fit=crop"
                            alt="Dance performance"
                        />
                        <div className="about-preview__img-overlay" />
                    </div>
                </div>
                <div
                    className="about-preview__img about-preview__img--3"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                    <div className="about-preview__img-frame">
                        <img
                            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop"
                            alt="Dance practice"
                        />
                        <div className="about-preview__img-overlay" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="about-preview__decorations">
                <span className="about-preview__deco about-preview__deco--1" />
                <span className="about-preview__deco about-preview__deco--2" />
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
