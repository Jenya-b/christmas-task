import { IComponent } from '../framework/core/component';
import { WFMComponent } from '../framework/index';

class AppComponent extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appComponent = new AppComponent({
	selector: 'app-root',
	template: `
		<div>Christmas-task</div>
	`,
});
