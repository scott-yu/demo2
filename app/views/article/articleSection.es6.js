import Marionette from 'marionette';
import Template from 'hbs!views/article/articleSection';
import {Carousel} from 'views/carousel/layout';
import {MediaFixture} from 'fixtures/media';

export class ArticleSection extends Marionette.LayoutView {
    initialize() {
        this.template = Template;
    }

    regions() {
        return {
            mediaContent: '.x-media-container'
        };
    }

    tagName() {
        return 'section';
    }

    onRender() {
        this._displayMediaContent();
    }

    _displayMediaContent() {
        let mediaContent = this.model.get('media');
        if (mediaContent && MediaFixture[mediaContent.id]) {
            switch(mediaContent.type) {
                case 'carousel':
                this._displayCarousel(MediaFixture[mediaContent.id]);
                break;
            }
        }
    }

    _displayCarousel(data) {
        this.mediaContent.show(new Carousel({
            collection: new Backbone.Collection(data)
        }));
    }
}
