import { WFMModule } from '../framework/index';
import { appComponent } from './app.component';

class AppModule extends WFMModule {
	constructor(config: { components: [key: object] }) {
		super(config);
	}
}

export const appModule = new AppModule({
	components: [appComponent],
});
