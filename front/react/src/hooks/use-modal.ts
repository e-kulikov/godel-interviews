import { useCallback, useState, useEffect } from 'react'
import { useAnimation } from './use-animation.ts'

export interface ModalHandlers {
    open(): void
    close(): void
}

const toggleBodyClassName = (className: string, isVisible: boolean) => document.body.classList[isVisible ? 'add' : 'remove']?.(className)

export const useModal = (
    isModalVisibleByDefault: boolean = false,
    {
        appearing = 'appearing',
        disappearing = 'disappearing',
        blocked = 'blocked',
        durationMs = 350,
    } = {}
): ModalHandlers & { isVisible: boolean } => {
    const [isVisible, setVisibility] = useState(isModalVisibleByDefault)
    const [ animateForward, animateBackward] = useAnimation(durationMs, appearing, disappearing)

    useEffect(() => {
        toggleBodyClassName(blocked, isVisible)
        return () => toggleBodyClassName(blocked, false)
    }, [isVisible, blocked])

    const open = useCallback(() => {
        setVisibility(true)
        animateForward()
    }, [animateForward])

    const close = useCallback(() => {
        animateBackward()
        setTimeout(() => setVisibility(false), durationMs)
    }, [animateBackward, durationMs])

    return { isVisible, open, close }
}
