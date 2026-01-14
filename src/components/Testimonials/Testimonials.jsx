import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Testimonials.css'

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const testimonials = [
        {
            id: 1,
            name: 'Priya Sharma',
            role: 'Bharatanatyam Lead',
            quote: 'Pravaha transformed my understanding of dance. Here, every movement is a story waiting to be told.',
        },
        {
            id: 2,
            name: 'Arjun Menon',
            role: 'Contemporary Choreographer',
            quote: 'Dance is not just about moves — it\'s about emotion. Pravaha taught me to feel every beat.',
        },
        {
            id: 3,
            name: 'Sneha Reddy',
            role: 'Fusion Artist',
            quote: 'The collaborative spirit here is unmatched. I found my voice through movement.',
        },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.2 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    return (
        <section className={`testimonials ${visible ? 'visible' : ''}`} ref={sectionRef}>
            {/* Content */}
            <div className="testimonials__content">
                <span className="testimonials__label">Voices</span>

                <div className="testimonials__quotes">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            className={`testimonials__quote ${i === activeIndex ? 'active' : ''}`}
                        >
                            <blockquote>"{t.quote}"</blockquote>
                            <footer>
                                <span className="testimonials__name">{t.name}</span>
                                <span className="testimonials__role">{t.role}</span>
                            </footer>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="testimonials__nav">
                    <button onClick={prev} aria-label="Previous" data-cursor="Prev">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="testimonials__counter">
                        <span className="testimonials__current">0{activeIndex + 1}</span>
                        <span className="testimonials__separator">/</span>
                        <span className="testimonials__total">0{testimonials.length}</span>
                    </div>
                    <button onClick={next} aria-label="Next" data-cursor="Next">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
