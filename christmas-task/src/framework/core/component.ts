export interface IComponent {
	template: string;
	selector: string;
}

export class Component implements IComponent {
	template: string;
	selector: string;

	constructor(config: IComponent) {
		this.template = config.template;
		this.selector = config.selector;
	}

	render() {
		(document.querySelector(this.selector) as HTMLElement).innerHTML = this.template;
	}
}
