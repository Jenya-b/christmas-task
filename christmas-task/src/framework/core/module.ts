import { router } from '..';
import { IComponent } from './component';

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
	}

	//! необходимо изменить тип аргумента метода renderComponent()
	renderComponent(c: any) {
		c.render();
	}
}
