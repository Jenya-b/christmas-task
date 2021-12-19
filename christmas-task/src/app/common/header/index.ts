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
				<a href="#" class="header__logo"></a>
				<nav class="header__menu menu">
					<ul class="menu__list">
						<li class="menu__item">
							<a href="#decor" class="menu__link">Игрушки</a>
						</li>
						<li class="menu__item">
							<a href="#tree" class="menu__link">Ёлки</a>
						</li>
					</ul>
				</nav>
			</div>
			<div class="header__wrapper">
				<input type="search" class="header__search" placeholder="Поиск" autocomplete="off" />
				<div class="header__counter"><span>0</span></div>
			</div>
		</div>
	`,
});
