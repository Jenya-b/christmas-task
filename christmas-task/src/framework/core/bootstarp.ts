type ModuleType = { start: () => void };
type EmptyObject = { [K in never]: never };

export function bootstrap(module: EmptyObject) {
	(module as ModuleType).start();
}
