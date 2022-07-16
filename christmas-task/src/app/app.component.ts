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
		<header class="header"></header>
		<dinamic-page></dinamic-page>
		<div class="pop-up-warning">Извините, все слоты заполнены</div>
		<footer class="footer"></footer>
	`,
	render() {
		return;
	},
});
