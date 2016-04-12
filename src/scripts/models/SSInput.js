"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');


  var SsinputModel = Backbone.Model.extend({
    url: '',
    initialize: function() {
    },

    defaults: {
      title:'',
      content:{
        preview:'',
        code:''
      }
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  module.exports= SsinputModel;

