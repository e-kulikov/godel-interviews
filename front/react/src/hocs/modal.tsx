import { forwardRef, useImperativeHandle, type ComponentType } from 'react'
import { createPortal } from 'react-dom'

import { useModal } from '../hooks/use-modal.ts'
import { useOutsideClick } from '../hooks/use-outside-click.ts'

interface ModalProps {
    isModalVisibleByDefault?: boolean
}

export const inModal = <Props extends object>(Component: ComponentType<Props>) =>
    forwardRef(({ isModalVisibleByDefault, ...props }: Props & ModalProps, ref) => {
        const { open, close, toggle, isVisible } = useModal(isModalVisibleByDefault)
        const modalRef = useOutsideClick<HTMLDivElement>(close)

        useImperativeHandle(ref, () => ({ open, close, toggle }))

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
