import { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        // Add hover detection for interactive elements
        const addHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, [data-cursor]')
            elements.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true))
                el.addEventListener('mouseleave', () => setIsHovering(false))
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        addHoverListeners()
        const observer = new MutationObserver(addHoverListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            observer.disconnect()
        }
    }, [])

    return (
        <div
            className={`cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            style={{ left: position.x, top: position.y }}
        >
            {/* 4-Point Star SVG */}
            <svg
                className="cursor__star"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>

            {/* Outer glow ring on hover */}
            <div className="cursor__ring" />
        </div>
    )
}

export default CustomCursor
