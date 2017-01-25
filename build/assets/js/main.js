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
        minSlides: 3,
        maxSlides: 5,
        slideWidth: 70,
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

    $('.question').on('click', function () {
       $(this).toggleClass('question__opened')
           .parent().find('.question-answer')
           .slideToggle(500);
    });

    $('.popup-overlay').height(
        $('.wrapper-inner').height() + $('.footer').height() + $('.user-panel').height() + 40
    );

    $('.rating-active').find("select").barrating({
        theme: 'fontawesome-stars',
        initialRating: "0"
    });

    var popUp = popUpInit();

    $('.show-registration-form').on('click', function (e) {
        popUp.showRegistrationForm();
        e.preventDefault();
    });
    $('.show-login-form').on('click', function (e) {
        popUp.showLoginForm();
        e.preventDefault();
    });
    $('.show-review-form').on('click', function (e) {
        popUp.showReviewForm();
        e.preventDefault();
    });
    $('.show-feedback-form').on('click', function (e) {
        popUp.showFeedbackForm();
        e.preventDefault();
    });
    $('.show-user-callback-form').on('click', function (e) {
        popUp.showCallbackForm();
        e.preventDefault();
    });
    $('.show-service-form').on('click', function (e) {
        popUp.showServiceForm();
        e.preventDefault();
    });

    $(".user-panel__to-top").on("click", function () {
        $(window).scrollTo($('.header'),500);
    });

});


function popUpInit(){
    var el = $('.popup-overlay'),
        popUp = {
            overlay: el,
            registrationForm: el.find('.registration-form'),
            loginForm: el.find('.login-form'),
            reviewForm: el.find('.review-form'),
            feedbackForm: el.find('.feedback-form'),
            callbackForm: el.find('.user-callback-form'),
            serviceForm: el.find('.service-form')
        },
        closeBtns = el.find('.popup__close'),
        submitBtns = el.find('input[type=submit]');

    var hidePopUps = function () {
        for(var key in popUp){
            if(key != 'overlay') popUp[key].fadeOut();
        }
    };

    var hideOverlay = function () {
        popUp.overlay.fadeOut();
    };

    var hideAll = function () {
        hidePopUps();
        hideOverlay();
    };

    var preparation = function () {
        popUp.overlay.fadeIn('slow');
    };

    var bindSettings = function () {
        closeBtns.on('click' ,hideAll);

        submitBtns.on('click', function (e) {
            //e.preventDefault();
        });

    };

    return function () {
        bindSettings();

        return {
            showRegistrationForm: function(){
                preparation();
                popUp.registrationForm.fadeIn('slow');
                return popUp.registrationForm;
            },
            showLoginForm: function(){
                preparation();
                popUp.loginForm.fadeIn('slow');
                return popUp.loginForm;
            },
            showReviewForm: function(){
                preparation();
                popUp.reviewForm.fadeIn('slow');
                return popUp.reviewForm;
            },
            showFeedbackForm: function(){
                preparation();
                popUp.feedbackForm.fadeIn('slow');
                return popUp.feedbackForm;
            },
            showCallbackForm: function(title){
                preparation();
                //openServicePopUp(title);
                popUp.callbackForm.fadeIn('slow');
                return popUp.callbackForm;
            },
            showServiceForm: function(){
                preparation();
                popUp.serviceForm.fadeIn('slow');
                return popUp.serviceForm;
            }
        };
    }();
}


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
                var textField = that.find(".custom-input-file__text");
                if(textField.attr("value")){
                    textField.val(file);
                }else{
                    textField.text(file);
                }
            });
        });
    }
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
    prevArrow: '<div class="leftArrow"></div>',

    responsive: [{
        breakpoint: 481,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});

$('.sliderSertificates').slick({
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: '<div class="rightArrow"></div>',
    prevArrow: '<div class="leftArrow"></div>',

    responsive: [{
        breakpoint: 481,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});


$(window).width(function(){
    var winWidth = $('.basic_width').width();
    if( winWidth <= 480 ){
        $('.mobile-slider').slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            nextArrow: '<div class="rightCatalogArrow"><img src="assets/images/scroll-arrow-right.png"></div>',
            prevArrow: '<div class="leftCatalogArrow"><img src="assets/images/scroll-arrow-left.png"></div>'
        });
        $('.reviewMoreImage').slick({
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            draggable: true,
            nextArrow: '<div class="rightCatalogArrow"><img src="assets/images/scroll-arrow-right.png"></div>',
            prevArrow: '<div class="leftCatalogArrow"><img src="assets/images/scroll-arrow-left.png"></div>'
        });

        function toggleTranscript () {
            var el = $(".transcript__content");
            if (el.height() > 0) {
                el.slideUp(0);
            }

            $(".transcript__title").on("click",function () {
                el.slideToggle(500);
            });
        }

        toggleTranscript();

        //function toggleTabs() {
            //$('.aside-filter-tab-content.selection-tabs-content-inner').css({'display':'none'});
            //
            //$(".aside-filter-tab-params").on("click",function () {
            //    $("[data-tab-content='1']").toggleClass("display_none");
            //});
            //
            //$(".aside-filter-tab-auto").on("click",function () {
            //    $("[data-tab-content='2']").toggleClass("display_none");
            //});

            /////////////////////////////////////////////////////////////////////////////////////////////////

            //$('.aside-filter-tab-content.selection-tabs-content-inner').css({'display':'none!important'});
            //
            //
            //$(".aside-filter-tab-params").on("click",function () {
            //    $("[data-tab-content='1']").slideToggle(500);
            //});
            //
            //$(".aside-filter-tab-auto").on("click",function () {
            //    $("[data-tab-content='2']").slideToggle(500);
            //});
        //}

        //toggleTabs();

        $(".compare-table-wrap").mCustomScrollbar({
            axis:"x",
            scrollButtons:{enable:false},
            advanced:{autoExpandHorizontalScroll:true}
        });

        function sliderTabWidth () {
            var minWidth = document.querySelectorAll(".tabs__content-el")[0].offsetWidth;
            var elements = document.querySelectorAll('.tabs__content-el .catalog__el');

            for (var i = 0; i < elements.length; i++) {
                elements[i].style.minWidth = minWidth + "px";
            }
        }

        sliderTabWidth();

    } else {
        $('.mobile-slider').unslick();
        $('.reviewMoreImage').unslick();
    }
});