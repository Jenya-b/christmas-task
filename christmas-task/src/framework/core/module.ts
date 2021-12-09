type componentType = { render: () => void }[];

export class Module {
	components: [key: object];

	constructor(config: { components: [key: object] }) {
		this.components = config.components;
	}

	start() {
		this.initComponent();
	}

	initComponent() {
		(this.components as componentType).forEach((c) => c.render());
	}
}
