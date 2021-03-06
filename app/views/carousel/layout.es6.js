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

    initialize({timerInterval = 3000}) {
        this.template = Template;
        this.timerInterval = timerInterval;
    }

    onRender() {
        this._showCarouselNavigation();
        this._selectImage();
    }

    _showCarouselNavigation() {
        this.navMenu = new NavigationMenu({
            collection: this.collection,
            onSelect: el => this._selectImage(el._index)
        });

        this.navigation.show(this.navMenu);
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
        this._clearTimer();
        this.timer = setInterval(() =>
            this._showMainImage(currentIndex >= this.collection.length - 1 ? currentIndex = 0 : currentIndex += 1), this.timerInterval);
    }

    _clearTimer() {
        clearInterval(this.timer);
    }

    onDestroy() {
        this._clearTimer();
    }
}
