import { useEffect, useRef } from "react"

export const usePrevious = <T>(state: T): T | undefined => {
    const previous = useRef<T>()

    useEffect(() => {
        previous.current = state
    }, [state])

    return previous.current
}
