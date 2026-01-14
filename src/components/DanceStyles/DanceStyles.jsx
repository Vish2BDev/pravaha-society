import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import './DanceStyles.css'

const DanceStyles = () => {
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const styles = [
        {
            id: 1,
            name: 'Bharatanatyam',
            desc: 'The ancient classical dance form from Tamil Nadu, known for its grace, purity, and sculptural poses.',
            image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=400&fit=crop',
        },
        {
            id: 2,
            name: 'Contemporary',
            desc: 'Modern expressive dance that combines elements of several dance genres including lyrical and jazz.',
            image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&h=400&fit=crop',
        },
        {
            id: 3,
            name: 'Hip-Hop',
            desc: 'Street dance style with its roots in urban culture, emphasizing grooves and freestyle.',
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=300&h=400&fit=crop',
        },
        {
            id: 4,
            name: 'Fusion',
            desc: 'A blend of traditional and contemporary styles, creating unique choreographies.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop',
        },
        {
            id: 5,
            name: 'Freestyle',
            desc: 'Express yourself without boundaries. A dance in which every move is a statement.',
            image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=400&fit=crop',
        },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className={`dance-styles ${visible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="dance-styles__container">
                <h2 className="dance-styles__header">Move Your Way</h2>

                <div className="dance-styles__grid">
                    {styles.map((style, index) => (
                        <article
                            key={style.id}
                            className="dance-styles__card"
                            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                        >
                            <h3 className="dance-styles__name">{style.name}</h3>
                            <p className="dance-styles__desc">{style.desc}</p>
                            <Link to="/contact" className="dance-styles__cta">
                                Join now
                                <ArrowRight size={14} />
                            </Link>
                            <div className="dance-styles__image">
                                <img src={style.image} alt={style.name} />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DanceStyles
