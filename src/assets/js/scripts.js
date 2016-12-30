$(document).ready(function () {

  //sliders
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
});



