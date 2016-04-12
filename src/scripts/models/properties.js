"use strict";
var Backbone=require('backbone');
var $=require('jquery');
var _=require('lodash');


var propertiesModel = Backbone.Model.extend({

    defaults: {
        type:'',
        name:'',
        description:'',
        required:false,
        defaultValue:''
    }

});

module.exports= propertiesModel;

