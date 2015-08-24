import Marionette from 'marionette';
import Backbone from 'backbone';
import {AppLayout} from 'views/layout/appLayout';
import {AppController} from 'controllers/appController';

let app = new Marionette.Application();

app.layout = new AppLayout({
    el: '.x-app-main'
});

app.layout.render();

new AppController({app: app});

app.addInitializer(() => Backbone.history.start());

export { app as default };
