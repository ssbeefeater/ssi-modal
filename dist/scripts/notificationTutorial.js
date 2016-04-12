(function($,ssi_modal){

    var currentStep=0;
    ssi_modal.slideShow=function(opts,steps){
        var defaults={
            nextBtnClassName:'',
            prevBtnClassName:''
        };
        options=$.extend({},defaults,opts);
        var stepDefaults={
            title:options.title,
            content:'',
            backdropClassName:'',
            modalClassName:''
        };
        steps[0]=$.extend({},stepDefaults,steps[0]);
        options.buttons=[{
            label:'Next',
            side:'right',
            className:options.nextBtnClassName,
            method:function(event,modal){
                if (currentStep < steps.length-1) {
                    currentStep++;
                    setModal(modal);
                }
            }
        },{
            label:'Prev',
            side:'left',
            className:options.prevBtnClassName,
            method:function(event,modal){
                if (currentStep > 0) {
                    currentStep--;
                    setModal(modal);
                }
            }
        }];
        options.title=steps[0].title;
        options.content=steps[0].content;
        options.className=steps[0].modalClassName;
        options.backdropClassName=steps[0].backdropClassName;
        options.onClose = function (modal) {
            currentStep = 0;
            if (typeof opts.onClose === 'function') {
                opts.onClose(modal);
            }
        };
        var setModal=function(modal){
            var thisStep=$.extend({},stepDefaults,steps[currentStep]);
            modal.setTitle(thisStep.title);
            modal.setContent(thisStep.content);
            modal.get$modal().addClass(thisStep.modalClassName);
            modal.get$backdrop().addClass(thisStep.backdropClassName);
            if (typeof modal.options.onShow === 'function') {
                modal.options.onShow();
            }
        };

        ssi_modal.createObject(options).setPluginName('slideShow').init().show();

    };

})(jQuery,ssi_modal);