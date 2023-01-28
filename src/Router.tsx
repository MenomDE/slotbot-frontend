import {RouteObject} from 'react-router-dom';
import {eventRoutes} from './features/event/EventRoutes';
import {profileRoutes} from './features/profile/ProfileRoutes';
import {adminRoutes} from './features/admin/AdminRoutes';
import {notFoundRoute} from './features/error/ErrorRoutes';
import {NotAllowed} from './features/error/NotAllowed';
import {guildRoutes} from './features/guilds/GuildRoutes';
import {GuildsPage} from './features/guilds/GuildsPage';

export const routes: RouteObject[] = [
	{
		path: 'events/*',
		children: eventRoutes,
	},
	{
		path: 'profile/*',
		children: profileRoutes,
	},
	{
		path: 'guilds/*',
		element: <GuildsPage/>,
		children: guildRoutes,
	},
	{
		path: 'admin/*',
		children: adminRoutes,
	},
	{
		path: '403',
		element: <NotAllowed/>,
	},
	notFoundRoute,
];
