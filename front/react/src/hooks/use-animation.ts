import { useState, useEffect, useCallback, useMemo } from "react"
import { usePrevious } from "./use-previous.ts"

enum Animation { 'forward', 'backward' }

export const useAnimation = (durationMs: number, forwardClassName: string, backwardClassName: string) => {
    const [animationState, setAnimation] = useState<Animation | null>(null)
    const previousAnimationState = usePrevious(animationState)
    const getAnimationClassName = useMemo(
        () => mapAnimationStateToClassName(forwardClassName, backwardClassName),
        [forwardClassName, backwardClassName]
    )

    const animate = useCallback((direction: Animation) => {
        setAnimation(direction)

        setTimeout(() => setAnimation(null), durationMs)
    }, [durationMs])

    useEffect(() => {
        const current = getAnimationClassName(animationState)
        const previous = getAnimationClassName(previousAnimationState)
        if (current) {
            document.body.classList.add(current)
        } else {
            previous && document.body.classList.remove(previous)
        }
    }, [animationState, previousAnimationState, getAnimationClassName]);

    const animateForward = useCallback(() => animate(Animation.forward), [animate])
    const animateBackward = useCallback(() => animate(Animation.backward), [animate])

    return [ animateForward, animateBackward ] as const
}

const mapAnimationStateToClassName = (forwardClassName: string, backwardClassName: string) => (state?: Animation | null) => {
    if (state === Animation.forward) return forwardClassName
    if (state === Animation.backward) return backwardClassName
    return null
}