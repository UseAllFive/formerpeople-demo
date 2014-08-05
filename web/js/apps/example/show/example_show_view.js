define([
    'app',
    'apps/example/show/game',
    'hbars!apps/example/show/templates/layout'
], function(App, Game, layoutTemplate) {
    App.module('ExampleApp.Show.View', function(View, App, Backbone, Marionette, $, _) {

        View.Layout = Marionette.LayoutView.extend({
            regions: {
                bodyRegion: '.body-region'
            },

            className: 'example-app',

            template: layoutTemplate,

            initialize: function() {
                var game = new Game();
                game.animate();
            }
        });
    });

    return App.ExampleApp.Show.View;
});
