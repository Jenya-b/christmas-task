import { router } from '..';
import { IComponent } from './component';
import noUiSlider, { API, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

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
			this.setInfoForButtons();
			this.addCardToysOnPage();
			this.setRangeOfInstances();
			this.setRangeOfYears();
			const inputCheckbox = document.querySelector('#like-toys') as HTMLInputElement;
			inputCheckbox.addEventListener('change', () => {
				this.filterToys();
			});
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

		type TKey = keyof typeof data;
		const arrNames = ['Количество', 'Год покупки', 'Форма', 'Цвет', 'Размер', 'Любимая'];
		const arrValues: TKey[] = ['count', 'year', 'shape', 'color', 'size', 'favorite'];

		const toy = document.createElement('div');
		const name = document.createElement('h3');
		const img = document.createElement('img');
		const ul = document.createElement('ul');

		for (let i = 0; i < arrValues.length; i++) {
			const parameterName = arrNames[i];
			const parameterValue = data[arrValues[i]];
			const li = document.createElement('li');
			li.classList.add(`toy__item`, `toy__item-${arrValues[i]}`);
			if (arrValues[i] === 'favorite') {
				if (parameterValue) {
					li.innerText = `${parameterName}: да`;
				} else {
					li.innerText = `${parameterName}: нет`;
				}
			} else {
				li.innerText = `${parameterName}: ${parameterValue}`;
			}
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

	setInfoForButtons() {
		const formButtonsWrapper = document.querySelector('.form-toys__wrapper') as HTMLElement;
		const formArr = ['ball', 'bell', 'cone', 'snowflake', 'toy'];
		const formClassName = 'form-toys';
		this.createFilterButtonsForm(formButtonsWrapper, formArr, formClassName);

		const colorButtonsWrapper = document.querySelector('.color-toys__wrapper') as HTMLElement;
		const colorArr = ['white', 'yellow', 'red', 'green', 'blue'];
		const colorClassName = 'color-toys';
		this.createFilterButtonsForm(colorButtonsWrapper, colorArr, colorClassName);

		const sizeButtonsWrapper = document.querySelector('.size-toys__wrapper') as HTMLElement;
		const sizeArr = ['big', 'average', 'little'];
		const sizeClassName = 'size-toys';
		this.createFilterButtonsForm(sizeButtonsWrapper, sizeArr, sizeClassName);
	}

	createFilterButtonsForm(parentElement: HTMLElement, arr: string[], className: string) {
		const result: HTMLElement[] = [];

		for (let i = 0; i < arr.length; i++) {
			const button = document.createElement('button');
			button.classList.add(`${className}__button`, `${className}__${arr[i]}`);
			button.id = arr[i];
			result.push(button);
		}

		parentElement.append(...result);
	}

	setRangeOfInstances() {
		const rangeSlider = document.querySelector('#count-toys-slider') as target;
		if (rangeSlider) {
			noUiSlider.create(rangeSlider, {
				start: [1, 12],
				connect: true,
				step: 1,
				range: {
					min: [1],
					max: [12],
				},
			});

			const input0 = document.querySelector('#count-range-0') as HTMLElement;
			const input1 = document.querySelector('#count-range-1') as HTMLElement;

			(<API>rangeSlider.noUiSlider).on('update', () => {
				const outputValue = rangeSlider.noUiSlider.get() as string[];
				if (outputValue) {
					input0.textContent = parseInt(outputValue[0]).toString();
					input1.textContent = parseInt(outputValue[1]).toString();
					this.filterToys();
				}
			});
		}
	}

	setRangeOfYears() {
		const rangeSlider = document.querySelector('#year-toys-slider') as target;
		if (rangeSlider) {
			noUiSlider.create(rangeSlider, {
				start: [1940, 2021],
				connect: true,
				step: 1,
				range: {
					min: [1940],
					max: [2021],
				},
			});

			const input0 = document.querySelector('#year-range-0') as HTMLElement;
			const input1 = document.querySelector('#year-range-1') as HTMLElement;

			(<API>rangeSlider.noUiSlider).on('update', () => {
				const outputValue = rangeSlider.noUiSlider.get() as string[];
				if (outputValue) {
					input0.textContent = parseInt(outputValue[0]).toString();
					input1.textContent = parseInt(outputValue[1]).toString();
					this.filterToys();
				}
			});
		}
	}

	filterToys() {
		const toys = document.querySelectorAll('.toy');
		const countList = document.querySelectorAll('.toy__item-count');
		const countLeftBorder = document.querySelector('#count-range-0') as HTMLElement;
		const countRightBorder = document.querySelector('#count-range-1') as HTMLElement;
		const arrCountBorder = [countLeftBorder.textContent as string, countRightBorder.textContent as string];
		const yearList = document.querySelectorAll('.toy__item-year');
		const yearLeftBorder = document.querySelector('#year-range-0') as HTMLElement;
		const yearRightBorder = document.querySelector('#year-range-1') as HTMLElement;
		const arrYearBorder = [yearLeftBorder.textContent as string, yearRightBorder.textContent as string];
		const favoriteToys = document.querySelectorAll('.toy__item-favorite');

		for (let i = 0; i < toys.length; i++) {
			const filterByCountToys = this.filterToysByNumber(arrCountBorder, countList[i]);
			const filterByYearToys = this.filterToysByNumber(arrYearBorder, yearList[i]);
			const filterByFavorite = this.filterByFavoriteToys(favoriteToys[i]);
			const toy = toys[i];

			if (filterByCountToys || filterByYearToys || filterByFavorite) {
				toy.classList.add('hide');
			} else {
				toy.classList.remove('hide');
			}
		}
	}

	filterToysByNumber(arr: string[], element: Element) {
		const leftBorder = Number(arr[0]);
		const rightBorder = Number(arr[1]);
		const number = Number(element.textContent?.replace(/\D/gi, ''));
		if (number < leftBorder || number > rightBorder) {
			return true;
		}
		return false;
	}

	filterByFavoriteToys(element: Element) {
		const inputCheckbox = document.querySelector('#like-toys') as HTMLInputElement;
		const value = element.textContent as string;
		const regexp = /: нет/i;

		if (inputCheckbox.checked && regexp.test(value)) {
			return true;
		}
		return false;
	}
}
