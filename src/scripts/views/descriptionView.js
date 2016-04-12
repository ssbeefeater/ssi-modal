"use strict";
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

var descriptionView = Backbone.View.extend({
    tagName: 'div',
    className:'description',
    initialize: function (description) {
        this.description = description;
        this.render()
    },
    render: function () {
        this.$el.html(this.description);
    }
});

module.exports=descriptionView;