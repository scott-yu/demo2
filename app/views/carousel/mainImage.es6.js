import Marionette from 'marionette';
import Template from 'hbs!views/carousel/mainImage';

export class MainImage extends Marionette.ItemView {
    initialize() {
        this.template = Template;
    }

    className() {
        return 'main-image';
    }

    tagName() {
        return 'figure';
    }
}
