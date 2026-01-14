import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
                // Calculate parallax offset based on section position
                const offset = (windowHeight - sectionTop) * 0.15
                setScrollY(offset)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className={`about-preview ${visible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Floating Images - Break the grid */}
            <div className="about-preview__images">
                <div
                    className="about-preview__img about-preview__img--1"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&h=700&fit=crop"
                        alt="Dancer"
                    />
                </div>
                <div
                    className="about-preview__img about-preview__img--2"
                    style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=500&fit=crop"
                        alt="Performance"
                    />
                </div>
                <div
                    className="about-preview__img about-preview__img--3"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop"
                        alt="Practice"
                    />
                </div>
            </div>

            {/* Sticky Text Content */}
            <div className="about-preview__content">
                <div className="about-preview__sticky">
                    <span className="about-preview__label">About</span>
                    <h2 className="about-preview__headline">
                        <span className="about-preview__line">Where</span>
                        <span className="about-preview__line about-preview__line--accent">Passion</span>
                        <span className="about-preview__line">Meets</span>
                        <span className="about-preview__line about-preview__line--accent">Expression</span>
                    </h2>

                    <p className="about-preview__desc">
                        Pravaha is more than a dance society. It's a space where you come home
                        to yourself — where movement becomes language, and every step tells a story.
                    </p>

                    <Link to="/about" className="about-preview__cta" data-cursor="Explore">
                        <span className="about-preview__cta-text">Discover Our Journey</span>
                        <span className="about-preview__cta-icon"><ArrowRight size={20} /></span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutPreview
