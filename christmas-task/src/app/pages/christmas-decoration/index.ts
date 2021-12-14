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
								<button></button>
								<button></button>
								<button></button>
								<button></button>
								<button></button>
							</div>
						</li>
						<li class="sidebar-decor__item color-toys">
							<h3 class="sidebar-decor__title">Цвет:</h3>
							<div class="color-toys__wrapper">
								<button></button>
								<button></button>
								<button></button>
								<button></button>
								<button></button>
							</div>
						</li>
						<li class="sidebar-decor__item size-toys">
							<h3 class="sidebar-decor__title">Размер:</h3>
							<div class="size-toys__wrapper">
								<button></button>
								<button></button>
								<button></button>
							</div>
						</li>
						<li class="sidebar-decor__item count-toys">
							<h3 class="sidebar-decor__title">Колличество экземпляров:</h3>
							<div class="count-toys__wrapper"></div>
						</li>
						<li class="sidebar-decor__item year-toys">
							<h3 class="sidebar-decor__title">Год приобретения:</h3>
							<div class="year-toys__wrapper"></div>
						</li>
						<li class="sidebar-decor__item like-toys">
							<h3 class="sidebar-decor__title">Только любимые:</h3>
							<input type="checkbox" />
						</li>
					</ul>
					<button>Сбросить настройки</button>
				</aside>
				<article class="decoration__content content-decor">
					<h1 class="content-decor__title">Бабушкины украшения</h1>
					<select class="content-decor__select">
						<option>Пункт 1</option>
						<option>Пункт 2</option>
					</select>
					<section class="content-decor__gallery gallery-toys">
						<h2 class="gallery-toys__title">Игрушки</h2>
						<div class="gallery-toys__items">
							
						</div>
					</section>
				</article>
			</main>
	`,
});
