import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100)
    }, [])

    return (
        <section className={`hero ${loaded ? 'hero--loaded' : ''}`}>
            {/* Full-Bleed Video Background */}
            <div className="hero__media">
                <video
                    className="hero__video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1547153760-18fc86324498?w=1920&h=1080&fit=crop"
                >
                    <source src="" type="video/mp4" />
                </video>
                <div className="hero__overlay" />
            </div>

            {/* Minimal Content */}
            <div className="hero__content">
                <h1 className="hero__headline">
                    <span className="hero__line">
                        <span className="hero__word">FEEL.</span>
                    </span>
                    <span className="hero__line">
                        <span className="hero__word">FLOW.</span>
                    </span>
                    <span className="hero__line">
                        <span className="hero__word">DANCE.</span>
                    </span>
                </h1>

                <div className="hero__bottom">
                    <p className="hero__tagline">We Lead By Serving</p>
                    <Link to="/contact" className="hero__cta" data-cursor="Join">
                        <span>Join the Movement</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
