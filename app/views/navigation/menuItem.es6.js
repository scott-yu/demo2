import Marionette from 'marionette';
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
        e && e.preventDefault();
        this._setActiveClass();

        this.trigger('navItemClicked');
    }

    onSelect() {
        this._setActiveClass();
    }

    _setActiveClass() {
        this.$el.addClass('active').siblings().removeClass('active');
    }
}
