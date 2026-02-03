import { useState, useEffect, useRef, useMemo } from 'react'
import { MapPin, Clock, ArrowRight, Sparkles, Calendar, ChevronDown, Star } from 'lucide-react'
import './PageStyles.css'

/**
 * ═══════════════════════════════════════════════════════════════
 * PRAVAHA EVENTS — THE STAGE DECK
 * Award-Grade Event Experience System (10/10)
 * 
 * Philosophy: "Events are not entries — they're experiences."
 * Layout: Hybrid Rhythm System (Featured Hero + Horizontal Scroll + Archive)
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// PRAVAHA EVENTS DATA — Real Events History
// ═══════════════════════════════════════════════════════════════
const EVENTS_DATA = [
    // ══════════════════════════════════════════════════════════
    // PARADOX — Dream2Dance Flagship Annual Fest (June)
    // ══════════════════════════════════════════════════════════
    {
        id: 1,
        title: 'Dream2Dance 5.0',
        subtitle: "Paradox'26",
        date: '2026-06-05',
        time: '6:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop',
        category: 'paradox',
        year: '2025-2026',
        description: 'The crown jewel of Pravaha returns — a spectacular celebration of dance featuring 50+ performers across 15 acts.',
        featured: true,
        status: 'upcoming',
    },
    {
        id: 2,
        title: 'Dream2Dance 4.0',
        subtitle: "Paradox'25",
        date: '2025-06-07',
        time: '6:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2024-2025',
        description: 'A landmark edition that pushed the boundaries of collegiate dance performances.',
        status: 'past',
    },
    {
        id: 3,
        title: 'Dream2Dance 3.0',
        subtitle: "Paradox'24",
        date: '2024-06-01',
        time: '6:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2023-2024',
        description: 'The third chapter of our flagship event — bigger, bolder, and more breathtaking.',
        status: 'past',
    },
    {
        id: 4,
        title: 'Dream2Dance 2.0',
        subtitle: "Paradox'23",
        date: '2023-06-03',
        time: '6:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2022-2023',
        description: 'Building on our debut success with even more spectacular performances.',
        status: 'past',
    },
    {
        id: 5,
        title: 'Dream2Dance 1.0',
        subtitle: "Paradox'22",
        date: '2022-06-04',
        time: '6:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2021-2022',
        description: 'Where it all began — the inaugural Dream2Dance that started the legacy.',
        status: 'past',
    },

    // ══════════════════════════════════════════════════════════
    // MARGAZHI — January Cultural Celebration
    // ══════════════════════════════════════════════════════════
    {
        id: 6,
        title: "Reel'volution & Saanjh",
        subtitle: "Margazhi'25",
        date: '2025-01-18',
        time: '6:30 PM',
        location: 'Cultural Center',
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2024-2025',
        description: 'A fusion of modern reels and traditional evening performances celebrating the Margazhi season.',
        status: 'past',
    },
    // Note: Margazhi'24 was not organized
    {
        id: 7,
        title: 'LevelUp 1.0',
        subtitle: "Margazhi'23",
        date: '2023-01-14',
        time: '6:00 PM',
        location: 'Cultural Center',
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2022-2023',
        description: 'Our first Margazhi celebration — elevating classical dance to new heights.',
        status: 'past',
    },

    // ══════════════════════════════════════════════════════════
    // SAAVAN — September Monsoon Celebration
    // ══════════════════════════════════════════════════════════
    {
        id: 8,
        title: 'Swara Nritya',
        subtitle: "Saavan'23",
        date: '2023-09-16',
        time: '6:00 PM',
        location: 'Open Air Theatre',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2023-2024',
        description: 'A melodious dance celebration where rhythm meets the monsoon spirit.',
        status: 'past',
    },
    {
        id: 9,
        title: 'LevelUp 2.0',
        subtitle: "Saavan'22",
        date: '2022-09-10',
        time: '6:00 PM',
        location: 'Open Air Theatre',
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop',
        category: 'paradox',
        year: '2022-2023',
        description: 'The sequel to our LevelUp series — celebrating dance in the monsoon season.',
        status: 'past',
    },

    // ══════════════════════════════════════════════════════════
    // WORKSHOPS — Skill Building Sessions (Part of Paradox)
    // ══════════════════════════════════════════════════════════
    {
        id: 10,
        title: 'Jodi Anoorabh Workshop',
        subtitle: 'Where Movement Meets Meaning',
        date: '2025-05-25',
        time: '7:00 PM',
        location: 'Main Hall',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
        category: 'workshops',
        year: '2024-2025',
        description: 'An electrifying partner dance workshop with Saurabh & Anoosha (866K Instagram, 1.21M YouTube).',
        status: 'past',
    },
    {
        id: 11,
        title: 'Rukmini Vijayakumar Workshop',
        subtitle: 'Where Movement Meets Meaning',
        date: '2025-05-26',
        time: '7:00 PM',
        location: 'Main Auditorium',
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=600&fit=crop',
        category: 'workshops',
        year: '2024-2025',
        description: 'A masterclass in Bharatanatyam with the legendary Rukmini Vijayakumar (863K Instagram, 336K YouTube).',
        status: 'past',
    },
    {
        id: 12,
        title: 'Dance Movement Therapy',
        subtitle: 'Move Your Body, Free Your Mind',
        date: '2025-05-16',
        time: '7:00 PM',
        location: 'Wellness Center',
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop',
        category: 'workshops',
        year: '2024-2025',
        description: 'A healing workshop on Dance Movement Therapy with Pragyan Behera — in collaboration with RAAHAT & Mental Health Awareness Week.',
        status: 'past',
    },

    // ══════════════════════════════════════════════════════════
    // MEETUPS — Community Gatherings (Hyderabad)
    // ══════════════════════════════════════════════════════════
    {
        id: 13,
        title: 'Ekatva',
        subtitle: 'Regional Fest Hyderabad',
        date: '2025-08-15',
        time: '5:00 PM',
        location: 'Hyderabad',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        category: 'meetups',
        year: '2025-2026',
        description: 'Pravaha\'s first regional fest bringing together dancers from across Hyderabad.',
        status: 'past',
    },
    {
        id: 14,
        title: 'Hyderabad Meetup #1',
        subtitle: 'Dance Community Gathering',
        date: '2025-07-20',
        time: '4:00 PM',
        location: 'Hyderabad',
        image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop',
        category: 'meetups',
        year: '2025-2026',
        description: 'An informal meetup connecting Pravaha members and dance enthusiasts in Hyderabad.',
        status: 'past',
    },
    {
        id: 15,
        title: 'Hyderabad Meetup #2',
        subtitle: 'Dance Jam Session',
        date: '2025-10-12',
        time: '4:00 PM',
        location: 'Hyderabad',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
        category: 'meetups',
        year: '2025-2026',
        description: 'The second Hyderabad gathering — an open jam session for all dance styles.',
        status: 'past',
    },

    // ══════════════════════════════════════════════════════════
    // OTHER — Festival Engagement Events & Collaborations
    // ══════════════════════════════════════════════════════════
    {
        id: 16,
        title: "Dance'O Republica 2.0",
        subtitle: 'Group Montage Performance',
        date: '2025-01-26',
        time: '6:00 PM',
        location: 'Online',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        category: 'other',
        year: '2024-2025',
        description: 'Uniting dancers online threading patriotism — a collaborative Republic Day montage celebrating freedom through dance.',
        status: 'past',
    },
    {
        id: 17,
        title: "Dance'O Republica",
        subtitle: 'Kaziranga Collaboration',
        date: '2024-01-26',
        time: '6:00 PM',
        location: 'Online',
        image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&h=600&fit=crop',
        category: 'other',
        year: '2023-2024',
        description: 'Feel the Vibe and Enjoy the Freedom — Dance Society collab with Kaziranga Houses for Republic Day.',
        status: 'past',
    },
    {
        id: 18,
        title: 'Ameya',
        subtitle: 'IITM BS Dance Competition',
        date: '2023-08-15',
        time: '7:00 PM',
        location: 'Online',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        category: 'other',
        year: '2023-2024',
        description: 'Express your Azaadi with Beats — Independence Day dance competition in collaboration with Sundarbans.',
        status: 'past',
    },
    {
        id: 19,
        title: 'WYZ Wednesday',
        subtitle: 'Dance Quiz Event',
        date: '2023-07-12',
        time: '8:00 PM',
        location: 'Online',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
        category: 'other',
        year: '2023-2024',
        description: 'A fun dance-themed quiz night in collaboration with WYZ — The IITM BS Quiz Club.',
        status: 'past',
    },
]

// ═══════════════════════════════════════════════════════════════
// CATEGORY CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = [
    { id: 'all', label: 'All Events', icon: null },
    { id: 'paradox', label: 'Paradox', icon: '✦' },
    { id: 'meetups', label: 'Meetups', icon: '○' },
    { id: 'workshops', label: 'Workshops', icon: '▢' },
    { id: 'other', label: 'Other', icon: '◇' },
]

const YEARS = [
    { id: '2025-2026', label: '2025–26', current: true },
    { id: '2024-2025', label: '2024–25', current: false },
    { id: '2023-2024', label: '2023–24', current: false },
    { id: '2022-2023', label: '2022–23', current: false },
    { id: '2021-2022', label: '2021–22', current: false },
]

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════
const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
        day: date.getDate(),
        month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
        full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }
}

const getCategoryIcon = (categoryId) => {
    const cat = CATEGORIES.find(c => c.id === categoryId)
    return cat?.icon || ''
}

const getCategoryLabel = (categoryId) => {
    const cat = CATEGORIES.find(c => c.id === categoryId)
    return cat?.label || categoryId
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const Events = () => {
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [yearFilter, setYearFilter] = useState('2025-2026')
    const [heroVisible, setHeroVisible] = useState(true)
    const [upcomingVisible, setUpcomingVisible] = useState(true)
    const [archiveVisible, setArchiveVisible] = useState(true)
    const [expandedArchive, setExpandedArchive] = useState(false)
    
    const heroRef = useRef(null)
    const upcomingRef = useRef(null)
    const archiveRef = useRef(null)
    const scrollContainerRef = useRef(null)

    // ═══════════════════════════════════════════════════════════
    // FILTERED DATA COMPUTATION
    // ═══════════════════════════════════════════════════════════
    const { featuredEvent, upcomingEvents, archiveEvents, isEmpty } = useMemo(() => {
        // Apply filters
        let filtered = EVENTS_DATA.filter(event => {
            const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter
            const yearMatch = event.year === yearFilter
            return categoryMatch && yearMatch
        })
        
        // Separate featured (only from upcoming/current)
        const featured = filtered.find(e => e.featured && e.status === 'upcoming')
        
        // Upcoming events (exclude featured)
        const upcoming = filtered.filter(e => 
            e.status === 'upcoming' && !e.featured
        ).sort((a, b) => new Date(a.date) - new Date(b.date))
        
        // Archive events (past events)
        const archive = filtered.filter(e => 
            e.status === 'past'
        ).sort((a, b) => new Date(b.date) - new Date(a.date))
        
        return {
            featuredEvent: featured,
            upcomingEvents: upcoming,
            archiveEvents: archive,
            isEmpty: !featured && upcoming.length === 0 && archive.length === 0,
        }
    }, [categoryFilter, yearFilter])

    // ═══════════════════════════════════════════════════════════
    // INTERSECTION OBSERVERS
    // ═══════════════════════════════════════════════════════════
    useEffect(() => {
        const observerConfig = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        
        const heroObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setHeroVisible(true)
        }, observerConfig)
        
        const upcomingObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setUpcomingVisible(true)
        }, observerConfig)
        
        const archiveObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setArchiveVisible(true)
        }, observerConfig)
        
        if (heroRef.current) heroObserver.observe(heroRef.current)
        if (upcomingRef.current) upcomingObserver.observe(upcomingRef.current)
        if (archiveRef.current) archiveObserver.observe(archiveRef.current)
        
        return () => {
            heroObserver.disconnect()
            upcomingObserver.disconnect()
            archiveObserver.disconnect()
        }
    }, [])

    // ═══════════════════════════════════════════════════════════
    // HORIZONTAL SCROLL HANDLERS
    // ═══════════════════════════════════════════════════════════
    const scrollProgram = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════
    return (
        <div className="page events-stage">
            {/* ════════════════════════════════════════════════════
                SECTION 1: HERO HEADER WITH FILTERS
                ════════════════════════════════════════════════════ */}
            <section className="events-stage__header">
                <div className="events-stage__header-bg">
                    <div className="events-stage__header-gradient" />
                    <div className="events-stage__header-orb events-stage__header-orb--1" />
                    <div className="events-stage__header-orb events-stage__header-orb--2" />
                </div>
                
                <div className="container">
                    <div className="events-stage__intro">
                        <div className="events-stage__eyebrow">
                            <Sparkles size={14} />
                            <span>The Stage Awaits</span>
                        </div>
                        <h1 className="events-stage__title">
                            <span className="events-stage__title-line">Our</span>
                            <span className="events-stage__title-line events-stage__title-line--accent">Events</span>
                        </h1>
                        <p className="events-stage__subtitle">
                            Where moments become memories, and dance tells stories.
                        </p>
                    </div>
                    
                    {/* DUAL FILTER SYSTEM */}
                    <div className="events-stage__filters">
                        {/* Category Pills */}
                        <div className="events-stage__filter-group">
                            <span className="events-stage__filter-label">Category</span>
                            <div className="events-stage__category-filters">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`events-stage__category-btn ${categoryFilter === cat.id ? 'active' : ''}`}
                                        onClick={() => setCategoryFilter(cat.id)}
                                        aria-pressed={categoryFilter === cat.id}
                                    >
                                        {cat.icon && <span className="events-stage__category-icon">{cat.icon}</span>}
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Year Pills */}
                        <div className="events-stage__filter-group">
                            <span className="events-stage__filter-label">Year</span>
                            <div className="events-stage__year-filters">
                                {YEARS.map((year) => (
                                    <button
                                        key={year.id}
                                        className={`events-stage__year-btn ${yearFilter === year.id ? 'active' : ''} ${year.current ? 'current' : ''}`}
                                        onClick={() => setYearFilter(year.id)}
                                        aria-pressed={yearFilter === year.id}
                                    >
                                        {year.label}
                                        {year.current && <span className="events-stage__year-badge">Now</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════
                EMPTY STATE
                ════════════════════════════════════════════════════ */}
            {isEmpty && (
                <section className="events-stage__empty">
                    <div className="container">
                        <div className="events-stage__empty-content">
                            <div className="events-stage__empty-icon">
                                <Calendar size={48} strokeWidth={1} />
                            </div>
                            <h3>No events here yet</h3>
                            <p>The stage is being set. Check back soon or explore other categories.</p>
                            <button 
                                className="events-stage__empty-reset"
                                onClick={() => { setCategoryFilter('all'); setYearFilter('2025-2026'); }}
                            >
                                View All Events
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════════════
                SECTION 2: FEATURED HERO CARD
                ════════════════════════════════════════════════════ */}
            {featuredEvent && (
                <section 
                    className={`events-stage__featured ${heroVisible ? 'visible' : ''}`}
                    ref={heroRef}
                >
                    <div className="container">
                        <div className="events-stage__featured-card">
                            <div className="events-stage__featured-image">
                                <img 
                                    src={featuredEvent.image} 
                                    alt={featuredEvent.title}
                                    loading="eager"
                                />
                                <div className="events-stage__featured-overlay" />
                            </div>
                            
                            <div className="events-stage__featured-content">
                                <div className="events-stage__featured-badge">
                                    <Star size={12} />
                                    <span>Featured Event</span>
                                </div>
                                
                                <div className="events-stage__featured-date">
                                    <span className="events-stage__featured-day">
                                        {formatDate(featuredEvent.date).day}
                                    </span>
                                    <span className="events-stage__featured-month">
                                        {formatDate(featuredEvent.date).month}
                                    </span>
                                </div>
                                
                                <h2 className="events-stage__featured-title">
                                    {featuredEvent.title}
                                </h2>
                                <p className="events-stage__featured-subtitle-text">
                                    {featuredEvent.subtitle}
                                </p>
                                <p className="events-stage__featured-desc">
                                    {featuredEvent.description}
                                </p>
                                
                                <div className="events-stage__featured-meta">
                                    <span>
                                        <Clock size={16} />
                                        {featuredEvent.time}
                                    </span>
                                    <span>
                                        <MapPin size={16} />
                                        {featuredEvent.location}
                                    </span>
                                </div>
                                
                                <button className="events-stage__featured-cta">
                                    <span>Learn More</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════════════
                SECTION 3: UPCOMING EVENTS — HORIZONTAL SCROLL
                ════════════════════════════════════════════════════ */}
            {upcomingEvents.length > 0 && (
                <section 
                    className={`events-stage__upcoming ${upcomingVisible ? 'visible' : ''}`}
                    ref={upcomingRef}
                >
                    <div className="container">
                        <div className="events-stage__section-header">
                            <h2>Upcoming Events</h2>
                            <p>What's next on the stage</p>
                        </div>
                    </div>
                    
                    <div className="events-stage__scroll-wrapper">
                        <div 
                            className="events-stage__scroll-container"
                            ref={scrollContainerRef}
                        >
                            {upcomingEvents.map((event, index) => (
                                <article 
                                    key={event.id}
                                    className="events-stage__program-card"
                                    style={{ '--delay': `${index * 0.1}s` }}
                                >
                                    <div className="events-stage__program-image">
                                        <img src={event.image} alt={event.title} loading="lazy" />
                                        <div className="events-stage__program-overlay" />
                                        <span className="events-stage__program-category">
                                            {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                                        </span>
                                    </div>
                                    
                                    <div className="events-stage__program-content">
                                        <div className="events-stage__program-date">
                                            <span className="events-stage__program-day">
                                                {formatDate(event.date).day}
                                            </span>
                                            <span className="events-stage__program-month">
                                                {formatDate(event.date).month}
                                            </span>
                                        </div>
                                        
                                        <div className="events-stage__program-info">
                                            <h3>{event.title}</h3>
                                            <p>{event.description}</p>
                                            <div className="events-stage__program-meta">
                                                <span><Clock size={12} /> {event.time}</span>
                                                <span><MapPin size={12} /> {event.location}</span>
                                            </div>
                                        </div>
                                        
                                        <ArrowRight size={18} className="events-stage__program-arrow" />
                                    </div>
                                </article>
                            ))}
                        </div>
                        
                        {upcomingEvents.length > 2 && (
                            <div className="events-stage__scroll-controls">
                                <button 
                                    className="events-stage__scroll-btn events-stage__scroll-btn--prev"
                                    onClick={() => scrollProgram('left')}
                                    aria-label="Previous events"
                                >
                                    <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
                                </button>
                                <button 
                                    className="events-stage__scroll-btn events-stage__scroll-btn--next"
                                    onClick={() => scrollProgram('right')}
                                    aria-label="Next events"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════════════
                SECTION 4: ARCHIVE — PAST EVENTS ACCORDION
                ════════════════════════════════════════════════════ */}
            {archiveEvents.length > 0 && (
                <section 
                    className={`events-stage__archive ${archiveVisible ? 'visible' : ''}`}
                    ref={archiveRef}
                >
                    <div className="container">
                        <div className="events-stage__section-header">
                            <h2>Past Events</h2>
                            <p>Memories from the stage</p>
                        </div>
                        
                        <div className={`events-stage__archive-grid ${expandedArchive ? 'expanded' : ''}`}>
                            {archiveEvents.slice(0, expandedArchive ? archiveEvents.length : 3).map((event, index) => (
                                <article 
                                    key={event.id}
                                    className="events-stage__archive-card"
                                    style={{ '--delay': `${index * 0.08}s` }}
                                >
                                    <div className="events-stage__archive-image">
                                        <img src={event.image} alt={event.title} loading="lazy" />
                                        <div className="events-stage__archive-overlay" />
                                    </div>
                                    
                                    <div className="events-stage__archive-content">
                                        <div className="events-stage__archive-date">
                                            <span>{formatDate(event.date).day}</span>
                                            <span>{formatDate(event.date).month}</span>
                                        </div>
                                        
                                        <div className="events-stage__archive-info">
                                            <span className="events-stage__archive-category">
                                                {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                                            </span>
                                            <h3>{event.title}</h3>
                                            <p>{event.subtitle}</p>
                                        </div>
                                        
                                        <ArrowRight size={16} className="events-stage__archive-arrow" />
                                    </div>
                                </article>
                            ))}
                        </div>
                        
                        {archiveEvents.length > 3 && (
                            <button 
                                className="events-stage__archive-toggle"
                                onClick={() => setExpandedArchive(!expandedArchive)}
                            >
                                <span>{expandedArchive ? 'Show Less' : `View All ${archiveEvents.length} Past Events`}</span>
                                <ChevronDown 
                                    size={18} 
                                    style={{ transform: expandedArchive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.4s ease' }} 
                                />
                            </button>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Events
