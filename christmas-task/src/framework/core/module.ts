type ComponentType = { render: () => void }[];
export type ObjectRenderType = [object, object, object];
export class Module {
	components: ObjectRenderType;

	constructor(config: { components: ObjectRenderType }) {
		this.components = config.components;
	}

	start() {
		this.initComponent();
	}

	initComponent() {
		(this.components as ComponentType).forEach((c) => c.render());
	}
}
