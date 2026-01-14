import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './PageStyles.css'

const Stories = () => {
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const featuredStory = {
        id: 1,
        name: 'Priya Sharma',
        role: 'Bharatanatyam Lead',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop&crop=face',
        excerpt: 'My journey with Pravaha started as a shy freshman who barely knew any dance forms. Today, I lead the classical dance team.',
        story: 'The transformation has been incredible. The supportive environment here pushed me to discover strengths I never knew I had. Pravaha is not just about dance—it\'s about growing as a person, finding your voice, and learning to express what words cannot.',
    }

    const stories = [
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
            excerpt: 'Coming from a small town, I never imagined I\'d be performing on big stages. Pravaha gave me that platform.',
        },
        {
            id: 4,
            name: 'Rahul Krishnan',
            role: 'Hip-Hop Crew Captain',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            excerpt: 'From street dance battles to cultural performances, Pravaha embraces all forms of expression.',
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
        <div className="page stories">


            {/* Featured Story */}
            <section className="stories__featured">
                <div className="container">
                    <article className="stories__featured-card">
                        <div className="stories__featured-image">
                            <img src={featuredStory.image} alt={featuredStory.name} />
                        </div>
                        <div className="stories__featured-content">
                            <blockquote className="stories__featured-quote">
                                "{featuredStory.excerpt}"
                            </blockquote>
                            <p className="stories__featured-story">{featuredStory.story}</p>
                            <footer className="stories__featured-author">
                                <span className="stories__featured-name">{featuredStory.name}</span>
                                <span className="stories__featured-role">{featuredStory.role}</span>
                            </footer>
                        </div>
                    </article>
                </div>
            </section>

            {/* More Stories */}
            <section className={`stories__list ${visible ? 'visible' : ''}`} ref={sectionRef}>
                <div className="container">
                    <h2 className="stories__list-title">More Stories</h2>
                    <div className="stories__grid">
                        {stories.map((story, index) => (
                            <article
                                key={story.id}
                                className="story-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="story-card__image">
                                    <img src={story.image} alt={story.name} />
                                </div>
                                <div className="story-card__content">
                                    <p className="story-card__excerpt">"{story.excerpt}"</p>
                                    <footer className="story-card__author">
                                        <span className="story-card__name">{story.name}</span>
                                        <span className="story-card__role">{story.role}</span>
                                    </footer>
                                </div>
                            </article>
                        ))}
                    </div>
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
