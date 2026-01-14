import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered reveal animations
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, isVisible] - ref to attach to element, visibility state
 */
export const useScrollReveal = (options = {}) => {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Once revealed, stop observing
                    observer.unobserve(entry.target)
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
                ...options,
            }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [options.threshold, options.rootMargin])

    return [ref, isVisible]
}

/**
 * Hook for multiple elements with staggered reveal
 * @param {number} count - Number of elements
 * @param {number} staggerDelay - Delay between each element in ms
 * @returns {Function} getRevealProps - Function to get props for each element
 */
export const useStaggeredReveal = (count, staggerDelay = 100) => {
    const [visibleItems, setVisibleItems] = useState(new Set())
    const refs = useRef([])

    useEffect(() => {
        const observers = refs.current.map((ref, index) => {
            if (!ref) return null

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleItems((prev) => new Set([...prev, index]))
                        }, index * staggerDelay)
                        observer.unobserve(entry.target)
                    }
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            )

            observer.observe(ref)
            return observer
        })

        return () => {
            observers.forEach((observer) => observer?.disconnect())
        }
    }, [count, staggerDelay])

    const getRevealProps = (index) => ({
        ref: (el) => (refs.current[index] = el),
        className: visibleItems.has(index) ? 'visible' : '',
    })

    return getRevealProps
}

/**
 * Hook for animated counters
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} start - Whether to start counting
 * @returns {number} Current count value
 */
export const useAnimatedCounter = (end, duration = 2000, start = false) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!start) return

        let startTimestamp = null
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
                window.requestAnimationFrame(step)
            }
        }
        window.requestAnimationFrame(step)
    }, [end, duration, start])

    return count
}

export default useScrollReveal
