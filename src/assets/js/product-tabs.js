(function($){
    jQuery.fn.productTabs = function(startIndex){
        var tabs = $(this),
            tabsContent = tabs.find("[data-tab-content]"),
            tabsBtns = tabs.find("[data-tab]");
        var createTabs = function(){
            //var i = 0;
            var showTab = function(i){
                tabsContent.hide();
                tabsContent.each(function () {
                    if($(this).data("tabContent") == i){
                        $(this).show();
                    }
                });

            };

            tabsBtns.click(function(){
                //tabsBtns.removeClass("tabs__title-active");
                //$(this).addClass("tabs__title-active");
                showTab(parseInt($(this).data("tab")));
            });

            (startIndex) ? tabsBtns[parseInt(startIndex)].click() : tabsBtns[0].click();

        };
        return this.each(createTabs);
    };
})(jQuery);