import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import './Hero.css'

// GIF from public folder
const HeroMedia = '/assets/images/pravaha-hero.gif'

// CountUp animation hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true)
        }
    }, [startOnView])

    useEffect(() => {
        if (!hasStarted) return

        let startTime = null
        const startValue = 0

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            
            // Easing function (ease-out-cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(startValue + (end - startValue) * easeOut))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration, hasStarted])

    return { count, ref, setHasStarted }
}

const Hero = () => {
    const [loaded, setLoaded] = useState(false)
    const [statsVisible, setStatsVisible] = useState(false)
    const heroRef = useRef(null)
    const statsRef = useRef(null)

    // CountUp for stats
    const performances = useCountUp(100, 2000, false)
    const reach = useCountUp(3000, 2500, false)
    const views = useCountUp(7000, 3000, false)

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Stats visibility observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !statsVisible) {
                    setStatsVisible(true)
                    performances.setHasStarted(true)
                    reach.setHasStarted(true)
                    views.setHasStarted(true)
                }
            },
            { threshold: 0.5 }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => observer.disconnect()
    }, [statsVisible])

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <section className={`hero ${loaded ? 'hero--loaded' : ''}`} ref={heroRef}>
            {/* Background Gradient */}
            <div className="hero__background">
                <div className="hero__bg-gradient" />
                <div className="hero__bg-orb hero__bg-orb--1" />
                <div className="hero__bg-orb hero__bg-orb--2" />
                <div className="hero__grain" />
            </div>

            {/* Main Split Layout Container */}
            <div className="hero__container">
                {/* LEFT COLUMN — Text Content */}
                <div className="hero__content">
                    {/* Eyebrow / Tagline */}
                    <div className="hero__eyebrow">
                        <span className="hero__eyebrow-icon">✦</span>
                        <span className="hero__eyebrow-text">We Create Memories</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="hero__headline">
                        <span className="hero__line">
                            <span className="hero__word">FEEL<span className="hero__period">.</span></span>
                        </span>
                        <span className="hero__line">
                            <span className="hero__word hero__word--accent">FLOW<span className="hero__period">.</span></span>
                        </span>
                        <span className="hero__line">
                            <span className="hero__word">DANCE<span className="hero__period">.</span></span>
                        </span>
                    </h1>

                    {/* Sub-copy */}
                    <p className="hero__subcopy">IITM BS Official Dance Society</p>

                    {/* CTAs */}
                    <div className="hero__cta-group">
                        <Link to="/contact" className="hero__cta hero__cta--primary">
                            <span className="hero__cta-text">Join Us</span>
                            <span className="hero__cta-icon">
                                <ArrowRight size={18} />
                            </span>
                        </Link>
                        <Link to="/gallery" className="hero__cta hero__cta--secondary">
                            <span className="hero__cta-text">View Performances</span>
                        </Link>
                    </div>
                </div>

                {/* RIGHT COLUMN — GIF Frame + Stats */}
                <div className="hero__visual">
                    {/* Majestic GIF Frame */}
                    <div className="hero__frame">
                        <div className="hero__frame-border">
                            <div className="hero__frame-inner">
                                <img 
                                    src={HeroMedia}
                                    alt="Pravaha dancers performing classical dance"
                                    className="hero__gif"
                                    loading="eager"
                                />
                            </div>
                        </div>
                        {/* Corner Accents */}
                        <span className="hero__frame-corner hero__frame-corner--tl" />
                        <span className="hero__frame-corner hero__frame-corner--tr" />
                        <span className="hero__frame-corner hero__frame-corner--bl" />
                        <span className="hero__frame-corner hero__frame-corner--br" />
                    </div>

                    {/* Stats Bar — Anchored Below Frame */}
                    <div className="hero__stats" ref={statsRef}>
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                {performances.count}<span className="hero__stat-plus">+</span>
                            </span>
                            <span className="hero__stat-label">Performances</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                {reach.count.toLocaleString()}<span className="hero__stat-plus">+</span>
                            </span>
                            <span className="hero__stat-label">Reach</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                {views.count.toLocaleString()}<span className="hero__stat-plus">+</span>
                            </span>
                            <span className="hero__stat-label">Video Views</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button className="hero__scroll" onClick={scrollToContent} aria-label="Scroll to content">
                <span className="hero__scroll-text">Scroll</span>
                <div className="hero__scroll-indicator">
                    <div className="hero__scroll-line" />
                </div>
            </button>
        </section>
    )
}

export default Hero
