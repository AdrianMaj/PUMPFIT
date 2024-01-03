import classes from './header.module.scss'
import Menu from './menu'
import Wrapper from '../ui/wrapper'
import HeaderBackground from './headerBackground'
import Logo from '../ui/Logo'
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
						<header>
							<Logo width="70%" />
						</header>
						<Menu session={session} />
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default Header
