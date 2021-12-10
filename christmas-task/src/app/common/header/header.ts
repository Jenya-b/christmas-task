import { IComponent } from '../../../framework/core/component';
import { WFMComponent } from '../../../framework/index';

class AppHeader extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appHeader = new AppHeader({
	selector: 'header',
	template: `
		<div class="container header__container">
			<div class="header__wrapper">
				<div class="header__logo"></div>
				<nav class="header__menu menu">
					<ul class="menu__list">
						<li class="menu__item">
							<a href="#" class="menu__link">Игрушки</a>
						</li>
						<li class="menu__item">
							<a href="#" class="menu__link">Ёлки</a>
						</li>
					</ul>
				</nav>
			</div>
			<div class="header__wrapper">
				<input type="search" class="header__search" />
				<div class="header__counter"><span>12</span></div>
			</div>
		</div>
	`,
});
