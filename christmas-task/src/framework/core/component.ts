export interface IComponent {
	template: string;
	selector: string;
}

export class Component implements IComponent {
	template: string;
	selector: string;
	el: null | HTMLElement;

	constructor(config: IComponent) {
		this.template = config.template;
		this.selector = config.selector;
		this.el = null;
	}

	render() {
		this.el = document.querySelector(this.selector) as HTMLElement;
		if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`);
		this.el.innerHTML = this.template;
	}
}
