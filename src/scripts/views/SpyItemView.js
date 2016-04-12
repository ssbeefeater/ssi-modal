"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');


  var SpyItemsView = Backbone.View.extend({

    template: _.template(
      '<a href="#<%=id%>"><%=title%></a>'
    ),

    tagName: 'li',
    initialize: function () {
      this.render();
      this.listenTo(this.model, 'change', this.render);
    },
    events:{
      'click a':function(e){
        e.preventDefault();
        $(this.$el.find('a').attr('href'))[0].scrollIntoView();
        scrollBy(0, -50);
      }
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  module.exports= SpyItemsView;

