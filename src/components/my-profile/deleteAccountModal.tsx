'use client'
import React, { useRef } from 'react'

const DeleteAccountModal = () => {
	const modal = useRef<HTMLDialogElement>(null)

	return (
		<dialog ref={modal}>
			<p>Test</p>
		</dialog>
	)
}

export default DeleteAccountModal
