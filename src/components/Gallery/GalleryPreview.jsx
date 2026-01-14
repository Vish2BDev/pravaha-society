import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import './GalleryPreview.css'

const GalleryPreview = () => {
    const [scrollProgress, setScrollProgress] = useState(0)
    const sectionRef = useRef(null)

    // 10 images: start tightly stacked, scatter outward dramatically
    const galleryItems = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=400&fit=crop',
            start: { x: -8, y: -10, rotate: -5 },
            end: { x: -110, y: -45, rotate: -18 },
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&h=400&fit=crop',
            start: { x: 5, y: -12, rotate: 8 },
            end: { x: 80, y: -50, rotate: 15 },
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=300&h=400&fit=crop',
            start: { x: -12, y: 0, rotate: -8 },
            end: { x: -95, y: 10, rotate: -12 },
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=400&fit=crop',
            start: { x: 0, y: -5, rotate: 3 },
            end: { x: 0, y: -55, rotate: 5 },
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop',
            start: { x: 10, y: 5, rotate: 6 },
            end: { x: 105, y: 5, rotate: 10 },
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop',
            start: { x: -5, y: 8, rotate: -3 },
            end: { x: -75, y: 45, rotate: -8 },
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=400&fit=crop',
            start: { x: 8, y: 12, rotate: 5 },
            end: { x: 90, y: 50, rotate: 12 },
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1546427660-eb346c344ba5?w=300&h=400&fit=crop',
            start: { x: -3, y: 15, rotate: -2 },
            end: { x: -40, y: 55, rotate: -5 },
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=400&fit=crop',
            start: { x: 12, y: -8, rotate: 10 },
            end: { x: 115, y: -35, rotate: 20 },
        },
        {
            id: 10,
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
            start: { x: 3, y: 18, rotate: 2 },
            end: { x: 50, y: 60, rotate: 8 },
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const sectionCenter = rect.top + rect.height / 2

            // 0 at start, 1 when section center hits viewport center
            const distanceFromCenter = Math.abs(sectionCenter - windowHeight / 2)
            const maxDistance = windowHeight * 0.7

            const progress = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance))
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

    return (
        <section className="gallery-preview" ref={sectionRef}>
            {/* Header */}
            <div className="gallery-preview__header">
                <div className="gallery-preview__header-content">
                    <span className="gallery-preview__label">Gallery</span>
                    <h2 className="gallery-preview__title">Moments in Motion</h2>
                </div>
                <Link to="/gallery" className="gallery-preview__cta" data-cursor="View">
                    <span>View All</span>
                    <ArrowRight size={18} />
                </Link>
            </div>

            {/* Scatter Container */}
            <div className="gallery-preview__scatter">
                {galleryItems.map((item, index) => {
                    const easedProgress = easeOutExpo(scrollProgress)

                    const x = item.start.x + (item.end.x - item.start.x) * easedProgress
                    const y = item.start.y + (item.end.y - item.start.y) * easedProgress
                    const rotate = item.start.rotate + (item.end.rotate - item.start.rotate) * easedProgress
                    const scale = 0.9 + 0.1 * easedProgress // Slight scale up

                    return (
                        <div
                            key={item.id}
                            className="gallery-preview__item"
                            style={{
                                transform: `translate(${x}%, ${y}%) rotate(${rotate}deg) scale(${scale})`,
                                zIndex: 10 - index, // First items on top
                            }}
                            data-cursor="View"
                        >
                            <img src={item.image} alt={`Gallery ${item.id}`} loading="lazy" />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default GalleryPreview
