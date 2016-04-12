"use strict";
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');


var codeView = Backbone.View.extend({
    template: _.template('<pre class="prettyprint"><%=code%></pre>'),
    tagName: 'div',
    initialize: function (code) {
        this.code = code;
        this.render()
    },
    render: function () {

            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            function escapeHtml(string) {
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            }
        this.$el.html(this.template({code:this.code}));
    }
});

module.exports=codeView;