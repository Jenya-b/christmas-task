type moduleType = { start: () => void };
type EmptyObject = { [K in never]: never };

export function bootstrap(module: EmptyObject) {
	console.log(module);

	(module as moduleType).start();
}
