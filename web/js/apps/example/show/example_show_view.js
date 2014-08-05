define([
    'app',
    'apps/example/show/game',
    'seamlessloop',
    'hbars!apps/example/show/templates/layout'
], function(App, Game, SeamlessLoop, layoutTemplate) {
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

                $('audio').on('ended', function() {
                    var loop = new SeamlessLoop();
                    loop.addUri('/audio/loop.m4a', 7520, 'loop');
                    loop.callback(function() {
                        loop.start('loop');
                    });
                });
            }
        });
    });

    return App.ExampleApp.Show.View;
});
