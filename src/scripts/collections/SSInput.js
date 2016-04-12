"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');
var SsinputModel=require('../models/SSInput');


var SsinputCollection = Backbone.Collection.extend({
    model: SsinputModel,
    pluginName:'ssi-upload'
  });

  module.exports =SsinputCollection;

