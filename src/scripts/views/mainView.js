"use strict";
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var SpyItemView = require('../views/SpyItemView');
var DescriptionView = require('../views/descriptionView');
var CodeView = require('../views/codeView');
var PropertiesCollection = require('../collections/properties');
var PropertyView = require('../views/propertyView');
var contentView = require('../views/exampleView');
var mainView = Backbone.View.extend({
    tagName: 'div',
    initialize: function () {
        this.render()
    },
    render: function () {
        var wrapperContent = [],
         spyItems = [], content = [], functionArray = [];
        this.collection.each(function (model) {
            var wrapper = new Backbone.View({className: 'well', id: model.get('id')});
            var modela = new Backbone.Model({'title': model.get('title'), 'id': model.get('id')});
            var spyItem = new SpyItemView({'model': modela});
            spyItems.push(spyItem.$el);
            var desc = new DescriptionView(model.get('description'));
            wrapperContent.push('<h2>' + model.get('title') + '</h2>');
            wrapperContent.push(desc.$el);
            var artContent = model.get('content');
            var contentLength = artContent.length;
            for (var i = 0; i < contentLength; i++) {
                var titleCount = 0;
                if (artContent[i].title) {
                    wrapperContent.push('<h4 id="' + artContent[i].id + '">' + artContent[i].title + '</h4>');
                    if (artContent[i].title.indexOf('Example') === -1) {
                        if (titleCount===0){
                            spyItem.$el.addClass('collapseLink').attr({
                                'data-toggle': "collapse",
                                'data-target': '.' +'c' + model.get('id')
                            });
                            titleCount=1
                        }
                        var modela2 = new Backbone.Model({'title': artContent[i].title, 'id': artContent[i].id});
                        var spyItem2 = new SpyItemView({'model': modela2});
                        spyItem2.$el.find('h6').remove();
                        spyItem2.$el.find('h3').contents().unwrap();
                        spyItem2.$el.addClass('collapse c' + model.get('id')).attr('data-col','c' + model.get('id')).find('br').remove();
                        spyItems.push(spyItem2.$el.css({'font-size': '10px', 'margin-left': '25px'}));
                    }

                }
                if (artContent[i].description) {
                    var description = new DescriptionView(artContent[i].description);
                    wrapperContent.push(description.$el);
                }
                if (artContent[i].properties) {
                    var collection = new PropertiesCollection(artContent[i].properties);
                    var property = new PropertyView({collection: collection});
                    wrapperContent.push(property.$el)

                }
                if (artContent[i].code) {
                    var code = new CodeView(artContent[i].code);
                    wrapperContent.push(code.$el);
                    wrapperContent.push('<hr style="border-color:#cfcfcf;">')
                }
                if (artContent[i].example) {
                    var example = new Backbone.Model(artContent[i]);
                    var exampleCode = new contentView({model: example});
                    wrapperContent.push(exampleCode.$el);
                    functionArray.push(artContent[i].example.method);
                }

            }

            wrapper.$el.html(wrapperContent);
            wrapperContent = [];
            content.push(wrapper.$el);
        });

        $('#scrollSpyUl').html(spyItems);
        this.$el.append(content);
        $('#content').html(this.$el);
        $.each(functionArray, function (key, method) {
            $(document).ready(function () {
                method();
            });

        });

    }
});

module.exports = mainView;
