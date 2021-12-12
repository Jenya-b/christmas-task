import { router } from '..';
import { IComponent } from './component';

interface IData {
	num: string;
	name: string;
	count: string;
	year: string;
	shape: string;
	color: string;
	size: string;
	favorite: boolean;
	length: number;
}
type ComponentType = { render: () => void }[];
type BootstrapComponentType = { render: () => void };
export type RouteType = {
	path: string;
	component: IComponent;
}[];
export type ObjectRenderType = [object, object];
export class Module {
	components: ObjectRenderType;
	bootstrapComponent: object;
	routes: RouteType;

	constructor(config: { components: ObjectRenderType; bootstrap: object; routes: RouteType }) {
		this.components = config.components;
		this.bootstrapComponent = config.bootstrap;
		this.routes = config.routes;
	}

	start() {
		this.initComponent();
		if (this.routes) this.initRoutes();
	}

	initComponent() {
		(this.bootstrapComponent as BootstrapComponentType).render();
		(this.components as ComponentType).forEach(this.renderComponent.bind(this));
	}

	initRoutes() {
		window.addEventListener('hashchange', this.renderRoute.bind(this));
		this.renderRoute();
	}

	renderRoute() {
		const url = router.getUrl();
		const route = this.routes.find((r) => r.path === url);
		(document.querySelector(
			'dinamic-page'
		) as HTMLElement).innerHTML = `<${route?.component.selector}></${route?.component.selector}>`;
		this.renderComponent(route?.component);
		if (route?.path === 'decor') {
			this.addToysOnPage();
		}
	}

	//! необходимо изменить тип аргумента метода renderComponent()
	renderComponent(c: any) {
		c.render();
	}

	async getInfo(url: string) {
		const responce = await fetch(url);
		const data = await responce.json();
		return data as IData[];
	}

	async addToysOnPage() {
		const url = 'https://jenya-b.github.io/json/data.json';
		const data = await this.getInfo(url);
		const toysWrapper = document.querySelector('.gallery-toys__items') as HTMLElement;

		for (let i = 0; i < data.length; i++) {
			toysWrapper.append(...this.getListContent(data[i]));
		}
	}

	getListContent(data: IData): HTMLDivElement[] {
		const result = [];

		const toy = document.createElement('div');
		const name = document.createElement('h3');
		const img = document.createElement('img');
		const ul = document.createElement('ul');
		const countLi = document.createElement('li');
		const yearLi = document.createElement('li');
		const shapeLi = document.createElement('li');
		const colorLi = document.createElement('li');
		const sizeLi = document.createElement('li');
		const favoriteLi = document.createElement('li');

		toy.classList.add('gallery-toys__item', 'toy');
		name.className = 'toy__name';
		img.className = 'toy__image';
		ul.className = 'toy__list';
		countLi.className = 'toy__item';
		yearLi.className = 'toy__item';
		shapeLi.className = 'toy__item';
		colorLi.className = 'toy__item';
		sizeLi.className = 'toy__item';
		favoriteLi.className = 'toy__item';

		countLi.innerText = `Количество: ${data.count}`;
		yearLi.innerText = `Год покупки: ${data.year}`;
		shapeLi.innerText = `Форма: ${data.shape}`;
		colorLi.innerText = `Цвет: ${data.color}`;
		sizeLi.innerText = `Размер: ${data.size}`;
		if (data.favorite) {
			favoriteLi.innerText = `Любимая: да`;
		} else {
			favoriteLi.innerText = `Любимая: нет`;
		}
		img.src = `https://jenya-b.github.io/json/toys/${data.num}.png`;
		ul.append(countLi, yearLi, shapeLi, colorLi, sizeLi, favoriteLi);

		name.innerText = `${data.name}`;

		toy.append(name, img, ul);
		result.push(toy);

		return result;
	}
}
