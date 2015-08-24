import Marionette from 'marionette';
import Backbone from 'backbone';
import {NavigationMenu} from 'views/navigation/menu';
import {ArticleLayout} from 'views/article/layout';
import {NavigationItemsFixture} from 'fixtures/navigation';
import {ArticleFixture} from 'fixtures/article';
import _ from 'underscore';


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

    _viewCanada() { this._showEmptyContent('canada'); }
    _viewWorld() { this._showEmptyContent('world'); }
    _viewUS() { this._showEmptyContent('us'); }
    _viewPolitics() { this._showEmptyContent('politics'); }
    _viewBusiness() { this._showEmptyContent('business'); }
    _viewSports() { this._showEmptyContent('sports'); }
    _viewTech() {
        this._showGlobalHeader({tab: 'tech'});
        this._showArticle(ArticleFixture);
    }

    _showArticle(data) {
        this.app.layout.mainContent.show(new ArticleLayout({
            model: new Backbone.Model(data)
        }));
    }

    _showGlobalHeader({tab = 'tech'}) {
        var globalNavMenu = new NavigationMenu({
            collection: new Backbone.Collection(NavigationItemsFixture)
        });
        var currentMenuItemIndex;

        this.app.layout.globalHeader.show(globalNavMenu);

        currentMenuItemIndex = _.findIndex(NavigationItemsFixture, nav => nav.route === tab);
        globalNavMenu.selectMenuItem(currentMenuItemIndex);
    }

    _showEmptyContent(tab) {
        this._showGlobalHeader({tab});
        this.app.layout.mainContent.empty();
    }
}
