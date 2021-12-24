import { appChristmasDecoration } from './pages/christmas-decoration';
import { appChristmasTrees } from './pages/christmas-trees';
import { appHomePage } from './pages/home-page';

export const appRoutes = [
	{ path: '', component: appHomePage },
	{ path: 'decor', component: appChristmasDecoration },
	{ path: 'tree', component: appChristmasTrees },
];
