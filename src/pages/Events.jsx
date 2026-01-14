import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, Clock, ArrowRight, ArrowUpRight } from 'lucide-react'
import './PageStyles.css'

const Events = () => {
    const [filter, setFilter] = useState('all')
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const events = [
        {
            id: 1,
            title: 'Nritya Utsav 2026',
            date: 'Feb 15, 2026',
            time: '6:00 PM',
            location: 'Main Auditorium',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop',
            category: 'annual',
            description: 'Our flagship annual dance festival featuring performances from all dance forms.',
            featured: true,
        },
        {
            id: 2,
            title: 'Classical Dance Workshop',
            date: 'Jan 28, 2026',
            time: '4:00 PM',
            location: 'Dance Studio',
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=400&fit=crop',
            category: 'workshop',
            description: 'Learn the fundamentals of Bharatanatyam from expert instructors.',
        },
        {
            id: 3,
            title: 'Fusion Night',
            date: 'Feb 5, 2026',
            time: '7:00 PM',
            location: 'Open Air Theatre',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
            category: 'performance',
            description: 'A spectacular evening of fusion dance combining multiple styles.',
        },
        {
            id: 4,
            title: 'Hip-Hop Masterclass',
            date: 'Feb 10, 2026',
            time: '5:00 PM',
            location: 'Dance Studio',
            image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop',
            category: 'workshop',
            description: 'Intensive hip-hop training session for intermediate dancers.',
        },
    ]

    const featuredEvent = events.find(e => e.featured)
    const upcomingEvents = events.filter(e => !e.featured)
    const filteredEvents = filter === 'all'
        ? upcomingEvents
        : upcomingEvents.filter(e => e.category === filter)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="page events">




            {/* Events List */}
            <section className="events__list" ref={sectionRef}>
                <div className="container">
                    <div className="events__list-header">
                        <h2>All Events</h2>
                        <div className="events__filters">
                            {['all', 'workshop', 'performance'].map((cat) => (
                                <button
                                    key={cat}
                                    className={`events__filter ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`events__grid ${visible ? 'visible' : ''}`}>
                        {filteredEvents.map((event, index) => (
                            <article
                                key={event.id}
                                className="event-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="event-card__image">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div className="event-card__content">
                                    <div className="event-card__date">
                                        <span className="event-card__day">{event.date.split(' ')[1].replace(',', '')}</span>
                                        <span className="event-card__month">{event.date.split(' ')[0]}</span>
                                    </div>
                                    <div className="event-card__info">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className="event-card__meta">
                                            <span><Clock size={14} /> {event.time}</span>
                                            <span><MapPin size={14} /> {event.location}</span>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="event-card__arrow" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Events
