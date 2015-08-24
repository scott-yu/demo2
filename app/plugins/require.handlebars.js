define([
    'handlebars',
    'templates'
], function (handlebars, templates) {
    'use strict';
    templates = templates || {};
    return {
        load: function (resourceId, require, callback) {
            resourceId = resourceId.toLowerCase();

            if (templates[resourceId]) {
                callback(templates[resourceId]);
            }
            else {
                throw 'Missing template ' + resourceId;
            }
        }
    };
});
