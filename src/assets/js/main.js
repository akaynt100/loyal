$(document).ready(function () {

    $(".main__nav-el-has-subnav").on("click",function () {
        var self = $(this);
        if(self.hasClass("close_state")){
            self.toggleClass("close_state")
                .toggleClass("open_state")
                .find(".main__sub-nav-wrap").slideDown("slow");
            self.find(".nav__burger").toggleClass("close__btn");
        }else{
            if(self.hasClass("open_state")){
                self.toggleClass("open_state")
                    .toggleClass("close_state")
                    .find(".main__sub-nav-wrap").slideUp("slow");
                self.find(".nav__burger").toggleClass("close__btn");
            }
        }

    });

    mainSliderInit();
    ratingInit();

    switcher(function(el){
        var parent = findParent(el,'catalog-wrap');
        parent.find('.tabs__content-el').toggleClass('hide');
    });

    $(".last__visited-slider").mCustomScrollbar({
        axis:"x",
        scrollButtons:{enable:true},
        advanced:{autoExpandHorizontalScroll:true}
    });

    customInputFile();

    editProfileFields();

    phoneMask();

    addPhone();

    $('.product__gallery').bxSlider({
        pagerCustom: '#product__gallery-list'
    });
    $('.product__gallery-list').bxSlider({
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 75,
        slideMargin: 15,
        pager: false,
        nextSelector: '#product__gallery-next',
        prevSelector: '#product__gallery-prev',
        nextText: '',
        prevText: ''
    });
    setActiveGalleryItem();

    $('.product-tabs').productTabs('product-tabs-titles__list-item-active');

    selectionRadioBtnsClick();

    $('.tabs-content-first-level .selection-tabs-wrap').productTabs('selection-tabs__type_selected');

    $('.selection-tabs-upper-level').selectionTabs('selection-tabs__obj-active');
    $('.aside-filter').productTabs('aside-filter-tab-active');

    $(".phone-mask").mask("+375 000000000",{placeholder: "+375  _ _ _ _ _ _ _"});

    $('.aside__slider').bxSlider();

    $('.contacts-tabs-wrap').productTabs('product__sizes-type-active');
});


function selectionRadioBtnsClick(){
   var parent = $('.season__type-wrap'),
       radioBtns = parent.find('input[type=radio]'),
       btns = parent.find('[data-btn-name]');

    btns.on('click', function () {
        var type = $(this).data('btnName');
        radioBtns.each(function () {
            if($(this).data('inputName') == type){
                $(this).click();
            }
        });

        btns.removeClass('season__type-active');
        $(this).addClass('season__type-active');
    });
}

function setActiveGalleryItem(){
    var els = $('.product__gallery-list-item');
    els.on('click', function () {
        els.removeClass('product__gallery-list-item-active');
        $(this).addClass('product__gallery-list-item-active');
    });
}

function addPhone(){
    var els = $('.add_phone-to-field');
    els.each(function () {
        var el = $(this);
        el.on('click', function (e) {
            var parent = findParent($(this),'field__wrap'),
                newEl = parent.find('.field__for-cloning').clone(true),
                container = parent.find('.fields');
            newEl.appendTo(container).removeClass('field__for-cloning');
            container.find('.field__label').addClass('field_indent-b');
            phoneMask();
            e.preventDefault();
        })
    });
}

function phoneMask(){
    $(".phone-mask").mask("+375 00 00000",{placeholder: "+375 _ _ _ _ _ _ _"});
}

function editProfileFields(){
    $('body').on('click','.profile__info-field-value:not(.profile__info-field-disable)', function (e) {
        var target = $(e.target),
            parent = findParent(target,'profile__info-item'),
            input = $('<input type="text" class="profile__info-field-value-editable"/>'),
            currentValue = target.data('value');
        target.hide();
        input.val(currentValue)
            .appendTo(parent)
            .focus()
            .on('focusout', function (){saveValue($(this),target)});
    });

    var saveValue = function (el, target) {
        var newValue = el.val();
        el.remove();
        target
            .text(newValue)
            .data('value',newValue)
            .show();
    };

}

function ratingInit(){
    $(".rating").each(function () {
        var rating = $(this).data("ratingValue");
        $(this).find("select").barrating({
            theme: 'fontawesome-stars',
            initialRating: rating,
            readonly: true
        });
    });
}

function mainSliderInit(){
    var sliderContainer = $(".main-slider-wrap"),
        slider = sliderContainer.find(".slider").bxSlider({
            pager: false
        });
    sliderContainer.find(".slider__controls-prev").click(function () {
        slider.goToPrevSlide();
    });
    sliderContainer.find(".slider__controls-next").click(function () {
        slider.goToNextSlide();
    });

    return slider;
}

function customInputFile(){
    var el = $(".custom-input-file");
    if(el.length){
        el.each(function(){
            var that = $(this);
            that.find("input[type='file']").change(function () {
                var file = $(this).val().replace(/\\/g, "/").split("/").pop();
                that.find(".custom-input-file__text").css('display','block').text(file);
            });
        });
    }
}

function popUpsInit(){
    $(".header-top-links__signin").click(function (e) {
        var popup = $(".login-popup"),
            form = popup.find(".popup-wrap"),
            closeBtn = popup.find(".popup-close");

        $("body").addClass("scroll_disable");
        popup.show().css({"top": $(window).scrollTop()});
        form.css({"top": (($(window).height() - form.height())/2) });
        closeBtn.click(function () {
            popup.hide();
            $("body").removeClass("scroll_disable");
        });

        e.preventDefault();
    });

    $(".get__offer").click(function (e) {
        var popup = $(".login-offer"),
            form = popup.find(".popup-wrap"),
            closeBtn = popup.find(".popup-close");

        $("body").addClass("scroll_disable");
        popup.show().css({"top": $(window).scrollTop()});
        form.css({"top": (($(window).height() - form.height())/2) });
        closeBtn.click(function () {
            popup.hide();
            $("body").removeClass("scroll_disable");
        });

        e.preventDefault();
    });
}

function switcher(callback){
    $(".product-switcher").each(function () {
        $(this).on('click', function () {
            $(this).toggleClass('switcher-state-on');
            callback($(this));
        });
    });
}

function findParent(el,class_){
    var parent = el.parent();
    if(parent.hasClass(class_)){
        return parent;
    }
    else {
        return findParent(parent,class_);
    }
}



//sliders ****************************************************
$('.sliderBrand').slick({
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: '<div class="rightArrow"></div>',
    prevArrow: '<div class="leftArrow"></div>'
});

$('.sliderSertificates').slick({
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: '<div class="rightArrow"></div>',
    prevArrow: '<div class="leftArrow"></div>'
});

$(window).resize(function(){
    var winBr = $('.basic_width').width();
    if( winBr <= 320 ){
        $('.catalog').slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            nextArrow: '<div class="rightCatalogArrow"><img src="assets/images/scroll-arrow-right.png"></div>',
            prevArrow: '<div class="leftCatalogArrow"><img src="assets/images/scroll-arrow-left.png"></div>'
        });
    } else {
        $('.catalog').unslick();
    }
});