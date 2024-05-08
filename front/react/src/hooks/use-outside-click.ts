import { useEffect, useRef } from "react"

export const useOutsideClick = 
    <T extends HTMLElement = HTMLElement>(next: (e?: Event) => void) => {
        const ref = useRef<T>(null)
        const cb = useRef(next)

        useEffect(() => {
            cb.current = next
        }, [next])

        useEffect(() => {
            const handler = (event: Event) => {
                if (ref.current && event.target instanceof Element && !ref.current.contains(event.target)) {
                    cb.current(event)
                }
            }

            document.addEventListener('mousedown', handler)
            document.addEventListener('touchstart', handler)

            return () => {
                document.removeEventListener('mousedown', handler)
                document.removeEventListener('touchstart', handler)
            }
        }, [])

        return ref;
    }
