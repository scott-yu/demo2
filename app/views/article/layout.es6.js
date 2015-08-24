import Marionette from 'marionette';
import Backbone from 'backbone';
import Template from 'hbs!views/article/layout';
import {ArticleSection} from 'views/article/articleSection';

export class ArticleLayout extends Marionette.CompositeView {
    initialize() {
        this.template = Template;
        this.childView = ArticleSection;
        this.childViewContainer = '.x-article-sections';
        this.collection = new Backbone.Collection(this.model.get('sections'));
    }

    tagName() {
        return 'article';
    }
}
