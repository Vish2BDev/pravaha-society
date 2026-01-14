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
            id: 1, // Far Left Top
            image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=400&fit=crop',
            start: { x: -8, y: -10, rotate: -5 },
            end: { x: -170, y: -45, rotate: -15 },
        },
        {
            id: 9, // Far Right Top (Mirror of 1)
            image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=400&fit=crop',
            start: { x: 12, y: -8, rotate: 10 },
            end: { x: 165, y: -55, rotate: 20 },
        },
        {
            id: 3, // Mid Left
            image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=300&h=400&fit=crop',
            start: { x: -12, y: 0, rotate: -8 },
            end: { x: -130, y: 10, rotate: -12 },
        },
        {
            id: 5, // Mid Right (Mirror of 3)
            image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop',
            start: { x: 10, y: 5, rotate: 6 },
            end: { x: 125, y: -5, rotate: 10 },
        },
        {
            id: 6, // Bottom Far Left
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop',
            start: { x: -5, y: 8, rotate: -3 },
            end: { x: -150, y: 50, rotate: -8 },
        },
        {
            id: 7, // Bottom Far Right (Mirror of 6)
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=400&fit=crop',
            start: { x: 8, y: 12, rotate: 5 },
            end: { x: 145, y: 60, rotate: 12 },
        },
        {
            id: 4, // Near Top Left
            image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=400&fit=crop',
            start: { x: 0, y: -5, rotate: 3 },
            end: { x: -55, y: -65, rotate: 5 },
        },
        {
            id: 2, // Near Top Right (Mirror of 4)
            image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=300&h=400&fit=crop',
            start: { x: 5, y: -12, rotate: 8 },
            end: { x: 50, y: -60, rotate: 15 },
        },
        {
            id: 8, // Near Bottom Left
            image: 'https://images.unsplash.com/photo-1546427660-eb346c344ba5?w=300&h=400&fit=crop',
            start: { x: -3, y: 15, rotate: -2 },
            end: { x: -45, y: 65, rotate: -5 },
        },
        {
            id: 10, // Near Bottom Right (Mirror of 8)
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
            start: { x: 3, y: 18, rotate: 2 },
            end: { x: 60, y: 55, rotate: 8 },
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const sectionCenter = rect.top + rect.height / 2

            // Significantly widen the range to ensure fast scrolls don't skip the animation
            const distanceFromCenter = Math.abs(sectionCenter - windowHeight / 2)
            const holdDistance = windowHeight * 0.25 // 25% plateau (stay spread out longer)
            const activeDistance = Math.max(0, distanceFromCenter - holdDistance)
            const maxDistance = windowHeight * 0.5 // 50% trigger range (start earlier, end later)

            const progress = Math.max(0, Math.min(1, 1 - activeDistance / maxDistance))
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smoother cubic ease out for more "floaty" feel
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

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
                    const easedProgress = easeOutCubic(scrollProgress)

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
