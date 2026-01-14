import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './PageStyles.css'

const Sponsors = () => {
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef(null)

    const sponsors = {
        platinum: [
            { id: 1, name: 'TechCorp', logo: 'https://via.placeholder.com/280x100/1F1F37/888888?text=TechCorp' },
        ],
        gold: [
            { id: 2, name: 'Dance Academy', logo: 'https://via.placeholder.com/220x80/1F1F37/888888?text=Dance+Academy' },
            { id: 3, name: 'Creative Studios', logo: 'https://via.placeholder.com/220x80/1F1F37/888888?text=Creative+Studios' },
        ],
        silver: [
            { id: 4, name: 'Fitness Hub', logo: 'https://via.placeholder.com/180x60/1F1F37/888888?text=Fitness+Hub' },
            { id: 5, name: 'Event Pro', logo: 'https://via.placeholder.com/180x60/1F1F37/888888?text=Event+Pro' },
            { id: 6, name: 'Music World', logo: 'https://via.placeholder.com/180x60/1F1F37/888888?text=Music+World' },
        ],
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="page sponsors">


            {/* Sponsors Grid */}
            <section className={`sponsors__grid ${visible ? 'visible' : ''}`} ref={sectionRef}>
                <div className="container">
                    {/* Platinum */}
                    <div className="sponsors__tier">
                        <h2 className="sponsors__tier-label">Platinum Partners</h2>
                        <div className="sponsors__logos sponsors__logos--platinum">
                            {sponsors.platinum.map((sponsor) => (
                                <div key={sponsor.id} className="sponsors__logo">
                                    <img src={sponsor.logo} alt={sponsor.name} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gold */}
                    <div className="sponsors__tier">
                        <h2 className="sponsors__tier-label">Gold Partners</h2>
                        <div className="sponsors__logos sponsors__logos--gold">
                            {sponsors.gold.map((sponsor) => (
                                <div key={sponsor.id} className="sponsors__logo">
                                    <img src={sponsor.logo} alt={sponsor.name} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Silver */}
                    <div className="sponsors__tier">
                        <h2 className="sponsors__tier-label">Silver Partners</h2>
                        <div className="sponsors__logos sponsors__logos--silver">
                            {sponsors.silver.map((sponsor) => (
                                <div key={sponsor.id} className="sponsors__logo">
                                    <img src={sponsor.logo} alt={sponsor.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Become a Sponsor */}
            <section className="sponsors__cta">
                <div className="container">
                    <div className="sponsors__cta-content">
                        <h2>Partner With Us</h2>
                        <p>
                            Join leading organizations in supporting the arts.
                            Your partnership helps us bring dance to more people and
                            creates valuable brand exposure within our community.
                        </p>
                        <a href="mailto:sponsors@pravaha.com" className="sponsors__cta-btn">
                            Become a Sponsor <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sponsors
