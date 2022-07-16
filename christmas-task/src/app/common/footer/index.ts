import { IComponent } from '../../../framework/core/component';
import { WFMComponent } from '../../../framework/index';

class AppFooter extends WFMComponent {
	constructor(config: IComponent) {
		super(config);
	}
}

export const appFooter = new AppFooter({
	selector: 'footer',
	template: `
		<div class="container footer__container">	
			<div class="footer__course-github">
				<a href="https://rs.school/js/"></a>
			</div>
			<div class="footer__my-github">
				<a href="https://github.com/Jenya-b">my github, 2021</a>
			</div>
		</div>
	`,
	render() {
		return;
	},
});
