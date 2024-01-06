'use client'
import Input from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classes from './myProfileForm.module.scss'
import Link from 'next/link'

import LinkButton from '@/components/ui/linkButton'

const FormSchema = z.object({
	photourl: z.string(),
})

const MyProfileForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			photourl: '',
		},
	})
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log(values)
	}
	const handlePublish = () => {
		console.log('working')
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
				<div className={classes.input}>
					<Input type="text" label="Photo URL" id="photourl" />
					<p className={classes.inputNote}>
						Note: Upload your photo to <Link href="https://imgur.com/">Imgur</Link> and then paste the URL here
					</p>
				</div>
				<div className={classes.priceExperienceContainer}>
					<div className={classes.container}>
						<Input type="number" label="Experience" id="experience" />
						<select className={`${classes.inputSide} ${classes.experienceInput}`} id="experience">
							<option value="Years">Years</option>
							<option value="Years">Months</option>
						</select>
					</div>
					<div className={classes.container}>
						<Input type="number" label="Price" id="price" />
						<p className={`${classes.inputSide} ${classes.priceTag}`}>$ / hr</p>
					</div>
				</div>
				<div className={classes.selectContainer}>
					{/* <label className={classes.label} htmlFor="categories">
						Categories
					</label> */}
					<Input type="number" label="Categories" id="categories" />
				</div>
				<div className={classes.selectContainer}>
					{/* <label className={classes.label} htmlFor="testimonials">
						Testimonials
					</label> */}
					<Input type="number" label="Testimonials" id="testimonials" />
				</div>
				<div className={classes.buttons}>
					<LinkButton linked="/preview">Preview</LinkButton>
					<LinkButton linked="/preview">Save</LinkButton>
					<LinkButton filled linked="/preview">
						Publish
					</LinkButton>
					{/* <button className={classes.textButton} type="submit">
						Save
					</button>
					<button className={classes.filledButton} type="submit" onClick={handlePublish}>
						Publish
					</button> */}
				</div>
			</form>
		</FormProvider>
	)
}

export default MyProfileForm
