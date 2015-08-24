import Marionette from 'marionette';
import Backbone from 'backbone';
import Template from 'hbs!views/navigation/menuItem';

export class navigationMenuItem extends Marionette.ItemView {
    initialize() {
        this.template = Template;
    }

    events() {
        return {
            'click > a': 'onClick'
        };
    }

    tagName() {
        return 'li';
    }

    className() {
        return 'navigation-item';
    }

    onClick(e) {
        e.preventDefault();
        this._setActiveClass();

        this.trigger('navItemClicked');

        if (this.model.has('route')) {
            this._navigateRoute(this.model.get('route'));
        }
    }

    onSelect() {
        this._setActiveClass();
    }

    _setActiveClass() {
        this.$el.addClass('active').siblings().removeClass('active');
    }

    _navigateRoute(route) {
        Backbone.history.navigate(route, true);
    }
}
