import Marionette from 'marionette';
import Template from 'hbs!views/carousel/layout';
import {NavigationMenu} from 'views/navigation/menu';
import {MainImage} from 'views/carousel/mainImage';

export class Carousel extends Marionette.LayoutView {
    regions() {
        return {
            navigation: '.x-navigation',
            mainImage: '.x-main-image'
        };
    }

    className() {
        return 'carousel';
    }

    initialize() {
        this.template = Template;
    }

    onRender() {
        this.navMenu = new NavigationMenu({
            collection: this.collection,
            onSelect: el => this._selectImage(el._index)
        });

        this.navigation.show(this.navMenu);

        this._selectImage();
    }

    _selectImage(index = 0) {
        this._showMainImage(index);
        this._attachTimer(index);
    }

    _showMainImage(index) {
        this.mainImage.show(new MainImage({model: this.collection.at(index)}));
        this.navMenu.selectMenuItem(index);
    }

    _attachTimer(currentIndex) {
        clearInterval(this.timer);
        this.timer = setInterval(() =>
            this._showMainImage(currentIndex >= this.collection.length - 1 ? currentIndex = 0 : currentIndex += 1), 3000);
    }
}
