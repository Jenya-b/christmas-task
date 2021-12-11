import { appChristmasDecoration } from './pages/christmas-decoration/christmas-decoration';
import { appHomePage } from './pages/home-page/home-page';

export const appRoutes = [
	{ path: '', component: appHomePage },
	{ path: 'decor', component: appChristmasDecoration },
];
