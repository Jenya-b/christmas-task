import { WFMComponent } from '../../../framework';
import { IComponent } from '../../../framework/core/component';

class AppChristmasDecoration extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appChristmasDecoration = new AppChristmasDecoration({
	selector: 'dinamic-page',
	template: `
	<main class="main decoration">
				<aside class="decoration__sidebar sidebar-decor">
					<ul class="sidebar-decor__list">
						<li class="sidebar-decor__item form-toys">
							<h3 class="sidebar-decor__title">Форма:</h3>
							<div class="form-toys__wrapper">
					
							</div>
						</li>
						<li class="sidebar-decor__item color-toys">
							<h3 class="sidebar-decor__title">Цвет:</h3>
							<div class="color-toys__wrapper">

							</div>
						</li>
						<li class="sidebar-decor__item size-toys">
							<h3 class="sidebar-decor__title">Размер:</h3>
							<div class="size-toys__wrapper">

							</div>
						</li>
						<li class="sidebar-decor__item">
							<h3 class="sidebar-decor__title">Колличество экземпляров:</h3>
							<div class="slider sidebar-decor__slider">
								<div class="slider__border" id="count-range-0"></div>
								<div class="slider__range" id="count-toys-slider"></div>
								<div class="slider__border" id="count-range-1"></div>
							</div>
						</li>
						<li class="sidebar-decor__item">
							<h3 class="sidebar-decor__title">Год приобретения:</h3>
							<div class="slider sidebar-decor__slider">
								<div class="slider__border" id="year-range-0"></div>
								<div class="slider__range" id="year-toys-slider"></div>
								<div class="slider__border" id="year-range-1"></div></div>
						</li>
						<li class="sidebar-decor__item like-toys">
							<h3 class="sidebar-decor__title">Только любимые:</h3>
							<input type="checkbox" class="like-toys__checkbox" id="like-toys" />
							<label for="like-toys" class="like-toys__label"></label>
						</li>
					</ul>
					<button class="settings-reset">Сбросить настройки</button>
				</aside>
				<article class="decoration__content content-decor">
					<h1 class="content-decor__title">Бабушкины украшения</h1>
					<select class="content-decor__select">
						<option value="1">По названию от «А» до «Я»</option>
						<option value="2">По названию от «Я» до «А»</option>
						<option value="3">По количеству по возрастанию</option>
						<option value="4">По количеству по убыванию</option>
					</select>
					<section class="content-decor__gallery gallery-toys">
						<h2 class="gallery-toys__title">Игрушки</h2>
						<div class="gallery-toys__items">
							<div class="gallery-toys__error-search">Поиск результатов не дал (((</div>
						</div>
					</section>
				</article>
			</main>
	`,
});
