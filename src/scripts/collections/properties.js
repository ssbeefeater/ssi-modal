"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');
var propertiesModel=require('../models/properties');


var propertiesCollection = Backbone.Collection.extend({
    model: propertiesModel,
    pluginName:'ssi-upload'
});

module.exports =propertiesCollection;

