'use client'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import classes from './imageModal.module.scss'

interface ImageModalProps {
	photoUrl: string
}

export type ImageModalMethods = {
	openModal: () => void
	closeModal: () => void
}

const ImageModal = forwardRef<ImageModalMethods, ImageModalProps>((props, ref) => {
	const modal = useRef<HTMLDialogElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	useImperativeHandle(ref, () => ({
		openModal: () => {
			if (modal.current) {
				modal.current.showModal()
				setIsOpen(true)
			}
		},
		closeModal: () => {
			if (modal.current) {
				modal.current.close()
				setIsOpen(false)
			}
		},
	}))
	useEffect(() => {
		const dialogElement = modal.current
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (modal.current) {
					setIsOpen(false)
					modal.current.close()
				}
			}
		}
		const handleClickOutside = (e: MouseEvent) => {
			if (dialogElement && !dialogElement.contains(e.target as Node)) {
				setIsOpen(false)
				dialogElement.close()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<>
			<dialog ref={modal} className={classes.imageModal}>
				<img className={classes.imageModal__image} src={props.photoUrl} alt={props.photoUrl} />
			</dialog>
			{isOpen && <div className={classes.backdrop}></div>}
		</>
	)
})

export default ImageModal
