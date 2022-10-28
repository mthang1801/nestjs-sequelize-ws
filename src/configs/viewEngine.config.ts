import * as hbs from "hbs"
import { join } from 'path';

export const viewEngineConfig = app => {
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	hbs.registerPartials(join(__dirname, '..', '/views/partials'));
}