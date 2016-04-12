"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');

  var MenuView = Backbone.View.extend({
    template: _.template(
      '<a href="<%=url%>"><%=title%></a>'
    ),

    tagName: 'li',

    initialize: function () {
      this.render();
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
  var MenusView = Backbone.View.extend({
    el:'#menu',
    initialize: function () {
     this.render();
    },
    render:function(){
    this.collection.each(function(model){
var menu=new MenuView({'model':model});
      this.$el.append(menu.el);
      },this)
  }
  });

  module.exports= MenusView;

