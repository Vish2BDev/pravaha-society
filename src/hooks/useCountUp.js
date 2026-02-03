import { useState, useEffect, useRef } from 'react'

/**
 * Premium CountUp Animation Hook
 * Award-grade number animation with easing
 * @param {number} end - Target number to count to
 * @param {number} duration - Animation duration in ms
 * @param {boolean} startOnView - Whether to wait for visibility trigger
 * @param {string} suffix - Optional suffix like '+' or 'K+'
 * @returns {Object} { count, ref, setHasStarted, formattedCount }
 */
export const useCountUp = (end, duration = 2000, startOnView = true, suffix = '') => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true)
        }
    }, [startOnView])

    useEffect(() => {
        if (!hasStarted) return

        let startTime = null
        const startValue = 0

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            
            // Ease-out-cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(startValue + (end - startValue) * easeOut))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration, hasStarted])

    // Format large numbers (3000 -> 3K)
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K'
        }
        return num.toString()
    }

    return { 
        count, 
        ref, 
        setHasStarted,
        formattedCount: formatNumber(count) + suffix,
        rawCount: count
    }
}

/**
 * Hook for multiple CountUp animations with staggered start
 * @param {Array} configs - Array of { end, duration, suffix } objects
 * @param {number} staggerDelay - Delay between each counter start
 * @returns {Object} { counters, triggerAll, isComplete }
 */
export const useMultipleCountUp = (configs, staggerDelay = 150) => {
    const [counters, setCounters] = useState(
        configs.map(config => ({ count: 0, isComplete: false }))
    )
    const [hasTriggered, setHasTriggered] = useState(false)
    const ref = useRef(null)

    const formatNumber = (num, useK = false) => {
        if (useK && num >= 1000) {
            return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K'
        }
        return num.toString()
    }

    const triggerAll = () => {
        if (hasTriggered) return
        setHasTriggered(true)

        configs.forEach((config, index) => {
            setTimeout(() => {
                const { end, duration = 2000 } = config
                let startTime = null

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime
                    const progress = Math.min((currentTime - startTime) / duration, 1)
                    const easeOut = 1 - Math.pow(1 - progress, 3)
                    const currentCount = Math.floor(end * easeOut)

                    setCounters(prev => {
                        const newCounters = [...prev]
                        newCounters[index] = { 
                            count: currentCount, 
                            isComplete: progress >= 1 
                        }
                        return newCounters
                    })

                    if (progress < 1) {
                        requestAnimationFrame(animate)
                    }
                }

                requestAnimationFrame(animate)
            }, index * staggerDelay)
        })
    }

    const formattedCounters = counters.map((counter, index) => ({
        ...counter,
        formatted: formatNumber(counter.count, configs[index]?.useK) + (configs[index]?.suffix || '')
    }))

    return { 
        counters: formattedCounters, 
        triggerAll, 
        ref,
        isComplete: counters.every(c => c.isComplete)
    }
}

export default useCountUp
