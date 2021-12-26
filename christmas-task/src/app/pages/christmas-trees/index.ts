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
						<div class="settings-game__garland-wrapper">
							<button class="settings-game__garland-item" id="green"></button>
							<button class="settings-game__garland-item" id="blue"></button>
							<button class="settings-game__garland-item" id="magenta"></button>
							<button class="settings-game__garland-item" id="orange"></button>
							<button class="settings-game__garland-item" id="multicolored"></button>
							<div class="settings-game__checkbox">  
      					<input type="checkbox" value="None" id="checkbox-color" name="check"/>
     	 					<label for="checkbox-color"></label>
    					</div>
						</div>
					</div>
				</div>
				<div class="christmas-game__place-tree">
					<div class="christmas-game__garland-wrapper">
						
					</div>
					<div class="christmas-game__tree">
						<img src="https://jenya-b.github.io/json/tree/2.png" usemap="#image-map">
						<map name="image-map">
      				<area
        				coords="252,3,200,93,164,184,130,271,107,327,92,389,67,456,29,548,18,580,23,618,121,648,174,669,245,664,323,673,411,649,469,602,490,579,364,233"
        				shape="poly"
      				/>
    				</map>
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
