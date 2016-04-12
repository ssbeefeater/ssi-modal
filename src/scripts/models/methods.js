"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');


var propertiesModel = Backbone.Model.extend({

    defaults: {
        title:'',
        example:'',
        description:'',
        properties:''
    }

});

module.exports= propertiesModel;

