import { ObjectRenderType, RouteType } from '../framework/core/module';
import { WFMModule } from '../framework/index';
import { appComponent } from './app.component';
import { appRoutes } from './app.routes';
import { appFooter } from './common/footer/footer';
import { appHeader } from './common/header/header';

class AppModule extends WFMModule {
	constructor(config: { components: ObjectRenderType; bootstrap: object; routes: RouteType }) {
		super(config);
	}
}

export const appModule = new AppModule({
	components: [appHeader, appFooter],
	bootstrap: appComponent,
	routes: appRoutes,
});
