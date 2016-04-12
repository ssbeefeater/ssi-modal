"use strict";

//var ssi_modal=require('../../ssi-modal/js/ssi-modal');
module.exports = {
    ssi_modal: [{
        id: '1',
        title: 'Basic example',
        description: 'To call a basic ssi-modal is very easy. The only thing you have to do is to call this function <pre class="inline prettyprint"><code>ssi_modal.show({content:\'Hello World\'})</code></pre> or using jquery <pre class="inline prettyprint"><code>$(\'button\').ssi_modal.show({content:\'Hello World\'})</code></pre>',
        content: [{
            id: '1a',
            example: {
                result: '<button id="modal" class="btn btn-primary">Open modal</button>',
                method:function () {    $('#modal').click(function () {
        ssi_modal.show({
           content: 'Hello World'
        });
    })
}
            }
        }]
    }, {
        id: '2',
        title: 'Size, title, animation',
        description: 'You can change the size of the ssi-modal by setting a <code>sizeClass</code> option. The valid size values are <code>\'dialog\'</code>, <code>\'small\'</code>, <code>\'smallToMedium\'</code>, <code>\'medium\'</code>, <code>\'mediumToLarge\'</code>, <code>\'large\'</code>, <code>\'full\'</code>. Setting <code class="bg">{animation:true}</code> gives a nice and simple fade effect to the modal window and to the backdrop. Unfortunatly this is the only built in animation but as we will shall see later you can use out of the box css animation libraries to add any animation you want. You can also use the <code>modalAnimation</code> and <code>backdropAnimation</code> options to set different animations to each element. You can also specify the show or hide animation by simple do this <pre class="inline prettyprint"><code>{animation:{show:true,hide:false}</code></pre> ',
        content: [{
            id: '2a',
            example: {
                result: '<button id="modal2" class="btn btn-primary">Open modal</button>',
                method: function () {   $('#modal2').click(function () {
        ssi_modal.show({
            content: 'Hello World',
            sizeClass: 'small',
            title: 'Featured modal',
            animation: true
         });
    })}
            }
        }]
    }, {
        id: '3',
        title: 'Confirm - Dialog',
        content: [{
            id: '3a',
            description: 'There are pre build modals tha can be used as a simple dialog or confirm window. To use that you just call <pre class="inline prettyprint"><code>ssi_modal.dialog(options,function(){})</code></pre> or <pre class="inline prettyprint"><code>ssi_modal.confirm(options,function(result){})</code></pre>. You can use any ssi-modal\'s options based on your needs. ',
            example: {
                result: '<button id="modal3" class="btn btn-primary">Confirm</button>\n<button id="modal3b" class="btn btn-primary">Dialog</button>',
                method: function () {   $('#modal3').click(function () {
        ssi_modal.confirm({
            content: 'Are you sure you want to exit?',
            okBtn: {
                className:'btn btn-primary'
            },
            cancelBtn:{
                className:'btn btn-danger'
            }
             },function (result) {
                if(result)
                    ssi_modal.notify('success', {content: 'Result: ' + result});
                else
                    ssi_modal.notify('error', {content: 'Result: ' + result});
            }
        );
    });

    $('#modal3b').click(function () {
        ssi_modal.dialog({content: 'Hello World', okBtn:{className:'btn btn-primary'}});
    })
                }
            }
        }]
    }, {
        id: '4',
        title: 'Modal with buttons',
        content: [{
            id: '4a',
            description:'To use buttons with ssi-modal is very easy just add <code>{buttons:[buttonOptions1,buttonOptions2]}</code> to the modal\'s options. Some basic button options are <pre class="inline prettyprint"><code>{className:\'btn\',label:\'Ok\',closeAfter:true,method:function(event,modal){}}</code></pre>',
            example: {
                result: '<button id="modal4" class="btn btn-primary">Open modal</button>',
    method: function () {   $('#modal4').click(function () {
        ssi_modal.show({
            content: 'Hello World',
            title: 'Modal with buttons',
            buttons: [{
                className: 'btn btn-primary',
                label: 'Ok',
                enableAfter: 3,
                closeAfter: false,
                method: function () {
                    ssi_modal.notify('info', {content: 'Ok'})
                }
            }, {
                className: 'btn btn-danger',
                label: 'Cancel',
                closeAfter: true,
                method: function () {
                    ssi_modal.notify('error', {content: 'Cancel'})
                }
            }]
        });
    })
                }
            }
        }]
    }, {
        id: '5',
        title: 'KeepContent',
        content: [{
            id: '5a',
            description: 'Setting keepContent to true, when you close the modal the content will not be lost.For more complicated cases, you can change the keepContent option using a modal\'s button. <pre class="prettyprint inline"><code>ssi_modal.show({content:\'...\',<span class="border">keepContent:true</span>,buttons:[{label:\'cancel\',<span class="border">keepContent:false</span>}]},\'#modal5\') </code></pre>',
            example: {
                result: '<button id="modal5" class="btn btn-primary">Basic example</button> \n<button id="modal5a" class="btn btn-primary">Complicated example</button>',
                method: function () {
                    //Basic example

    $('#modal5').click(function () {
    ssi_modal.show({content:'<input type="text"/>',keepContent:true},'#modal5')
    });

                    //Complicated example

    $('#modal5a').click(function () {
        ssi_modal.show({
            content: '<form>' +
            '<label for="name">Your name:</label><br/>' +
            '<input id="name" class="input" name="name" type="text"/><br/>' +
            '<label for="email">Your email:</label><br/>' +
            '<input id="email" class="input" name="email"/><br/>' +
            '<label for="message">Your message:</label><br/>' +
            '<textarea id="message" class="input" name="message"></textarea><br/>' +
            '</form>',
            sizeClass: 'small',
            title: 'Keep content',
            keepContent: false,
            beforeClose: function (modal) {
                ssi_modal.confirm({
                    position: 'top center',
                    content: 'Your content will be lost! Are you sure you want to continue?',
                    okBtn:{className:'btn btn-primary'},
                    cancelBtn:{className:'btn btn-danger'}
                },function (result) {
                     if (result === true) {
                         modal.options.keepContent=false;
                         modal.options.beforeClose = '';
                         modal.close();
                         ssi_modal.notify('error', {
                             position: 'center top',
                             content: "The content removed!"
                         })
                     }
                 });
                return false;
            },
            buttons: [{
                className: 'btn btn-danger',
                label: 'close',
                closeAfter: true,
                keepContent: false
            }, {
                className: 'btn btn-success',
                label: 'ok',
                closeAfter: false,
                keepContent: true,
                method: function (e, modal) {
                    var beforeCloseMethod=modal.options.beforeClose;
                    modal.options.beforeClose = '';
                    modal.options.keepContent=true;
                    modal.close();
                    modal.options.beforeClose =beforeCloseMethod;
                    ssi_modal.notify('success', {
                        position: 'center top',
                        content: "The content is safe!!"
                    })
                }
            }]
        },'#modal4');
    })
                }
            }
        }]
    }, {
        id: '6',
        title: 'Multi levels',
        content: [{
            id: '6a',
            description: 'With ssi-modal you can open as many modals you want.',
            example: {
                result: '<button id="modal6" class="btn btn-primary">Open modal</button>',
                method: function () {   $('#modal6').click(function () {
        ssi_modal.show({
            content: '<button id="modal6b" class="btn btn-primary">Open modal</button>',
            sizeClass: 'medium',
            title: 'Modal with buttons',
            fitScreen: true,
            fixedHeight: true,
            onClose: function () {
                ssi_modal.notify('error', {content: 'first closed'})
            }
        });
    });
    var $body = $('body');
    $body.on('click.example', '#modal6b', function () {

        ssi_modal.show({
            content: '<button id="modal6c" class="btn btn-primary">Open modal</butto>',
            sizeClass: 'small',
            title: 'Second modal',
            onClose: function () {
                ssi_modal.notify('warning', {content: 'Second closed'})
            }
        });
    });
    $body.on('click.example', '#modal6c', function () {
        ssi_modal.show({
            content: '<a href="images/3b5dd04be82af929dd3070cb089bcf03.jpg" title="My landscape" class="ssi-imgBox"><img src="images/3b5dd04be82af929dd3070cb089bcf03.jpg" style="width:50px;height:50px"/></a>',
            sizeClass: 'dialog',
            title: 'Third modal',
            onClose: function () {
                ssi_modal.notify('info', {content: 'Third closed'})
            }
        });
    })
                }
            }
        }]
    }, {
        id: '7',
        title: 'Callbacks',
        content: [{
            id: '7a',
            description: 'The ssi-modal supports 4 kind of callbacks:<code>beforeShow,onShow,beforeClose,onClose</code>. Each one have access to modal object. If you <code>return false</code> with the beforeClose/beforeShow callbacks, you will prevent to close/open the modal. All callbacks have access to the modal object. <pre class="prettyprint inline"><code>{beforeClose:function(modal){}</code></pre></code></pre>',
            example: {
                 result: '<button id="modal7" class="btn btn-primary">Open modal</button>',
                method: function () {   $('#modal7').click(function () {
         ssi_modal.show({
             sizeClass: 'dialog',
             className: 'awesomeModal',
             title: 'Callbacks',
             beforeShow:function(modal){
                 ssi_modal.notify('info', {content: 'The modal with title: '+modal.options.title+' will open'});
             },
             onShow: function (modal) {
                 ssi_modal.notify('success', {content: 'The modal with className: '+modal.options.className+' just opened'});
             },
             beforeClose:function(modal){
                 ssi_modal.notify('warning', {content: 'The modal with title: '+modal.options.title+' will close'});
             },
             onClose: function (modal) {
                 ssi_modal.notify('error', {content: 'The modal with className: '+modal.options.className+' just closed'});
             }
        });
    })
                }
            }
        }]
    }, {
        id: '8',
        title: 'Fixed height',
        content: [{
            id: '8a',
            description: 'With the <code>fixedHeight</code> option the modal\'s height doesn\'t exceed the screen\'s height. If you want always the modal\'s height to be like that, even if the content is empty, then the <code>fitScreen</code> option is for you.' ,
            example: {
                result: '<button id="modal8" class="btn btn-primary">Open modal</button> \n<button id="modal8a" class="btn btn-primary">Fixed height</button> \n<button id="modal8b" class="btn btn-primary">Fit screen</button>',
                method: function () {   var modalContent='Start</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>-</br>End';

    $('#modal8').click(function () {
        ssi_modal.show({
            content:modalContent ,
            title: 'Normal modal'
        });
    });
    $('#modal8a').click(function () {
        ssi_modal.show({
            content:' ' ,
            title: 'Fixed height',
            fixedHeight: true,
            buttons:[{side:'left',label:'Add content',method:function(e,modal){modal.setContent(modalContent,'append')}}]
        });
    });
    $('#modal8b').click(function () {
        ssi_modal.show({
            content:'Hello world' ,
            title: 'Fit screen',
            fixedHeight: true,
            fitScreen:true,
            buttons:[{side:'left',label:'Add content',method:function(e,modal){modal.setContent(modalContent,'append')}}]
        });
    })

                }
            }
        }]
    }, {
        id: '9',
        title: 'Using existing element',
        content: [{
            id: '9a',
            description: 'You can use an element tha is already sitting in the DOM.To do that there are two ways.With the first way you just target the element with jquery and call the function <pre class="inline prettyprint"><code>$(\'.selector\').ssi_modal(options)</code></pre> and the second one, you set a data-ssi_modal attribute to a trigger element like button </br><pre class="inline prettyprint"><code>&lt;button id="button" data-ssi_modal="#simpleDiv"&gt;Open&lt;/button&gt;</code></pre> and target it with jquery again <pre class="inline prettyprint"><code>$(\'#button\').ssi_modal(options)</code></pre> If you want the changes you made in the modal to affect and the to original content, you must set the <code>overrideOriginaContent</code> option to true <pre class="prettyprint inline">{overrideOriginaContent:true}</pre>',
            example: {
                 result: '<button id="modal9" class="btn btn-primary">Open modal</button></br></br>\n<div id="simpleDiv"><input type="text" value="Edit me"/></div>',
                method: function () {   $('#modal9').click(function(){
        ssi_modal.show({
            content:$('#simpleDiv'),
        title:'ssi-modal',
            extendOriginalContent:true
        })
    });

    /*  ===== You can also use it with this way=====

    <button data-ssi_modal="#simpleDiv" id="modal8" class="btn btn-primary">Open modal</button>
    <div id="simpleDiv"><input type="text" value="Edit me"/></div>

    $('#modal8').ssi_modal({title:'ssi-modal', extendOriginalContent:true});*/
                }
            }
        }]
    }, {
        id: '10',
        title: 'Positioning',
        content: [{
            id: '10a',
            description: 'You can set 6 different positions to the ssi-modal. The valid values are <code>"right top","center top","left top","right bottom","center bottom","left bottom"</code>.',
            example: {
                result: '<button id="modal10" class="btn btn-primary">Right top</button>',
                method: function () {   var modalOptions={
    animation:true,
    sizeClass:'dialog'
    };

    $('#modal10').click(function(){
         modalOptions.content='<button id="modal10a" class="btn btn-primary">Left top</button>';
         modalOptions.title=modalOptions.position='right top';
        ssi_modal.show(modalOptions)
    });
    var $body=$('body');
    $body.on('click.example','#modal10a',function(){
        modalOptions.content='<button id="modal10b" class="btn btn-primary">Center bottom</button>';
        modalOptions.title= modalOptions.position='left top';
        ssi_modal.show(modalOptions)
    });
    $body.on('click.example','#modal10b',function(){
        modalOptions.content='<button id="modal10c" class="btn btn-primary">Left bottom</button>';
        modalOptions.title=modalOptions.position='center bottom';
        ssi_modal.show(modalOptions)
    });
    $body.on('click.example','#modal10c',function(){
        modalOptions.content='<button id="modal10d" class="btn btn-primary">Right bottom</button>';
        modalOptions.title= modalOptions.position='left bottom';
        ssi_modal.show(modalOptions)
    });
    $body.on('click.example','#modal10d',function(){
        modalOptions.content='<button id="modal10e" class="btn btn-primary">Center top</button>';
        modalOptions.title=  modalOptions.position='right bottom';
        ssi_modal.show(modalOptions)
    });
    $body.on('click.example','#modal10e',function(){
        modalOptions.content='The end!!<br><br><button id="modal10f" class="btn btn-primary">Remove all</button>';
        modalOptions.title= modalOptions.position='center top';
        ssi_modal.show(modalOptions)
    });
    $body.on('click.example','#modal10f',function(){
       ssi_modal.removeAll();
    })

                }
            }
        }]
    },{
        id: '11',
        title: 'Stack modals',
        content: [{
            id: '11a',
            description: 'If you are using positioned modal the you can also use the <code>stack</code> option.This option makes the modal to be in a vertical row. Just set <code>{stack:true}</code>.',
            example: {
                result: '<button id="modal11" class="btn btn-primary">Open modal</button>',
                method: function () {   var $body=$('body');

    $body.on('click.example','#modal11',function(){

        ssi_modal.show({
             title:'stackModal left top',
            position:'left top',
            content:'<button id="modal11a" class="btn btn-primary">Open modal</button>',
            backdrop:false,
            stack:true
        })
    });
    $body.on('click.example','#modal11a',function(){
        ssi_modal.show({
            title:'stackModal right top',
            position:'right top',
            content:'<button id="modal11" class="btn btn-primary">Open modal</button>',
            backdrop:false,
            stack:true
        })
    });

                }
            }
        }]
    },{
        id: '12',
        title: 'Using animations',
        content: [{
            id: '12a',
            description: 'The ssi-modal is compatible with animations but haven\'t any built in.You can create your own animations or can use any animation library. Use <pre class="prettyprint inline"><code>{modalAnimation:{show:\'animationClass\',hide:\'animationClass\'}}</code></pre> and  <pre class="prettyprint inline"><code>{backdropAnimation:{show:\'animationClass\',hide:\'animationClass\'}}</code></pre> to specify your animations. To set animation to both at once you can also use <pre class="prettyprint inline"><code>{animation:{show:\'animationClass\',hide:\'animationClass\'}}</code></pre>. In this example we are using the <a href="https://daneden.github.io/animate.css/" target="_blank">animate.css</a> library.',
            example: {
                result: '<button id="modal12" class="btn btn-primary">Open modal</button> \n<button id="modal12a" class="btn btn-primary">Open modal</button> \n<button id="modal12b" class="btn btn-primary">Open modal</button>',
                method: function () {   $('#modal12').click(function(){
        ssi_modal.show({
            title:'Flip',
            animation:{
                show:'animated flipInY',
                hide:'animated flipOutY'
            },
            content:' '

        })
    });
    $('#modal12a').click(function(){
        ssi_modal.show({
            title:'lightSpeed',
            modalAnimation:{
                show:'animated lightSpeedIn',
                hide:'animated lightSpeedOut'
            },
            backdropAnimation:true,
            content:' '
        })
    });

    $('#modal12b').click(function(){
        ssi_modal.show({
            title:'Roll',
            modalAnimation:{
                show:'animated rollIn',
                hide:'animated rollOut'
            },
            backdropAnimation:{
                show:'animated zoomIn',
                hide:'animated zoomOut'
            },
            content:'<button id="modal11" class="btn btn-primary">Open modal</button>'
        })
    })
                }
            }
        }]
    }, {
        id: '13',
        title: 'Modal as notification message',
        content: [{
            id: '13a',
            description: 'As you can see you have a lot of options that you can use for several proposes. Mixing up some options you can easily create a toast like notification message.The cool thing is that these options are already done for you by calling <pre class="prettyprint inline" >ssi_modal.notify("type",options)</pre> .',
            example: {
                result: '<button id="notify" class="btn btn-success">Right top</button> \n<button id="notify2" class="btn btn-danger">Left top</button> \n<button id="notify3" class="btn btn-primary">Right bottom</button> \n<button id="notify4" class="btn btn-warning">Left bottom</button> \n<button id="notify5" class="btn btn-default">Center top</button> \n<button id="notify6" class="btn btn-default">Center bottom</button> \n<button id="notify7" class="btn btn-default">Custom full width</button>',
                method: function () {                   //====== right top ======

    $('#notify').click(function () {
        ssi_modal.notify('success', {
            content: 'You have successfully upload the file!',
            modalAnimation: {
                'show': 'animated fadeInRight mediumSpeed',
                'hide': 'animated  fadeOutRight mediumSpeed'
            }
        });
    });
                    //====== left top ======

    $('#notify2').click(function () {
        ssi_modal.notify('error', {
            position: 'left top',
            backdrop:'shared',outSideClose:true,
            content: 'An error occurred.',
            buttons:[
    {label:'Shared backdrop',className:'btn btn-default btn-xs',method:function(){ssi_modal.notify('info',{content:'hi',outSideClose:true,backdrop:'shared'})}},
    {label:'Without backdrop',className:'btn btn-default btn-xs',method:function(){ssi_modal.notify('warning',{content:'hi'})}}
            ]
        })
    });
                    //====== left bottom ======
    $("#notify3").click(function () {
        ssi_modal.notify('info', {position: 'right bottom', content: 'Hello there'})
    });
    $('#notify4').click(function () {
        ssi_modal.notify('warning', {
            position: 'left bottom',
            content: 'You have to register first to see the content!'
        })
    });
                    //====== center top ======

    $('#notify5').click(function () {
        ssi_modal.notify('dialog', {
            sizeClass:'medium',
            okBtn:{className:'btn btn-primary'},
            position: 'center top',
            content: 'This site uses cookies to provide better services!'
        },function(){})
    });
                    //====== center bottom ======

    $('#notify6').click(function () {
        ssi_modal.notify('confirm', {
            closeIcon: true,
            okBtn:{className:'btn btn-primary'},
            cancelBtn:{className:'btn btn-danger'},
            position: 'center bottom',
            content: 'Are you sure you want to exit?'
        }, function (result) {
            if (result) {
                ssi_modal.notify('success', {content: 'Result: ' + result})
            } else {
                ssi_modal.notify('error', {content: 'Result: ' + result})
            }
        })
    });
                    //====== custom full ======

    $('#notify7').click(function () {
        ssi_modal.notify('custom', {
            sizeClass:'full',
            icon:'fa fa-glass',
            position: 'center top',
            content: 'This is a custom notification message!'
        })
    })
                }
            }
        }]
    }, {
        id: '14',
        title: 'Image box',
        description: 'Until now we have see really nice things with this modal. This is one more functionality that makes this modal more awesome! Just add the ssi-imgBox class name to a link like this <pre class="prettyprint inline" ><code>&lt;a href="path/to/img.jpg" <span class="border">class="ssi-imgBox"</span>&gt;My cat&lt;&#x2F;a&gt; </code></pre>and the ssi-modal will do the rest.',
        content: [{
            id: '14a',
            example: {
                result: '<a href="http://www.wallpapereast.com/static/images/Dragon-Backgrounds-Wallpaper-Hd-44.jpg" title="Dragon" class="ssi-imgBox">My dragon</a> \n<a href="images/test/IMG_20150825_114918.jpg" title="My landscape" class="ssi-imgBox">\n  <img src="images/test/IMG_20150825_114918.jpg"/>\n</a>',
                method: function () {
                }
            }
        }]
    }, {
        id: '15',
        title: 'ImgBox option',
        content: [{
            id: '15a',
            description: 'The image box is another type of ssi-modal, That means tha can get pretty much the same options as a normal modal.To set you own options just call the <pre class="prettyprint inline" ><code>ssi_modal.imgBox(options)</code></pre> function. After that all the image boxes will have these options. If you set <code>data-alt</code> attribute with a message, this message will display when the image is missing.',
            example: {
               result: '<a data-ssi_imgGroup="group1" href="http://www.wallpapereast.com/static/images/Dragon-Backgrounds-Wallpaper-Hd-44.jpg" title="My awesome dragon" class="ssi-imgBox">My dragon</a> \n<a data-ssi_imgGroup="group1" href="images/test/oops.jpg" title="Me and my dragon" data-alt="Me and my dragon playing in my ward!" class="ssi-imgBox">\n  <img alt="Me and my dragon playing in my ward!" src="images/test/oops.jpg"/>\n</a> \n<a data-ssi_imgGroup="group1" href="images/test/42253_metallica.jpg" title="Metallica" class="ssi-imgBox awesome">\n  <img src="images/test/42253_metallica.jpg"/>\n</a>',
                method: function () {   ssi_modal.imgBox({
        animation: true,
        title: true,
         hideImgButtons:true,
        imgButtons: [{
            type: 'link',
            label: '<i class="fa fa-thumbs-up fa-2x"></i>',
            closeAfter: false,
            method: function (e,modal) {
                ssi_modal.notify('info', {
                    content: 'Title: ' + modal.imgTitle,
                    sizeClass:'auto',
                    icon: false,
                    title: '<i class="fa fa-thumbs-up"></i> Like'
                })
            }
        }, {
            type: 'link',
            exclude: 'awesome',
            showIn: '',
            label: '<i class="fa fa-thumbs-down fa-2x" style="color:#ff6a7d"></i>',
            closeAfter: false,
            method: function (e,modal) {
                ssi_modal.notify('error', {
                    content: modal.imgTitle+' '+modal.imgUrl,
                    sizeClass:'auto',
                    icon: 'fa fa-thumbs-down',
                    title: ' Dislike'
                })

            }
        }]
    },'group1');

                }
            }
        }]
    }, {
        id: '16',
        title: 'ImageBox groups',
        description: 'Image groups, as you realize, are group of images that you can navigate through. The awesome thing is that you can set different settings for each group.To do that just set a data-ssi_imgGroup attribute to the link with a group name <pre class="prettyprint inline" ><code>&lt;a href="path/to/img.jpg" <span class="border">data-ssi_imgGroup="groupName"</span> class="ssi-imgBox"&gt;My cat&lt;&#x2F;a&gt; </code></pre> and pass a second parameter to the function that we saw before <pre class="prettyprint inline" ><code>ssi_modal.imgBox(options,\'groupName\')</code></pre> . Group options won\'t override the options you have set for all images but they will extend them.' ,
        content: [{
            id: '16a',
            example: {
                result: '<a data-ssi_imgGroup="landscapes" href="https://www.youtube.com/embed/ydD1Wg2B8Vk" title="Landscapes" class="ssi-imgBox">\n  <img src="images/3b5dd04be82af929dd3070cb089bcf03.jpg"/>\n</a> \n<a data-ssi_imgGroup="landscapes" href="images/ipad.jpg" title="Landscapes" class="ssi-imgBox">\n  <img src="images/ipad.jpg"/>\n</a> \n<a data-ssi_imgGroup="landscapes" href="images/canada-view-niblet_71483_600x450.jpg" title="Canada" class="ssi-imgBox">\n  <img src="images/canada-view-niblet_71483_600x450.jpg"/>\n</a>&nbsp;&nbsp;&nbsp;&nbsp;\n<a data-ssi_imgGroup="bands" href="images/iron-maiden-fear-live-i15906.jpg" title="My landscape" class="ssi-imgBox">\n  <img src="images/iron-maiden-fear-live-i15906.jpg"/>\n</a> \n<a data-ssi_imgGroup="bands" href="images/brand.gif" title="Landscapes" class="ssi-imgBox">\n  <img src="images/brand.gif"/>\n</a> \n<a data-ssi_imgGroup="bands" href="images/master_of_puppets_album.jpg" title="Metallica" class="ssi-imgBox awesome">\n  <img src="images/master_of_puppets_album.jpg"/>\n</a>',
                method: function () {
                    ssi_modal.imgBox({
                        title: true,
                        animation: true,
                        center: true,
                        iframe:{className:'idd'}
                    }, 'landscapes');
                    ssi_modal.imgBox({
                        imgTitle: false,
                        backdropAnimation: true,
                        modalAnimation: {
                            'show': 'animated  rotateInDownLeft',
                            hide: 'animated  rotateOutDownLeft'
                        }
                    }, 'bands');
                }
            }
        }]
    }]
};
