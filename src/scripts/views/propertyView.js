"use strict";
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

var PropertyView = Backbone.View.extend({
    template: _.template('<td><%=name%></td><td><%=type%></td><td><%=defaultValue%></td><td><%=description%></td><td><%=required%></td>'),
    tagName: 'tr',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.render()
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    }
});

var PropertiesView = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-hover prop',
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.render()
    },
    render: function () {
        this.$el.append('<tr><th>Name</th><th>Type</th><th>Default</th><th>Desciption</th><th></th></tr>');
        var content = [];
        this.collection.each(function (model) {
            if (typeof model.get('required') !== 'undefined') {
                var required=model.get('required'),req='';
                for(i=0;i<required.length;i++){
                    req+= '<span class="label label-'+required[i].type+'" '+(required[i].tooltip? 'data-toggle="tooltip" title="'+required[i].tooltip+'" ':'')+'>'+required[i].content+'</span>'
                }
                model.attributes.required=req;
            } else {
                model.attributes.required = '';
            }
            var property = new PropertyView({'model': model});
            if (typeof model.get('collapse') !== 'undefined') {
                var td = property.$el.addClass('toCollapse').find('td');
                for (var i = 0; i < td.length; i++) {
                    td.eq(i).replaceWith('<td class="hiddenRow"><div class="collapse ' + model.get('collapse') + '">' + td.eq(i).html() + '</div></td>')
                }
            }
            if (typeof model.get('collapseLink') !== 'undefined') {
                td = property.$el.attr({
                    'data-toggle': "collapse",
                    'data-target': '.' + model.get('collapseLink')
                }).addClass('collapseLink').click(function () {
                    $(this).toggleClass('active')
                }).children('td:first-child');
                if (typeof model.get('collapse') !== 'undefined') {
                    td = td.find('div')
                }
                td.prepend('<span class="plus"></span>');

                if (model.get('collapseLink').indexOf('sub') === -1) {
                    property.$el.click(function () {
                        $('.collapse.in.sub').collapse('hide').parents('table').find('.active').not(this).removeClass('active');
                    });
                }
            }
            content.push(property.$el);

        }, this);
        this.$el.append(content);
    }
});

module.exports = PropertiesView;