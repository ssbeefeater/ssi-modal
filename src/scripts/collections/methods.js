"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');
var methodsModel=require('../models/methods');


var methodsCollection = Backbone.Collection.extend({
    model: methodsModel,
    pluginName:'ssi-upload'
});

module.exports =methodsCollection;

