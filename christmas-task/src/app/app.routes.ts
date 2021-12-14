import { appChristmasDecoration } from './pages/christmas-decoration';
import { appHomePage } from './pages/home-page';

export const appRoutes = [
	{ path: '', component: appHomePage },
	{ path: 'decor', component: appChristmasDecoration },
];
