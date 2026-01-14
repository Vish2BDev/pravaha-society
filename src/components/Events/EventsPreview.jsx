import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import './EventsPreview.css'

const EventsPreview = () => {
    const events = [
        {
            id: 1,
            title: 'Nritya Utsav 2026',
            date: 'Feb 15, 2026',
            location: 'Main Auditorium',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop',
            category: 'Annual Event',
            featured: true,
        },
        {
            id: 2,
            title: 'Classical Dance Workshop',
            date: 'Jan 28, 2026',
            location: 'Dance Studio',
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=800&fit=crop',
            category: 'Workshop',
            featured: false,
        },
        {
            id: 3,
            title: 'Fusion Night',
            date: 'Feb 5, 2026',
            location: 'Open Air Theatre',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=800&fit=crop',
            category: 'Performance',
            featured: false,
        },
    ]

    return (
        <section className="events-preview section">
            <div className="events-preview__container container">
                <div className="events-preview__header">
                    <span className="events-preview__label">Upcoming Events</span>
                    <h2 className="section-title">Experience the Magic</h2>
                    <p className="events-preview__subtitle">
                        Join us for unforgettable performances, workshops, and celebrations
                    </p>
                </div>

                <div className="events-preview__grid">
                    {events.map((event, index) => (
                        <article
                            key={event.id}
                            className={`event-card ${event.featured ? 'event-card--featured' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <Link to={`/events`} className="event-card__link">
                                <div className="event-card__image">
                                    <img src={event.image} alt={event.title} />
                                    <div className="event-card__overlay" />
                                    <span className="event-card__category">{event.category}</span>
                                    {event.featured && <span className="event-card__badge">Featured</span>}
                                </div>

                                <div className="event-card__content">
                                    <div className="event-card__info">
                                        <h3 className="event-card__title">{event.title}</h3>
                                        <div className="event-card__meta">
                                            <span className="event-card__date">
                                                <Calendar size={14} />
                                                {event.date}
                                            </span>
                                            <span className="event-card__location">
                                                <MapPin size={14} />
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="event-card__action">
                                        <span>View Details</span>
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="events-preview__actions">
                    <Link to="/events" className="btn btn-outline">
                        View All Events
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default EventsPreview
