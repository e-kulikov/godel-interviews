import { forwardRef, useImperativeHandle, type ComponentType } from 'react'
import { createPortal } from 'react-dom'

import { useModal } from '../hooks/use-modal.ts'
import { useOutsideClick } from '../hooks/use-outside-click.ts'

import './modal.styles.css'

const ANIMATION_APPEARING_CLASSNAME = 'animation-appearing'
const ANIMATION_DISAPPEARING_CLASSNAME = 'animation-disappearing'
const BODY_BLOCKED_CLASSNAME = 'blurred'

interface ModalProps {
    isModalVisibleByDefault?: boolean
}

export const inModal = <Props extends object>(Component: ComponentType<Props>) =>
    forwardRef(({ isModalVisibleByDefault, ...props }: Props & ModalProps, ref) => {
        const { open, close, isVisible } = useModal(isModalVisibleByDefault, { appearing: ANIMATION_APPEARING_CLASSNAME, disappearing: ANIMATION_DISAPPEARING_CLASSNAME, blocked: BODY_BLOCKED_CLASSNAME })
        const modalRef = useOutsideClick<HTMLDivElement>(close)

        useImperativeHandle(ref, () => ({ open, close }))

        if (!isVisible) return null;

        return createPortal(
            <div className="modal">
                <div className="content" ref={modalRef}>
                    <button className="close" onKeyDown={close} onClick={close}>&times;</button>
                    <Component {...props as Props} />
                </div>
            </div>,
            document.body
        )
    })
