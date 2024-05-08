import { useCallback, useState } from "react"

export interface ModalHandlers {
    open(): void
    close(): void
    toggle(): void
}

export const useModal = (isModalVisibleByDefault: boolean = false): ModalHandlers & { isVisible: boolean } => {
    const [isVisible, setVisibility] = useState(isModalVisibleByDefault)

    const toggle = useCallback(() => setVisibility(state => !state), [])
    const open = useCallback(() => setVisibility(true), [])
    const close = useCallback(() => setVisibility(false), [])

    return { isVisible, open, close, toggle }
}
