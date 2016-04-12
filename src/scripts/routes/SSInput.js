"use strict";
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var DocumentationView = require('../views/mainView');
var pluginData = require('../data/examples');
var methodsCollection = require('../collections/methods');
var PropertiesCollection = require('../collections/properties');
var PropertyView = require('../views/propertyView');
var currentView;
var $content= $('#content');
var scrollState = {
    doc: 0,
    example: 0
};
var SsinputRouter = Backbone.Router.extend({
    routes: {
        '': 'ssi_modal'
    },
    beforeBoot: function () {
        $('body').off('click.example');
    },
    bootPage: function () {
        ssi_modal.removeAll();
        $('body').scrollspy({target: '#scrollSpy', offset: 80});
        $("#scrollSpyUl").find("li a[href^='#']").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 60
            }, 600);
        });
        prettyPrint();
    },

    'ssi_modal': function (id) {
        currentView = 'example';
        this.beforeBoot();
        $('.title').html('ssi-modal');
        var items = new methodsCollection(pluginData.ssi_modal);
        new DocumentationView({collection: items});
        var thisS = this;
        $(document).ready(function () {
            thisS.bootPage();
            var collect = new PropertiesCollection([{
                name: 'modalType',
                type: "{('normalModal' || 'stackModal' || 'pluginName') || array }",
                defaultValue: 'null',
                description: 'The group or plugin modal you target to close. All modals that belong to the group you specify will be closed after the execution of the method. You can also select multiple groups using an array.'
            }, {
                name: 'excludeElement',
                type: "{string || array}",
                defaultValue: 'null',
                description: 'The class name of a target that you don\'t want to close after the execution of the method. You can also select multiple classes using an array.'

            }]);
            var prop = new PropertyView({collection: collect});

            var content = '<code>ssi_modal.closeAll()</code> is a method that closes all the modals that are opened in the DOM. This method takes, but not requires, two parameters. The first is the target group or plugin name (ie \'notify\') and the second the class name of the modal element that you want to exclude from the proccess.</br></br> ' +
             prop.$el.css('font-size', '12px')[0].outerHTML + ' <h3>Example</h3><pre class="prettyprint">//closes the normal and notify modals but not those with myModal class.<br>ssi_modal.closeAll([\'normalModal\',\'notify\'],\'myModal\']);<br><br>//closes all the modals except those with myModal and mySecondModal classes.<br>ssi_modal.closeAll(\'\',[\'myModal\',\'mySecondModal\']]);<br><br>//closes all the modals.<br>ssi_modal.closeAll();</pre> ';

            ssi_modal.notify('me', {
                title: 'Choose an action',
                onClickClose: false,
                closeIcon: true,
                sizeClass: 'small',
                closeAfter: false,
                position: 'bottom right',
                iconButtons: {
                    className: 'fa fa-question',
                    method: function (e, modal) {
                       var btn=$(this).addClass('disabled');
                        ssi_modal.show({
                            onClose:function(){btn.removeClass('disabled')},
                            title: 'ssi_modal.closeAll()',
                            content: content, animation: true
                        });
                        prettyPrint()
                        ;
                    }
                },
                buttons: [
                    {
                        label: 'close All',
                        className: 'btn btn-primary btn-xs',
                        closeAfter: false,
                        side: 'left',
                        method: function () {
                            ssi_modal.closeAll('', 'me');
                        }
                    }, {
                        label: 'close  modals',
                        className: 'btn btn-primary btn-xs',
                        closeAfter: false,
                        side: 'left',
                        method: function () {
                            ssi_modal.closeAll('normalModal');
                        }
                    }, {
                        label: 'close images',
                        className: 'btn btn-primary btn-xs',
                        closeAfter: false,
                        side: 'left',
                        method: function () {
                            ssi_modal.closeAll('imgModal');
                        }
                    }, {
                        label: 'close Notifications',
                        className: 'btn btn-primary btn-xs',
                        closeAfter: false,
                        side: 'left',
                        method: function () {
                            ssi_modal.closeAll('notify', 'me');
                        }
                    }
                ]
            });
            if (id) {
                var $elem = $('#' + id);
                $('html, body').scrollTop($elem.addAnimation('animated bounceIn').offset().top - 160);
                /*  $('html, body').animate({
                 scrollTop: $elem.offset().top - 160
                 }, 500,function(){
                 $elem.addAnimation('animated shake')
                 });*/

            }

        });

    }
});
module.exports = SsinputRouter;

