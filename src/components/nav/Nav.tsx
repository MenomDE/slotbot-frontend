import {AppShell, Box, Container, createStyles, Footer, Group, Header, MediaQuery} from '@mantine/core';
import {Logo} from '../logo/Logo';
import {faArrowRightToBracket, faCalendarDay, faUsers} from '@fortawesome/free-solid-svg-icons';
import {NavIconAction, NavIconLink} from './NavIcon';
import {ThemeSwitch} from '../ThemeSwitch';
import {UserMenu} from './UserMenu';
import {useAuth} from '../../contexts/authentication/AuthProvider';
import {PageFooter} from '../PageFooter/PageFooter';
import {useFavicon} from '@mantine/hooks';
import ambFavicon from './favicon/favicon-amb.ico';
import daaFavicon from './favicon/favicon-daa.ico';
import tttFavicon from './favicon/favicon-ttt.ico';
import {getGuild, Guild} from '../../contexts/Theme';
import {JSX, PropsWithChildren} from 'react';
import {hidden} from '../../contexts/CommonStylings';

const useStyles = createStyles(() => ({
	inner: {
		height: NAV_HEIGHT,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

type NavProps = {
	navbar?: JSX.Element
};
export const NAV_HEIGHT = 80;
export const FOOTER_HEIGHT = 150;

export function Nav(props: Readonly<PropsWithChildren<NavProps>>): JSX.Element {
	const {classes} = useStyles();

	const guild = getGuild();
	let favicon;
	if (guild === Guild.AMB) {
		favicon = ambFavicon;
	} else if (guild === Guild.DAA) {
		favicon = daaFavicon;
	} else if (guild === Guild.TTT) {
		favicon = tttFavicon;
	}
	favicon && useFavicon(favicon);

	const {user, login} = useAuth();

	return (
		<AppShell
			header={
				<Header height={NAV_HEIGHT} withBorder={false}>
					<Container className={classes.inner}>
						<Logo/>
						<Box styles={{alignSelf: 'flex-end'}}>
							<Group noWrap spacing={'xs'}>
								<MediaQuery smallerThan={'xs'} styles={hidden}>
									<NavIconLink link={'/guilds'} text={'nav.guilds'} icon={faUsers}
												 width={135}/>
								</MediaQuery>
								<MediaQuery smallerThan={'xs'} styles={hidden}>
									<NavIconLink link={'/events'} text={'nav.calendar'} icon={faCalendarDay}
												 width={110}/>
								</MediaQuery>
								{(user) ?
									<UserMenu user={user}/>
									:
									<>
										<NavIconAction onClick={login} text={'nav.login'} icon={faArrowRightToBracket}
													   width={90}/>
										<ThemeSwitch/>
									</>
								}
							</Group>
						</Box>
					</Container>
				</Header>
			}
			navbar={props.navbar}
			footer={
				<Footer height={0} withBorder={false} sx={{position: 'unset'}}>
					<PageFooter/>
				</Footer>
			}
			layout={'alt'}
			sx={{main: {minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`}}}>
			{props.children}
		</AppShell>
	);
}
