import Marionette from 'marionette';
import Backbone from 'backbone';
import {NavigationMenu} from 'views/navigation/menu';
import {ArticleLayout} from 'views/article/layout';
import {NavigationItemsFixture} from 'fixtures/navigation';
import {ArticleFixture} from 'fixtures/article';


export class AppController extends Marionette.AppRouter {
    routes() {
        return {
            'canada': '_viewCanada',
            'world': '_viewWorld',
            'us': '_viewUS',
            'politics': '_viewPolitics',
            'business': '_viewBusiness',
            'sports': '_viewSports',
            'tech': '_viewTech',
            '': '_viewTech',

            '*notFound': '_onViewHome'
        };
    }

    initialize({app}) {
        this.app = app;
    }

    _viewCanada() {}
    _viewWorld() {}
    _viewUS() {}
    _viewPolitics() {}
    _viewBusiness() {}
    _viewSports() {}
    _viewTech() {
        this.app.layout.globalHeader.show(new NavigationMenu({
            collection: new Backbone.Collection(NavigationItemsFixture)
        }));

        this.app.layout.mainContent.show(new ArticleLayout({
            model: new Backbone.Model(ArticleFixture)
        }));
    }
}
