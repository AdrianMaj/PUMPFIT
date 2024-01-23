'use client'
import React from 'react'
import classes from './starRating.module.scss'

const StarRating = ({ value, setValue }: { value: number; setValue?: (value: number) => void }) => {
	return (
		<div className={classes.starContainer}>
			<svg
				className={classes.starIcon}
				onClick={() => {
					if (setValue) {
						setValue(1)
					}
				}}
				style={{
					cursor: setValue ? 'pointer' : 'default',
				}}
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill={value >= 1 ? '#a50000' : 'none'}
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_13_254)">
					<path
						d="M12 17.75L5.82796 20.995L7.00696 14.122L2.00696 9.255L8.90696 8.255L11.993 2.002L15.079 8.255L21.979 9.255L16.979 14.122L18.158 20.995L12 17.75Z"
						stroke="#A50000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_13_254">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<svg
				className={classes.starIcon}
				onClick={() => {
					if (setValue) {
						setValue(2)
					}
				}}
				style={{
					cursor: setValue ? 'pointer' : 'default',
				}}
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill={value >= 2 ? '#a50000' : 'none'}
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_13_254)">
					<path
						d="M12 17.75L5.82796 20.995L7.00696 14.122L2.00696 9.255L8.90696 8.255L11.993 2.002L15.079 8.255L21.979 9.255L16.979 14.122L18.158 20.995L12 17.75Z"
						stroke="#A50000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_13_254">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<svg
				className={classes.starIcon}
				onClick={() => {
					if (setValue) {
						setValue(3)
					}
				}}
				style={{
					cursor: setValue ? 'pointer' : 'default',
				}}
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill={value >= 3 ? '#a50000' : 'none'}
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_13_254)">
					<path
						d="M12 17.75L5.82796 20.995L7.00696 14.122L2.00696 9.255L8.90696 8.255L11.993 2.002L15.079 8.255L21.979 9.255L16.979 14.122L18.158 20.995L12 17.75Z"
						stroke="#A50000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_13_254">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<svg
				className={classes.starIcon}
				onClick={() => {
					if (setValue) {
						setValue(4)
					}
				}}
				style={{
					cursor: setValue ? 'pointer' : 'default',
				}}
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill={value >= 4 ? '#a50000' : 'none'}
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_13_254)">
					<path
						d="M12 17.75L5.82796 20.995L7.00696 14.122L2.00696 9.255L8.90696 8.255L11.993 2.002L15.079 8.255L21.979 9.255L16.979 14.122L18.158 20.995L12 17.75Z"
						stroke="#A50000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_13_254">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<svg
				className={classes.starIcon}
				onClick={() => {
					if (setValue) {
						setValue(5)
					}
				}}
				style={{
					cursor: setValue ? 'pointer' : 'default',
				}}
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill={value >= 5 ? '#a50000' : 'none'}
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_13_254)">
					<path
						d="M12 17.75L5.82796 20.995L7.00696 14.122L2.00696 9.255L8.90696 8.255L11.993 2.002L15.079 8.255L21.979 9.255L16.979 14.122L18.158 20.995L12 17.75Z"
						stroke="#A50000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_13_254">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}

export default StarRating
