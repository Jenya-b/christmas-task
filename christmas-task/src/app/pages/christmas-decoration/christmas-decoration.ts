import { WFMComponent } from '../../../framework';
import { IComponent } from '../../../framework/core/component';

class AppChristmasDecoration extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appChristmasDecoration = new AppChristmasDecoration({
	selector: 'main',
	template: ``,
});
