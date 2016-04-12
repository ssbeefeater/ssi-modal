var Backbone = require('backbone');
global.$ = global.jQuery = require("jquery");
global.ssi_modal =require('../ssi-modal/js/ssi-modal');
var bootstrap = require('bootstrap');
var _ = require('lodash');
var Router = require('./routes/SSInput');

new Router;
Backbone.history.start();
