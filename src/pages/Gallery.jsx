import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Play, ChevronDown } from 'lucide-react'
import './PageStyles.css'

const Gallery = () => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [activeSection, setActiveSection] = useState(null)
    const [activeYear, setActiveYear] = useState('2025') // Default to latest year

    // Mobile "Load More" state
    const [visiblePhotosCount, setVisiblePhotosCount] = useState(6)
    const [visibleVideosCount, setVisibleVideosCount] = useState(2)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Reset counts when year changes
    useEffect(() => {
        setVisiblePhotosCount(6)
    }, [activeYear])

    // Helper to generate dummy images with GAP-FREE patterns
    const generateImages = (count, startId, year) => {
        // This pattern strictly fits a 2-row grid to avoid holes
        // tall (2 rows), square+square (2 rows), big (2 rows, 2 cols), wide+wide (2 rows, 2 cols)
        const pattern = [
            'tall',         // Col 1 filled
            'square', 'square', // Col 2 filled
            'big',          // Col 3-4 filled
            'wide', 'wide', // Col 5-6 filled (stacked)
            'tall',         // Col 7 filled
            'square', 'square' // Col 8 filled
        ]

        const images = [
            'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1504851212882-93a0290bb063?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1542156822-6924d1a71ace?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1501432607144-8add53c6be4b?w=800&h=1200&fit=crop',
        ]

        return Array.from({ length: count }, (_, i) => ({
            id: startId + i,
            src: images[i % images.length],
            title: `${year} Moment ${i + 1}`,
            aspect: pattern[i % pattern.length]
        }))
    }

    // Data keys match the year toggle values
    const galleryData = {
        '2025': generateImages(22, 100, '2025'),
        '2024': generateImages(20, 200, '2024'),
        '2023': generateImages(18, 300, '2023'),
    }

    const videos = [
        { id: 'v1', src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=600&fit=crop', title: 'Paradox 2024 Highlights', duration: '3:45' },
        { id: 'v2', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop', title: 'Winning Performance 2023', duration: '5:20' },
        { id: 'v3', src: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=600&fit=crop', title: 'Street Dance Battle', duration: '2:15' },
        { id: 'v4', src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop', title: 'Classical Showcase', duration: '4:10' },
        { id: 'v5', src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop', title: 'Team Behind Scenes', duration: '2:45' },
        { id: 'v6', src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=600&fit=crop', title: 'Practice Montage', duration: '1:30' },
    ]

    const openLightbox = (item, section) => {
        setSelectedItem(item)
        setActiveSection(section)
    }

    const closeLightbox = () => {
        setSelectedItem(null)
        setActiveSection(null)
    }

    const navigateLightbox = (direction) => {
        if (!selectedItem || !activeSection) return

        let currentList = []
        if (activeSection === 'videos') currentList = videos
        else currentList = galleryData[activeSection]

        const currentIndex = currentList.findIndex(item => item.id === selectedItem.id)
        if (currentIndex === -1) return

        let newIndex
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % currentList.length
        } else {
            newIndex = (currentIndex - 1 + currentList.length) % currentList.length
        }

        setSelectedItem(currentList[newIndex])
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowRight') navigateLightbox('next')
            if (e.key === 'ArrowLeft') navigateLightbox('prev')
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedItem])

    return (
        <div className="page gallery">


            {/* Year Filter Toggle */}
            <div className="container">
                <div className="gallery__filter-container">
                    <div className="gallery__filter">
                        {['2025', '2024', '2023'].map((year) => (
                            <button
                                key={year}
                                className={`gallery__filter-btn ${activeYear === year ? 'active' : ''}`}
                                onClick={() => setActiveYear(year)}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Year Reel */}
            <section key={activeYear} className="gallery__section animate-enter">
                <div className="container-wide">
                    <div className="gallery__section-header">
                        <h2 className="gallery__section-title">
                            Paradox {activeYear} <span>({galleryData[activeYear].length} Photos)</span>
                        </h2>
                    </div>

                    {/* Desktop: Horizontal scroll reel */}
                    {!isMobile && (
                        <div className="gallery__reel">
                            {galleryData[activeYear].map((item) => (
                                <div
                                    key={item.id}
                                    className={`gallery__reel-item gallery__reel-item--${item.aspect}`}
                                    onClick={() => openLightbox(item, activeYear)}
                                >
                                    <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                                    <figcaption>{item.title}</figcaption>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mobile: Grid layout with Load More */}
                    {isMobile && (
                        <>
                            <div className="gallery__mobile-grid">
                                {galleryData[activeYear].slice(0, visiblePhotosCount).map((item) => (
                                    <div
                                        key={item.id}
                                        className="gallery__mobile-grid-item"
                                        onClick={() => openLightbox(item, activeYear)}
                                    >
                                        <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                                    </div>
                                ))}
                            </div>
                            {visiblePhotosCount < galleryData[activeYear].length && (
                                <button
                                    className="gallery__load-more"
                                    onClick={() => setVisiblePhotosCount(prev => prev + 6)}
                                >
                                    <span>Load More</span>
                                    <ChevronDown size={18} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Video Reel */}
            <section className="gallery__section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container-wide">
                    <div className="gallery__section-header">
                        <h2 className="gallery__section-title">
                            Performance Videos <span>({videos.length} Videos)</span>
                        </h2>
                    </div>

                    {/* Desktop: Horizontal scroll reel */}
                    {!isMobile && (
                        <div className="gallery__reel">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="gallery__reel-item gallery__reel-item--video"
                                    onClick={() => openLightbox(video, 'videos')}
                                >
                                    <img src={video.src} alt={video.title} loading="lazy" decoding="async" />
                                    <div className="gallery__play-btn">
                                        <Play size={24} fill="currentColor" />
                                    </div>
                                    <figcaption>
                                        {video.title} <span style={{ opacity: 0.6 }}>• {video.duration}</span>
                                    </figcaption>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mobile: Grid layout with Load More */}
                    {isMobile && (
                        <>
                            <div className="gallery__mobile-grid gallery__mobile-grid--videos">
                                {videos.slice(0, visibleVideosCount).map((video) => (
                                    <div
                                        key={video.id}
                                        className="gallery__mobile-grid-item gallery__mobile-grid-item--video"
                                        onClick={() => openLightbox(video, 'videos')}
                                    >
                                        <img src={video.src} alt={video.title} loading="lazy" decoding="async" />
                                        <div className="gallery__play-btn">
                                            <Play size={20} fill="currentColor" />
                                        </div>
                                        <figcaption>{video.title}</figcaption>
                                    </div>
                                ))}
                            </div>
                            {visibleVideosCount < videos.length && (
                                <button
                                    className="gallery__load-more"
                                    onClick={() => setVisibleVideosCount(prev => prev + 2)}
                                >
                                    <span>Load More</span>
                                    <ChevronDown size={18} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedItem && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox__close" onClick={closeLightbox}>
                        <X size={24} />
                    </button>
                    <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}>
                        <ChevronLeft size={32} />
                    </button>
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedItem.src} alt={selectedItem.title} />
                        <p className="lightbox__title">{selectedItem.title}</p>
                    </div>
                    <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}>
                        <ChevronRight size={32} />
                    </button>
                    <div className="lightbox__counter">
                        {activeSection === 'videos' ? 'Video' : activeSection}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gallery
