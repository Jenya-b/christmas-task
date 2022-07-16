import { router } from '..';
import { IComponent } from './component';
import noUiSlider, { API, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

let dragX = 0;
let dragY = 0;
const audio = new Audio();
audio.src = 'https://jenya-b.github.io/json/audio/audio.mp3';
audio.loop = true;
audio.autoplay = true;

let storageToys: Set<number> = new Set();
if (localStorage.getItem('toysFavorite')) {
	const toysFavoriteItem = localStorage.getItem('toysFavorite');
	if (toysFavoriteItem) storageToys = new Set(JSON.parse(toysFavoriteItem));
}
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
type TObjFilterButton = {
	[key: string]: string;
};

enum SortEnum {
	nameFromMinToMax = '1',
	nameFromMaxToMin = '2',
	yearFromMinToMax = '3',
	yearFromMaxToMin = '4',
}

enum PageSections {
	decor = 'decor',
	tree = 'tree',
}

enum Colour {
	blue = 'blue',
	magenta = 'magenta',
	orange = 'orange',
	green = 'green',
	multicolored = 'multicolored',
}
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
		(this.components as ComponentType).forEach(this.renderComponent as () => void);
	}

	initRoutes() {
		window.addEventListener('hashchange', this.renderRoute.bind(this));
		this.renderRoute();
	}

	renderRoute() {
		const url = router.getUrl();
		const route = this.routes.find((r) => r.path === url);
		const dinamicPage = document.querySelector('dinamic-page');
		if (dinamicPage) {
			dinamicPage.innerHTML = `<${route?.component.selector}></${route?.component.selector}>`;
		}
		this.renderComponent(route!.component);

		const inputSearch: HTMLInputElement | null = document.querySelector('.header__search');
		if (inputSearch) inputSearch.focus();

		if (route?.path === PageSections.decor) {
			this.setInfoForButtons();
			this.addCardToysOnPage();
			this.setRangeOfInstances();
			this.setRangeOfYears();
			this.addEventsForToys();
		}

		if (route?.path === PageSections.tree) {
			this.addTreesOnPage();
			this.addBackgroundImageOptions();
			this.addToysFromFavorites();
			this.addEventsForTrees();
			this.getStorageSettings();
		}
	}

	//! необходимо изменить тип аргумента метода renderComponent()
	renderComponent = (c: IComponent) => {
		c.render();
	};

	getStorageSettings() {
		const snowBtn = document.querySelector('.settings-game__snow');
		const snow = document.querySelector('.christmas-game__tree');
		const snowItem = localStorage.getItem('snow');

		if (snowItem && snow && snowBtn) {
			snow.className = snowItem;
			snowBtn.className = snowItem;
		}
	}

	async getInfo() {
		const url = 'https://jenya-b.github.io/json/data.json';
		const responce = await fetch(url);
		const data: IData[] = await responce.json();
		return data;
	}

	async addCardToysOnPage() {
		const data = await this.getInfo();
		const toysWrapper = document.querySelector('.gallery-toys__items');
		const arrFavoritToys: number[] = [...storageToys];
		addNumberFavoriteToys(arrFavoritToys);

		for (let i = 0; i < data.length; i++) {
			if (toysWrapper) {
				toysWrapper.append(...this.getListContent(data[i], i, arrFavoritToys));
			}
		}
		setTimeout(() => this.sortAlphabetically(-1, 1));
		setTimeout(this.addToysToFavorites, 100);
		setTimeout(this.findOnTheCardPage, 100);
	}

	getListContent(data: IData, numElement: number, arrFavoritToys: number[]): HTMLElement[] {
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
			const fav = 'favorite';
			li.classList.add(`toy__item`, `toy__item-${arrValues[i]}`);
			if (arrValues[i] === fav) {
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

		toy.id = `${numElement}`;
		toy.classList.add('gallery-toys__item', 'toy');
		if (arrFavoritToys.includes(+toy.id)) toy.classList.add('active');

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

	addEventsForToys() {
		const inputCheckbox = document.querySelector('#like-toys');
		if (inputCheckbox) {
			inputCheckbox.addEventListener('change', this.filterToys.bind(this));
		}

		const formToyButtons = document.querySelectorAll('.form-toys__button');
		formToyButtons.forEach((el) => {
			el.addEventListener('click', (e) => this.addActiveStyle(e.target as EventTarget));
		});

		const colorToyButtons = document.querySelectorAll('.color-toys__button');
		colorToyButtons.forEach((el) => {
			el.addEventListener('click', (e) => this.addActiveStyle(e.target as EventTarget));
		});

		const sizeToyButtons = document.querySelectorAll('.size-toys__button');
		sizeToyButtons.forEach((el) => {
			el.addEventListener('click', (e) => this.addActiveStyle(e.target as EventTarget));
		});

		const buttonSettingsReset = document.querySelector('.settings-reset');
		if (buttonSettingsReset) {
			buttonSettingsReset.addEventListener('click', this.resetFilters.bind(this));
		}

		const select = document.querySelector('.content-decor__select');
		if (select) {
			select.addEventListener('change', (e) => this.setDataForSorting(e));
		}
	}

	addEventsForTrees() {
		const treeList = document.querySelectorAll('.settings-game__trees-item');
		treeList.forEach((el) => {
			el.addEventListener('click', (e) => this.chooseTreeForDecoration(e));
		});

		const bgImageList = document.querySelectorAll('.settings-game__background-item');
		bgImageList.forEach((el) => {
			el.addEventListener('click', (e) => this.chooseBackgroundPicture(e));
		});

		const snowBtn = document.querySelector('.settings-game__snow');
		snowBtn?.addEventListener('click', (e) => this.addSnow(e));

		const audioBtn = document.querySelector('.settings-game__audio');
		audioBtn?.addEventListener('click', this.addAudio);

		this.addGarlands();

		const btnGarland = document.querySelectorAll('.settings-game__garland-item');
		btnGarland.forEach((el) => {
			el.addEventListener('click', (e) => this.addColorGarlands(e));
		});

		const checkboxColor = document.querySelector('#checkbox-color');
		checkboxColor?.addEventListener('change', (e) => {
			const garlandWrapper = document.querySelector('.christmas-game__garland-wrapper');
			const element = e.target as HTMLInputElement;

			if (element.checked) garlandWrapper?.classList.add('hide');
			else garlandWrapper?.classList.remove('hide');
		});
	}

	chooseTreeForDecoration(e: Event) {
		const element = e.currentTarget as HTMLElement;
		const num = element.id.replace(/\D/gi, '');
		const img: HTMLImageElement | null = document.querySelector('.christmas-game__tree img');
		const url = 'https://jenya-b.github.io/json/tree';

		if (img) {
			img.src = `${url}/${num}.png`;
		}
	}

	chooseBackgroundPicture(e: Event) {
		const element = e.currentTarget as HTMLElement;
		const num = element.id.replace(/\D/gi, '');
		const bg: HTMLElement | null = document.querySelector('.christmas-game__place-tree');
		const url = 'https://jenya-b.github.io/json/bg';

		if (bg) {
			bg.style.backgroundImage = `url(${url}/${num}.jpg)`;
		}
	}

	addSnow(e: Event) {
		const btn = e.target as HTMLElement;
		const block: HTMLElement | null = document.querySelector('.christmas-game__tree');

		if (block?.classList.contains('snow') && block) {
			btn.classList.remove('active');
			block.classList.remove('snow');
		} else if (block) {
			btn.classList.add('active');
			block.classList.add('snow');
		}
		if (block) {
			localStorage.setItem('snow', block.className);
			localStorage.setItem('snowBtn', btn.className);
		}
	}

	addAudio() {
		const btn = document.querySelector('.settings-game__audio');

		if (audio.paused && btn) {
			btn.classList.add('active');
			audio.play();
		} else if (btn) {
			btn.classList.remove('active');
			audio.pause();
		}

		if (btn) {
			localStorage.setItem('audioBtn', btn.className);
		}
	}

	addGarlands() {
		const garlandWrapper = document.querySelector('.christmas-game__garland-wrapper');
		const arrResult: HTMLElement[] = [];
		const numberLine = 8;
		const num = 4;
		let count = 5;

		for (let i = 0; i < numberLine; i++) {
			const arrLi: HTMLElement[] = [];
			const ul = document.createElement('ul');
			ul.classList.add('christmas-game__lightrope');

			for (let j = 0; j < count; j++) {
				const li = document.createElement('li');
				li.style.transform = `rotate(85deg) translate(${j}px) rotate(-5deg)`;
				arrLi.push(li);
			}

			ul.append(...arrLi);
			arrResult.push(ul);
			count += num;
		}

		garlandWrapper?.append(...arrResult);
	}

	addColorGarlands(e: Event) {
		const element = e.target as HTMLElement;
		const garlandsList = document.querySelectorAll('.christmas-game__lightrope li');
		let color: string;

		if (element.id === Colour.blue) color = Colour.blue;
		else if (element.id === Colour.magenta) color = Colour.magenta;
		else if (element.id === Colour.orange) color = Colour.orange;
		else if (element.id === Colour.green) color = Colour.green;
		else if (element.id === Colour.multicolored) color = 'active';

		garlandsList.forEach((el) => {
			el.className = color;
		});
	}

	hangToysOnTheTree() {
		const toys = document.querySelectorAll('.prepared-decorations__toys-image-wrapper img');
		const tree = document.querySelector('area');
		let element: HTMLElement;

		toys.forEach((el) => {
			el.addEventListener('dragstart', (e) => {
				element = el as HTMLElement;
				const event = e as DragEvent;
				dragX = event.clientX;
				dragY = event.clientY;
			});
		});

		tree?.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		tree?.addEventListener('drop', (e) => {
			const nextSibling = element.parentElement?.nextSibling as HTMLElement;
			let count = +nextSibling.innerText;

			element.style.left = `${+element.style.left.split('px')[0] + (e.clientX - dragX)}px`;
			element.style.top = `${+element.style.top.split('px')[0] + (e.clientY - dragY)}px`;

			if (count && !element.classList.contains('out')) {
				element.classList.add('out');
				nextSibling.textContent = `${--count}`;
			}
		});

		document.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		document.addEventListener('drop', (e) => {
			const target = e.target as HTMLElement;

			if (target != tree && target != element) {
				const nextSibling = element.parentElement?.nextSibling as HTMLElement;
				let count = +nextSibling.innerText;
				nextSibling.textContent = `${++count}`;

				element.style.left = `0px`;
				element.style.top = `0px`;
				element.classList.remove('out');
			}
		});
	}

	setInfoForButtons() {
		const formButtonsWrapper: HTMLElement | null = document.querySelector('.form-toys__wrapper');
		const formArr = ['ball', 'bell', 'cone', 'toy', 'snowflake'];
		const formClassName = 'form-toys';
		if (formButtonsWrapper) {
			this.createFilterButtonsForm(formButtonsWrapper, formArr, formClassName);
		}

		const colorButtonsWrapper: HTMLElement | null = document.querySelector('.color-toys__wrapper');
		const colorArr = ['white', 'yellow', 'red', 'green', 'blue'];
		const colorClassName = 'color-toys';
		if (colorButtonsWrapper) {
			this.createFilterButtonsForm(colorButtonsWrapper, colorArr, colorClassName);
		}

		const sizeButtonsWrapper: HTMLElement | null = document.querySelector('.size-toys__wrapper');
		const sizeArr = ['big', 'average', 'little'];
		const sizeClassName = 'size-toys';
		if (sizeButtonsWrapper) {
			this.createFilterButtonsForm(sizeButtonsWrapper, sizeArr, sizeClassName);
		}
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
		const rangeSlider: target | null = document.querySelector('#count-toys-slider');
		const input0: HTMLElement | null = document.querySelector('#count-range-0');
		const input1: HTMLElement | null = document.querySelector('#count-range-1');
		const min = 1;
		const max = 12;
		if (rangeSlider && input0 && input1) {
			this.setRange(rangeSlider, input0, input1, min, max);
		}
	}

	setRangeOfYears() {
		const rangeSlider: target | null = document.querySelector('#year-toys-slider');
		const input0: HTMLElement | null = document.querySelector('#year-range-0');
		const input1: HTMLElement | null = document.querySelector('#year-range-1');
		const min = 1940;
		const max = 2021;
		if (rangeSlider && input0 && input1) {
			this.setRange(rangeSlider, input0, input1, min, max);
		}
	}

	setRange(rangeSlider: target, input0: HTMLElement, input1: HTMLElement, min: number, max: number) {
		if (rangeSlider) {
			noUiSlider.create(rangeSlider, {
				start: [min, max],
				connect: true,
				step: 1,
				range: {
					min: [min],
					max: [max],
				},
			});

			(<API>rangeSlider.noUiSlider).on('update', () => {
				const outputValue = rangeSlider.noUiSlider.get() as string[];
				if (outputValue) {
					input0.textContent = parseInt(outputValue[0]).toString();
					input1.textContent = parseInt(outputValue[1]).toString();
					this.filterToys();
				}
			});
		}
		const buttonSettingsReset = document.querySelector('.settings-reset');
		if (buttonSettingsReset) {
			buttonSettingsReset.addEventListener('click', () => {
				rangeSlider.noUiSlider.reset();
			});
		}
	}

	filterToys() {
		const toys = document.querySelectorAll('.toy');
		const countList = document.querySelectorAll('.toy__item-count');
		const countLeftBorder = document.querySelector('#count-range-0');
		const countRightBorder = document.querySelector('#count-range-1');
		let arrCountBorder: string[] = [];
		if (countLeftBorder && countRightBorder) {
			arrCountBorder = [countLeftBorder.textContent as string, countRightBorder.textContent as string];
		}
		const yearList = document.querySelectorAll('.toy__item-year');
		const yearLeftBorder = document.querySelector('#year-range-0');
		const yearRightBorder = document.querySelector('#year-range-1');
		let arrYearBorder: string[] = [];
		if (yearLeftBorder && yearRightBorder) {
			arrYearBorder = [yearLeftBorder.textContent as string, yearRightBorder.textContent as string];
		}
		const favoriteToys = document.querySelectorAll('.toy__item-favorite');
		const shapeToys = document.querySelectorAll('.toy__item-shape');
		const colorToys = document.querySelectorAll('.toy__item-color');
		const sizeToys = document.querySelectorAll('.toy__item-size');
		let count = 0;

		for (let i = 0; i < toys.length; i++) {
			const filterByCountToys = this.filterToysByNumber(arrCountBorder, countList[i]);
			const filterByYearToys = this.filterToysByNumber(arrYearBorder, yearList[i]);
			const filterByFavorite = this.filterByFavoriteToys(favoriteToys[i]);
			const filterShape = this.filterShapeToy(shapeToys[i]);
			const filterColor = this.filterColorToy(colorToys[i]);
			const filterSize = this.filterSizeToy(sizeToys[i]);
			const toy = toys[i];

			if (filterByCountToys || filterByYearToys || filterByFavorite || !filterShape || !filterColor || !filterSize) {
				toy.classList.add('hide');
			} else {
				toy.classList.remove('hide');
				count++;
			}
		}

		if (toys.length) displayWarning(count);
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
		const inputCheckbox: HTMLInputElement | null = document.querySelector('#like-toys');
		const value = element.textContent;
		const regexp = /: нет/i;

		if (inputCheckbox && value && inputCheckbox.checked && regexp.test(value)) {
			return true;
		}
		return false;
	}

	addActiveStyle(e: EventTarget) {
		const element = e as HTMLElement;
		element.classList.toggle('active');
		this.filterToys();
	}

	filterShapeToy(elementShape: Element) {
		const formToyButtons = document.querySelectorAll('.form-toys__button');
		const obj: TObjFilterButton = {
			ball: 'шар',
			bell: 'колокольчик',
			cone: 'шишка',
			snowflake: 'снежинка',
			toy: 'фигурка',
		};
		const regexp = /шар|колокольчик|шишка|снежинка|фигурка/gi;

		const booleanValue = this.getFilterValue(elementShape, regexp, formToyButtons, obj);
		return booleanValue;
	}

	filterColorToy(elementColor: Element) {
		const colorToyButtons = document.querySelectorAll('.color-toys__button');
		const obj: TObjFilterButton = {
			white: 'белый',
			yellow: 'желтый',
			red: 'красный',
			green: 'зелёный',
			blue: 'синий',
		};
		const regexp = /белый|желтый|красный|зелёный|синий/gi;

		const booleanValue = this.getFilterValue(elementColor, regexp, colorToyButtons, obj);
		return booleanValue;
	}

	filterSizeToy(elementSize: Element) {
		const sizeToyButtons = document.querySelectorAll('.size-toys__button');
		const obj: TObjFilterButton = {
			big: 'большой',
			average: 'средний',
			little: 'малый',
		};
		const regexp = /большой|средний|малый/gi;

		const booleanValue = this.getFilterValue(elementSize, regexp, sizeToyButtons, obj);
		return booleanValue;
	}

	getFilterValue(element: Element, regexp: RegExp, buttons: NodeListOf<Element>, obj: TObjFilterButton) {
		const elementInfo = element.textContent?.match(regexp)?.join('');
		let a = 0;

		for (let i = 0; i < buttons.length; i++) {
			const button = buttons[i];
			if (button.classList.contains('active') && obj[button.id] === elementInfo) {
				return true;
			} else if (!button.classList.contains('active')) {
				a++;
			}
		}
		if (a === buttons.length) return true;
		return false;
	}

	resetFilters() {
		const formToyButtons = document.querySelectorAll('.form-toys__button');
		const colorToyButtons = document.querySelectorAll('.color-toys__button');
		const sizeToyButtons = document.querySelectorAll('.size-toys__button');
		const inputCheckbox: HTMLInputElement | null = document.querySelector('#like-toys');

		formToyButtons.forEach((el) => this.resetActiveClass(el));
		colorToyButtons.forEach((el) => this.resetActiveClass(el));
		sizeToyButtons.forEach((el) => this.resetActiveClass(el));
		if (inputCheckbox) inputCheckbox.checked = false;

		this.filterToys();
	}

	resetActiveClass(el: Element) {
		el.classList.remove('active');
	}

	setDataForSorting(e: Event) {
		const element = e.target as HTMLInputElement;

		if (element.value === SortEnum.nameFromMinToMax) this.sortAlphabetically(-1, 1);
		else if (element.value === SortEnum.nameFromMaxToMin) this.sortAlphabetically(1, -1);
		else if (element.value === SortEnum.yearFromMinToMax) this.sortbyYear(-1, 1);
		else if (element.value === SortEnum.yearFromMaxToMin) this.sortbyYear(1, -1);
	}

	sortAlphabetically(x: number, y: number) {
		const toys = document.querySelectorAll('div.gallery-toys__item');
		const itemsArray: Element[] = [];
		const parent: ParentNode | null = toys[0].parentNode;

		for (let i = 0; i < toys.length; i++) {
			if (parent) itemsArray.push(parent.removeChild(toys[i]));
		}

		itemsArray
			.sort((a: Element, b: Element): number => {
				const textA = a.querySelector('h3.toy__name')?.textContent;
				const textB = b.querySelector('h3.toy__name')?.textContent;
				if (textA && textB && textA < textB) return x;
				if (textA && textB && textA > textB) return y;
				return 0;
			})
			.forEach((node) => {
				if (parent) parent.appendChild(node);
			});
	}

	sortbyYear(x: number, y: number) {
		const toys = document.querySelectorAll('div.gallery-toys__item');
		const itemsArray: Element[] = [];
		const parent: ParentNode | null = toys[0].parentNode;

		for (let i = 0; i < toys.length; i++) {
			if (parent) itemsArray.push(parent.removeChild(toys[i]));
		}

		itemsArray
			.sort((a: Element, b: Element): number => {
				const textA = a.querySelector('li.toy__item-year')?.textContent?.replace(/\D/gi, '');
				const textB = b.querySelector('li.toy__item-year')?.textContent?.replace(/\D/gi, '');
				if (textA && textB && textA < textB) return x;
				if (textA && textB && textA > textB) return y;
				return 0;
			})
			.forEach((node) => {
				if (parent) parent.appendChild(node);
			});
	}

	addToysToFavorites() {
		const toyList = document.querySelectorAll('.gallery-toys__item');
		const headerCounter: HTMLElement | null = document.querySelector('.header__counter span');
		const popUpWarning = document.querySelector('.pop-up-warning');
		let count = 0;
		if (headerCounter) {
			const headerCounterContent = headerCounter.textContent;
			if (headerCounterContent) count = +headerCounterContent;
		}

		toyList.forEach((el) => {
			el.addEventListener('click', (e) => {
				const element = e.currentTarget as HTMLElement;
				const elementNum = +element.id;
				const maxValue = 20;

				if (!element.classList.contains('active') && count < maxValue) {
					element.classList.add('active');
					count++;
					storageToys.add(elementNum);
				} else if (element.classList.contains('active')) {
					element.classList.remove('active');
					count--;
					storageToys.delete(elementNum);
				} else if (popUpWarning && count === maxValue) {
					popUpWarning.classList.add('active');
					setTimeout(() => popUpWarning.classList.remove('active'), 2000);
				}

				if (headerCounter) {
					headerCounter.innerText = String(count);
				}
				localStorage.setItem('toysFavorite', JSON.stringify([...storageToys]));
			});
		});
	}

	findOnTheCardPage() {
		const inputSearch: HTMLElement | null = document.querySelector('.header__search');

		if (inputSearch) {
			inputSearch.addEventListener('keyup', setTheDisplayOfCards);
			inputSearch.addEventListener('search', setTheDisplayOfCards);
		}

		function setTheDisplayOfCards(e: KeyboardEvent | Event) {
			const toys = document.querySelectorAll('div.gallery-toys__item');
			const nameToys = document.querySelectorAll('h3.toy__name');

			const element = e.target as HTMLInputElement;
			const value = element.value.toUpperCase();
			const regexp = new RegExp(value);
			let count = 0;

			for (let i = 0; i < nameToys.length; i++) {
				const element = nameToys[i];
				const elementText = element.textContent?.toUpperCase();

				if (elementText && elementText.match(regexp)?.input) {
					toys[i].classList.remove('hide-search');
					count++;
				} else {
					toys[i].classList.add('hide-search');
				}
			}

			displayWarning(count);
		}
	}

	addTreesOnPage() {
		const treesWrapper = document.querySelector('.settings-game__trees-wrapper');
		const treeArray: HTMLElement[] = [];
		const url = 'https://jenya-b.github.io/json/tree';
		const countTrees = 6;

		for (let i = 1; i <= countTrees; i++) {
			const treesItem = document.createElement('div');
			treesItem.classList.add('settings-game__trees-item');
			treesItem.id = `trees-item-${i}`;
			const img = document.createElement('img');
			img.src = `${url}/${i}.png`;
			treesItem.append(img);
			treeArray.push(treesItem);
		}

		treesWrapper?.append(...treeArray);
		setTimeout(this.hangToysOnTheTree, 1000);
	}

	addBackgroundImageOptions() {
		const backgroundImagesWrapper = document.querySelector('.settings-game__background-wrapper');
		const backgroundImagesArray: HTMLElement[] = [];
		const url = 'https://jenya-b.github.io/json/bg';
		const countBackgroundImages = 10;

		for (let i = 1; i <= countBackgroundImages; i++) {
			const backgroundItem = document.createElement('div');
			backgroundItem.classList.add('settings-game__background-item');
			backgroundItem.id = `background-item-${i}`;
			const img = document.createElement('img');
			img.src = `${url}/${i}.jpg`;
			backgroundItem.append(img);
			backgroundImagesArray.push(backgroundItem);
		}

		backgroundImagesWrapper?.append(...backgroundImagesArray);
	}

	async addToysFromFavorites() {
		const data = await this.getInfo();
		const wrapper = document.querySelector('.prepared-decorations__toys-wrapper');
		const arr: HTMLElement[] = [];
		const url = 'https://jenya-b.github.io/json/toys';
		const arrFavoritToys: number[] = [...storageToys];
		addNumberFavoriteToys(arrFavoritToys);

		const count = arrFavoritToys.length || 20;

		for (let i = 1; i <= count; i++) {
			const item = document.createElement('div');
			item.classList.add('prepared-decorations__toys-item');
			item.id = `toys-item-${i}`;

			const num = document.createElement('div');
			num.classList.add('prepared-decorations__toys-item-count');

			if (arrFavoritToys.length) {
				num.innerText = `${data[arrFavoritToys[i - 1]].count}`;
			} else num.innerText = `${data[i].count}`;

			const imgWrapper = document.createElement('div');
			imgWrapper.classList.add('prepared-decorations__toys-image-wrapper');

			if (arrFavoritToys.length) {
				imgWrapper.append(...addImage(data, arrFavoritToys[i - 1]));
			} else {
				imgWrapper.append(...addImage(data, i));
			}

			item.append(imgWrapper, num);
			arr.push(item);
		}

		wrapper?.append(...arr);

		function addImage(data: IData[], n: number) {
			const arr: HTMLElement[] = [];
			const count = +data[n].count;

			for (let i = 1; i <= count; i++) {
				const img = document.createElement('img');
				img.src = `${url}/${n + 1}.png`;
				arr.push(img);
			}

			return arr;
		}
	}
}

function displayWarning(count: number) {
	const infoText = document.querySelector('.gallery-toys__error-search');

	if (!count && infoText) {
		infoText.classList.add('hide');
	} else if (infoText) {
		infoText.classList.remove('hide');
	}
}

function addNumberFavoriteToys(arrFavoritToys: number[]) {
	const toysCounter: HTMLElement | null = document.querySelector('.header__counter span');
	if (toysCounter) {
		toysCounter.innerText = `${arrFavoritToys.length}`;
	}
}
