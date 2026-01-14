import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './PageStyles.css'

const Members = () => {
    const [visible, setVisible] = useState(false)
    const [hoveredMember, setHoveredMember] = useState(null)
    const sectionRef = useRef(null)

    const secretary = {
        name: 'Priya Sharma',
        role: 'Secretary',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face',
        bio: 'Priya has been leading Pravaha with passion and dedication since 2024. A trained Bharatanatyam dancer, she believes in the transformative power of dance to build community and foster personal growth.',
        linkedin: '#',
    }

    const deputySecretary = {
        name: 'Arjun Menon',
        role: 'Deputy Secretary',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face',
        bio: 'Arjun brings a creative vision and organizational excellence to the team. His focus on blending traditional forms with contemporary styles has helped shape the unique identity of our performances.',
        linkedin: '#',
    }

    const team = [
        { id: 2, name: 'Sneha Reddy', role: 'Creative Head', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
        { id: 3, name: 'Rahul Krishnan', role: 'Events Head', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
        { id: 4, name: 'Ananya Patel', role: 'Technical Lead', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' },
        { id: 5, name: 'Vikram Singh', role: 'Outreach Head', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
        { id: 6, name: 'Kavya Nair', role: 'Media Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face' },
        { id: 7, name: 'Rohan Das', role: 'Finance Lead', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face' },
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
        <div className="page members">


            {/* Leadership Section */}
            <section className="members__leadership">
                <div className="container">
                    <div className="members__exec-grid">
                        {/* Secretary */}
                        <div className="members__leader">
                            <div className="members__leader-image">
                                <img src={secretary.image} alt={secretary.name} />
                            </div>
                            <div className="members__leader-content">
                                <span className="members__leader-role">{secretary.role}</span>
                                <h2 className="members__leader-name">{secretary.name}</h2>
                                <p className="members__leader-bio">{secretary.bio}</p>
                                <a href={secretary.linkedin} className="members__leader-link">
                                    Connect <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Deputy Secretary */}
                        <div className="members__leader">
                            <div className="members__leader-image">
                                <img src={deputySecretary.image} alt={deputySecretary.name} />
                            </div>
                            <div className="members__leader-content">
                                <span className="members__leader-role">{deputySecretary.role}</span>
                                <h2 className="members__leader-name">{deputySecretary.name}</h2>
                                <p className="members__leader-bio">{deputySecretary.bio}</p>
                                <a href={deputySecretary.linkedin} className="members__leader-link">
                                    Connect <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="members__team" ref={sectionRef}>
                <div className="container">
                    <h2 className="members__team-title">Core Team</h2>
                    <div className={`members__grid ${visible ? 'visible' : ''}`}>
                        {team.map((member, index) => (
                            <article
                                key={member.id}
                                className="member-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onMouseEnter={() => setHoveredMember(member.id)}
                                onMouseLeave={() => setHoveredMember(null)}
                            >
                                <div className="member-card__image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="member-card__info">
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="members__join">
                <div className="container">
                    <h2>Join Our Team</h2>
                    <p>We're always looking for passionate dancers to join our community.</p>
                    <a href="/contact" className="members__join-btn">
                        Apply Now <ArrowUpRight size={18} />
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Members
