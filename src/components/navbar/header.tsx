import classes from './header.module.scss'
import Menu from './menu'
import Wrapper from '../ui/wrapper'
import HeaderBackground from './headerBackground'
import Logo from '../ui/Logo'
import fetchAccount from '@/util/fetchAccount'
const Header = async () => {
	const account = await fetchAccount()
	return (
		<>
			<div className={classes.header}>
				<HeaderBackground />
				<Wrapper>
					<div className={classes.content}>
						<header>
							<Logo width="70%" />
						</header>
						<Menu account={account} />
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default Header
