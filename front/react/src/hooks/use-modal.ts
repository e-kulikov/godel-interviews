import { useCallback, useState, useEffect } from 'react'
import { useAnimation } from './use-animation.ts'

export interface ModalHandlers {
    open(): void
    close(): void
}

const ANIMATION_APPEARED_CLASSNAME = 'animation-appeared'
const ANIMATION_DISAPPEARED_CLASSNAME = 'animation-disappeared'
const BODY_BLOCKING_CLASSNAME = 'blurred'
const ANIMATION_DURATION = 350

const toggleBodyBlockingClassName = (isVisible: boolean) => document.body.classList[isVisible ? 'add' : 'remove']?.(BODY_BLOCKING_CLASSNAME)

export const useModal = (
    isModalVisibleByDefault: boolean = false,
    appearringClassName: string = ANIMATION_APPEARED_CLASSNAME,
    disappearringClassName: string = ANIMATION_DISAPPEARED_CLASSNAME,
): ModalHandlers & { isVisible: boolean } => {
    const [isVisible, setVisibility] = useState(isModalVisibleByDefault)
    const [ animateForward, animateBackward] = useAnimation(ANIMATION_DURATION, appearringClassName, disappearringClassName)

    useEffect(() => {
        toggleBodyBlockingClassName(isVisible)
        return () => toggleBodyBlockingClassName(false)
    }, [isVisible])

    const open = useCallback(() => {
        setVisibility(true)
        animateForward()
    }, [animateForward])

    const close = useCallback(() => {
        animateBackward()
        setTimeout(() => setVisibility(false), ANIMATION_DURATION)
    }, [animateBackward])

    return { isVisible, open, close }
}
