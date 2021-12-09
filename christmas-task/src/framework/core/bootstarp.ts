type moduleType = { start: () => void };

export function bootstrap(module: {}) {
	(module as moduleType).start();
}
