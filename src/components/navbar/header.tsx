import classes from './header.module.scss'
import Menu from './menu'
import Wrapper from '../ui/wrapper'
import HeaderBackground from './headerBackground'
import HeaderLogo from './headerLogo'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
const Header = async () => {
	const session = await getServerSession(authOptions)
	return (
		<>
			<div className={classes.header}>
				<HeaderBackground />
				<Wrapper>
					<div className={classes.content}>
						<HeaderLogo />
						<Menu session={session} />
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default Header
