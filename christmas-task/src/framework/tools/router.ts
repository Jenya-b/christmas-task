export const router = {
	getUrl(): string {
		return window.location.hash.slice(1);
	},
};
