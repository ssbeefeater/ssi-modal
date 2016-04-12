"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');

  var ContentsView = Backbone.View.extend({
    template: _.template($('#contentTemplate').html()),
    tagName: 'div',
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.render()
    },

    render: function () {
      var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      };

      function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
          return entityMap[s];
        });
      }
      var method=''+this.model.attributes.example.method;
     this.model.attributes.example.code=escapeHtml(method.replace(/function\s?\(\s?\)\s?{/,"").replace(/}$/,""));
     this.model.attributes.example.html=escapeHtml(this.model.attributes.example.result);
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
  module.exports= ContentsView;
