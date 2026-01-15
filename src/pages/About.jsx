import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './PageStyles.css'
import AboutHeroImg from '../assets/images/about-hero.jpg'

const About = () => {
    const [visibleSections, setVisibleSections] = useState({})
    const sectionRefs = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => ({
                            ...prev,
                            [entry.target.dataset.section]: true,
                        }))
                    }
                })
            },
            { threshold: 0.2 }
        )

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    const addToRefs = (el, index) => {
        sectionRefs.current[index] = el
    }

    return (
        <div className="page about">
            {/* Hero Section */}
            <section className="about__hero">
                <div className="about__hero-bg">
                    <img
                        src={AboutHeroImg}
                        alt="Pravaha Team"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="about__hero-overlay" />
                </div>
                <div className="container">
                    <div className="about__hero-content">
                        <span className="about__label">About Pravaha</span>
                        <h1 className="about__hero-title">Where Passion Meets Expression</h1>
                    </div>
                </div>
            </section>

            {/* Story Section - Split Layout */}
            <section
                className={`about__story ${visibleSections.story ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 0)}
                data-section="story"
            >
                <div className="container">
                    <div className="about__story-grid">
                        <div className="about__story-content">
                            <h2>Our Story</h2>
                            <p className="about__story-lead">
                                Founded with a vision to create a vibrant community of dancers,
                                Pravaha has grown to become IITM BS's premier dance society.
                            </p>
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
                        <div className="about__story-image">
                            <img
                                src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=1000&fit=crop"
                                alt="Dancers in motion"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Horizontal Scroll */}
            <section
                className={`about__values ${visibleSections.values ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 1)}
                data-section="values"
            >
                <div className="container">
                    <div className="about__values-header">
                        <span className="about__label">What We Believe</span>
                        <h2>Our Core Values</h2>
                    </div>
                    <div className="about__values-grid">
                        <article className="about__value">
                            <span className="about__value-number">01</span>
                            <h3>Excellence</h3>
                            <p>We strive for perfection in every movement, every performance, every moment.</p>
                        </article>
                        <article className="about__value">
                            <span className="about__value-number">02</span>
                            <h3>Community</h3>
                            <p>Dance is better together. We build lasting connections through shared passion.</p>
                        </article>
                        <article className="about__value">
                            <span className="about__value-number">03</span>
                            <h3>Expression</h3>
                            <p>Every dancer has a unique voice. We celebrate individuality and creativity.</p>
                        </article>
                        <article className="about__value">
                            <span className="about__value-number">04</span>
                            <h3>Growth</h3>
                            <p>Continuous learning and improvement drive everything we do.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section
                className={`about__quote ${visibleSections.quote ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 2)}
                data-section="quote"
            >
                <div className="container">
                    <blockquote className="about__quote-text">
                        "Dance is the hidden language of the soul, and Pravaha is where
                        we learn to speak it fluently."
                    </blockquote>
                    <cite className="about__quote-author">
                        <span>Pravaha Founding Team</span>
                    </cite>
                </div>
            </section>

            {/* Stats Section */}
            <section
                className={`about__stats ${visibleSections.stats ? 'visible' : ''}`}
                ref={(el) => addToRefs(el, 3)}
                data-section="stats"
            >
                <div className="container">
                    <div className="about__stats-grid">
                        <div className="about__stat">
                            <span className="about__stat-number">100+</span>
                            <span className="about__stat-label">Performances</span>
                        </div>
                        <div className="about__stat">
                            <span className="about__stat-number">50+</span>
                            <span className="about__stat-label">Active Members</span>
                        </div>
                        <div className="about__stat">
                            <span className="about__stat-number">15+</span>
                            <span className="about__stat-label">Dance Styles</span>
                        </div>
                        <div className="about__stat">
                            <span className="about__stat-number">3K+</span>
                            <span className="about__stat-label">Community Reach</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about__cta">
                <div className="container">
                    <h2>Ready to Begin Your Journey?</h2>
                    <p>Join our community of passionate dancers and discover your potential.</p>
                    <Link to="/contact" className="about__cta-btn">
                        Get in Touch
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default About
