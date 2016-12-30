(function($) {
    $.fn.trianZoom = function() {
        var el = this,
            tmpl={};

        var setControls = function(){
            el.bind('click touchend', function(e){
                createTmpl($(this).attr("href"));
                e.preventDefault();
            });
        };

        var init = function(){
            setControls();
        };

        var createTmpl = function(src){
            tmpl.wrapper = $('<div class="cover_wrapper" />');
            tmpl.wrapper.css({"top": $(window).scrollTop()});
            tmpl.body = $("body");
            tmpl.body.css("overflow","hidden");

            tmpl.img = $("<img class='zoom_image' src='"+src+"'/>");
            tmpl.wrapper.append(tmpl.img);

            tmpl.body.append(tmpl.wrapper);

            tmpl.wrapper.bind('click touchend',destroy);
        };

        var destroy = function(e){
            if($(e.target).hasClass('cover_wrapper')){
                $(".cover_wrapper").remove();
                tmpl.body.css("overflow","auto");
            }
        };

        init();

        return this;
    };
})(jQuery);