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
			this.addCardToysOnPage();
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

	async addCardToysOnPage() {
		const url = 'https://jenya-b.github.io/json/data.json';
		const data = await this.getInfo(url);
		const toysWrapper = document.querySelector('.gallery-toys__items') as HTMLElement;

		for (let i = 0; i < data.length; i++) {
			toysWrapper.append(...this.getListContent(data[i]));
		}
	}

	getListContent(data: IData): HTMLElement[] {
		const result: HTMLElement[] = [];
		const list: HTMLElement[] = [];
		const numberParameters = 6;
		const cardParameters = [
			['Количество', 'Год покупки', 'Форма', 'Цвет', 'Размер', 'Любимая'],
			[data.count, data.year, data.shape, data.color, data.size, data.favorite],
		];

		const toy = document.createElement('div');
		const name = document.createElement('h3');
		const img = document.createElement('img');
		const ul = document.createElement('ul');

		for (let i = 0; i < numberParameters; i++) {
			const parameterName = cardParameters[0];
			const parameterValue = cardParameters[1];
			const li = document.createElement('li');
			li.classList.add('toy__item');
			li.innerText = `${parameterName[i]}: ${parameterValue[i]}`;
			list.push(li);
		}

		toy.classList.add('gallery-toys__item', 'toy');
		name.className = 'toy__name';
		img.className = 'toy__image';
		ul.className = 'toy__list';
		img.src = `https://jenya-b.github.io/json/toys/${data.num}.png`;
		name.innerText = data.name;
		ul.append(...list);
		toy.append(name, img, ul);
		result.push(toy);

		return result;
	}
}
