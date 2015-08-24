import Marionette from 'marionette';
import {navigationMenuItem} from 'views/navigation/menuItem';
import Template from 'hbs!views/navigation/menu';

export class NavigationMenu extends Marionette.CompositeView {
    initialize({onSelect}) {
        this.childView = navigationMenuItem;
        this.childViewContainer = '.x-menu-items';
        this.template = Template;
        this.onSelect = onSelect;

        this._handleEvents();
    }

    className() {
        return 'navigation';
    }

    _handleEvents() {
        this.listenTo(this, 'childview:navItemClicked', this.onSelect);
    }

    selectMenuItem(index) {
        if (this.children.length) {
            this.children.findByIndex(index).onSelect();
        }
    }
}
