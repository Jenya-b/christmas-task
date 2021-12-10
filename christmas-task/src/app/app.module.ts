import { ObjectRenderType } from '../framework/core/module';
import { WFMModule } from '../framework/index';
import { appComponent } from './app.component';
import { appFooter } from './common/footer/footer';
import { appHeader } from './common/header/header';

class AppModule extends WFMModule {
	constructor(config: { components: ObjectRenderType }) {
		super(config);
	}
}

export const appModule = new AppModule({
	components: [appComponent, appHeader, appFooter],
});
