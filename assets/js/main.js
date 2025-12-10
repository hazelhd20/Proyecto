$(function () {
    $("#heroSlider").responsiveSlides({
        auto: true,
        speed: 800,
        timeout: 6000,
        pager: false,
        nav: true,
        namespace: "hero-slider",
        navContainer: "#hero",
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        pause: true,
        pauseControls: true
    });

    new WOW().init();
});
