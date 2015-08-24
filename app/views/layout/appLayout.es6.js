import Marionette from 'marionette';
import Template from 'hbs!views/layout/appLayout';

export class AppLayout extends Marionette.LayoutView {
    initialize() {
        this.template = Template;
    }

    regions() {
        return {
            globalHeader: '.x-global-header',
            mainContent: '.x-main-content'
        };
    }
}
