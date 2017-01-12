(function($){
    jQuery.fn.productTabs = function(activeTabSelector,startIndex){

        var createTabs = function(){
            var tabs = $(this),
                tabsContent = tabs.find("[data-tab-content]"),
                tabsBtns = tabs.find("[data-tab]");

            tabsContent.hide();
            var showTab = function(i){
                tabsContent.hide();
                tabsContent.each(function () {
                    if($(this).data("tabContent") == i){
                        $(this).show();
                    }
                });

            };

            tabsBtns.click(function(){
                tabsBtns.removeClass(activeTabSelector);
                $(this).addClass(activeTabSelector);
                showTab(parseInt($(this).data("tab")));
            });

            (startIndex) ? tabsBtns[parseInt(startIndex)].click() : tabsBtns[0].click();

        };
        return this.each(createTabs);
    };


    jQuery.fn.selectionTabs = function(activeTabSelector,startIndex){
        var tabs = $(this),
            tabsContent = tabs.find("[data-tab-content-upper-level]"),
            tabsBtns = tabs.find("[data-tab-upper-level]");
        var createTabs = function(){
            tabsContent.hide();
            var showTab = function(i){
                tabsContent.hide();
                tabsContent.each(function () {
                    if($(this).data("tabContentUpperLevel") == i){
                        $(this).show();
                    }
                });
            };

            tabsBtns.click(function(){
                tabsBtns.removeClass(activeTabSelector);
                $(this).addClass(activeTabSelector);
                showTab(parseInt($(this).data("tabUpperLevel")));
            });

            (startIndex) ? tabsBtns[parseInt(startIndex)].click() : tabsBtns[0].click();
        };
        return this.each(createTabs);
    };
})(jQuery);