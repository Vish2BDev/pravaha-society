import { useState, useRef, useEffect } from 'react'
import './Achievements.css'

const Achievements = () => {
    const [visible, setVisible] = useState(false)
    const [activeItem, setActiveItem] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [hasMoved, setHasMoved] = useState(false)
    const sectionRef = useRef(null)

    const achievements = [
        {
            id: 1,
            year: '2025',
            title: 'NRITYA UTSAV',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=500&fit=crop'
        },
        {
            id: 2,
            year: '2024',
            title: 'CONFLUENCE',
            image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=500&fit=crop'
        },
        {
            id: 3,
            year: '2024',
            title: 'DANCE BATTLE',
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=400&h=500&fit=crop'
        },
        {
            id: 4,
            year: '2023',
            title: 'FUSION NIGHT',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop'
        },
        {
            id: 5,
            year: '2023',
            title: 'EXPRESSIONS',
            image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=500&fit=crop'
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

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY })
        setHasMoved(true)
    }

    const handleMouseLeave = () => {
        setActiveItem(null)
        setHasMoved(false)
    }

    return (
        <section
            className={`achievements ${visible ? 'visible' : ''}`}
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="achievements__container container">
                <div className="achievements__header">
                    <span className="achievements__label">Achievements</span>
                    <h2 className="achievements__title">Awards & Performances</h2>
                </div>

                {/* Hover Image - only show if mouse has moved */}
                <div
                    className={`achievements__hover-image ${activeItem && hasMoved ? 'active' : ''}`}
                    style={{ left: mousePos.x, top: mousePos.y }}
                >
                    {activeItem && hasMoved && (
                        <img src={achievements.find(a => a.id === activeItem)?.image} alt="" />
                    )}
                </div>

                {/* Achievement List */}
                <div className="achievements__list">
                    {achievements.map((item, index) => (
                        <div
                            key={item.id}
                            className="achievements__item"
                            onMouseEnter={() => setActiveItem(item.id)}
                            onMouseLeave={() => setActiveItem(null)}
                            style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                        >
                            <span className="achievements__year">{item.year}</span>
                            <h3 className="achievements__name">{item.title}</h3>
                            <span className="achievements__dot" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Achievements
