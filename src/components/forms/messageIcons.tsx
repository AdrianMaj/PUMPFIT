import React, { ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import classes from './messageIcons.module.scss'

const MessageIcons = ({
	emojiIsOpened,
	handleOpenEmojiPicker,
	handleAddEmoji,
	handleFileChange,
}: {
	emojiIsOpened: boolean
	handleOpenEmojiPicker: () => void
	handleAddEmoji: (emoji: EmojiClickData) => void
	handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
	const svgVariants = {
		default: {
			stroke: '#b3b3b3',
		},
		hover: {
			stroke: 'white',
		},
	}
	return (
		<div className={classes.messageIcons}>
			<motion.label
				initial="default"
				whileHover="hover"
				className={classes.messageIcons__imageInputLabel}
				htmlFor="photos">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					variants={svgVariants}
					viewBox="0 0 24 24"
					strokeWidth="2"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M15 8h.01" />
					<path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
					<path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
					<path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
				</motion.svg>
			</motion.label>
			<motion.label
				initial="default"
				whileHover="hover"
				className={classes.messageIcons__imageInputLabel}
				htmlFor="files">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					variants={svgVariants}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
				</motion.svg>
			</motion.label>
			<motion.button
				onClick={handleOpenEmojiPicker}
				type="button"
				initial="default"
				whileHover="hover"
				animate={emojiIsOpened && 'hover'}
				className={classes.messageIcons__imageInputLabelButton}>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					variants={svgVariants}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
					<path d="M9 10l.01 0" />
					<path d="M15 10l.01 0" />
					<path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
				</motion.svg>
			</motion.button>
			<EmojiPicker
				lazyLoadEmojis={true}
				width="40em"
				style={{
					maxWidth: '110%',
				}}
				theme={Theme.DARK}
				className={classes.messageIcons__emojiPicker}
				open={emojiIsOpened}
				onEmojiClick={emoji => handleAddEmoji(emoji)}
			/>
			<input
				accept="image/*,video/*,audio/*"
				className={classes.messageIcons__imageInput}
				onChange={handleFileChange}
				type="file"
				id="photos"
				multiple
			/>
			<input
				accept="text/*,application/*,font/*"
				className={classes.messageIcons__imageInput}
				onChange={handleFileChange}
				type="file"
				id="files"
				multiple
			/>
		</div>
	)
}

export default MessageIcons
