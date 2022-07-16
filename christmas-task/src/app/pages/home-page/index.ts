import { WFMComponent } from '../../../framework';
import { IComponent } from '../../../framework/core/component';

class AppHomePage extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appHomePage = new AppHomePage({
	selector: 'dinamic-page',
	template: `
		<div class="home-page">
			<div class="home-page__info-block">
				<h1 class="home-page__title">Новогодняя игра <br>«Наряди ёлку»</h1>
				<a href="#decor" class="home-page__button">Начать</a>
			</div>
			<div class="home-page__decor-block">
				<div class="home-page__big-ball home-page__ball"></div>
				<div class="home-page__little-ball home-page__ball"></div>
			</div>
		</div>
	`,
	render() {
		return;
	},
});
