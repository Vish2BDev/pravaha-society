import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Quote } from 'lucide-react'
import './PageStyles.css'

const Stories = () => {
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const stories = [
        {
            id: 1,
            name: 'Priya Sharma',
            role: 'Bharatanatyam Lead',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop&crop=face',
            excerpt: 'My journey with Pravaha started as a shy freshman. Today, I lead the classical dance team.',
        },
        {
            id: 2,
            name: 'Arjun Menon',
            role: 'Contemporary Choreographer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            excerpt: 'Being part of Pravaha taught me that dance is not just about moves—it\'s about storytelling and emotion.',
        },
        {
            id: 3,
            name: 'Sneha Reddy',
            role: 'Fusion Dance Member',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            excerpt: 'Coming from a small town, I never imagined I\'d be performing on big stages. Pravaha gave me that.',
        },
        {
            id: 4,
            name: 'Rahul Krishnan',
            role: 'Hip-Hop Crew Captain',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            excerpt: 'From street dance battles to cultural performances, Pravaha embraces all forms of expression.',
        },
        {
            id: 5,
            name: 'Ananya Patel',
            role: 'Odissi Dancer',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
            excerpt: 'The rigorous training here refined my technique, but the friendships I made defined my college life.',
        },
        {
            id: 6,
            name: 'Vikram Singh',
            role: 'Street Style Dancer',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
            excerpt: 'Pravaha is a family. We sweat together, we create together, and we shine together on stage.',
        },
        {
            id: 7,
            name: 'Meera Iyer',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
            excerpt: 'Directing our annual showcase was the most challenging yet rewarding experience of my life.',
        },
        {
            id: 8,
            name: 'David Chen',
            role: 'B-Boy',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
            excerpt: 'I found my rhythm here. The energy in the practice room is absolutely infectious.',
        },
        {
            id: 9,
            name: 'Zoya Khan',
            role: 'Kathak Apprentice',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
            excerpt: 'Pravaha taught me that tradition and modernity can coexist beautifully in every step we take.',
        }
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
        <div className="page stories">


            {/* Stories Grid */}
            <section className="stories__list visible" ref={sectionRef}>
                <div className="container">
                    <div className="stories__header">
                        <h1 className="stories__title">Voices of Pravaha</h1>
                        <p className="stories__subtitle">Personal journeys from our dance community</p>
                    </div>

                    <div className="stories__grid">
                        {stories.map((story, index) => (
                            <article
                                key={story.id}
                                className="story-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="story-card__image-container">
                                    <div className="story-card__image">
                                        <img src={story.image} alt={story.name} />
                                    </div>
                                </div>
                                <div className="story-card__content">
                                    <div className="story-card__header">
                                        <span className="story-card__name">{story.name}</span>
                                        <Quote size={20} className="story-card__quote-icon" />
                                    </div>
                                    <p className="story-card__excerpt">{story.excerpt}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <p className="stories__more">...and many more</p>
                </div>
            </section>

            {/* Share Story CTA */}
            <section className="stories__cta">
                <div className="container">
                    <h2>Share Your Story</h2>
                    <p>Have a Pravaha journey to share? We'd love to hear from you.</p>
                    <a href="/contact" className="stories__cta-btn">
                        Submit Your Story <ArrowRight size={18} />
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Stories
