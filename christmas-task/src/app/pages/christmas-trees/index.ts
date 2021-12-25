import { WFMComponent } from '../../../framework';
import { IComponent } from '../../../framework/core/component';

class AppChristmasTrees extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appChristmasTrees = new AppChristmasTrees({
	selector: 'dinamic-page',
	template: `
			<main class="christmas-game">
				<div class="christmas-game__settings settings-game">
					<div class="settings-game__snow-audio-container">
						<div class="settings-game__audio"></div>
						<div class="settings-game__snow"></div>
					</div>
					<div class="settings-game__trees">
						<div class="settings-game__title">Выберите ёлку</div>
						<div class="settings-game__trees-wrapper">
							
						</div>
					</div>
					<div class="settings-game__background">
						<div class="settings-game__title">Выберите фон</div>
						<div class="settings-game__background-wrapper">
							
						</div>
					</div>
					<div class="settings-game__garland">
						<div class="settings-game__title">Гирлянда</div>
						<div class="settings-game__garland-wrapper"></div>
					</div>
				</div>
				<div class="christmas-game__place-tree">
					<div class="christmas-game__garland-wrapper">
						
					</div>
					<div class="christmas-game__tree">
						<img src="https://jenya-b.github.io/json/tree/2.png">
					</div>
				</div>
				<div class="christmas-game__prepared-decorations prepared-decorations">
					<div class="prepared-decorations__toys">
						<div class="prepared-decorations__title">Игрушки</div>
						<div class="prepared-decorations__toys-wrapper">
							
						</div>
					</div>
					<div class="prepared-decorations__trees">
						<div class="prepared-decorations__title">Вы нарядили</div>
						<div class="prepared-decorations__trees-wrapper"></div>
					</div>
				</div>
			</main>
	`,
});
