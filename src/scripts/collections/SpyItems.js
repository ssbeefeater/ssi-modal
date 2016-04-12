'use strict';
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');
var SpyItemsModel=require('../models/SpyItems');

  var SpyItemsCollection = Backbone.Collection.extend({
    model: SpyItemsModel
  });

  module.exports= SpyItemsCollection;

