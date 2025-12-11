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

    // Efecto sticky del menú
    let lastScrollTop = 0;
    const header = $('.header');
    const topbar = $('.topbar');
    const scrollThreshold = 100;

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        // Agregar clase sticky al header cuando se hace scroll
        if (scrollTop > scrollThreshold) {
            header.addClass('sticky');
            // Cuando el header está sticky, ocultar el topbar
            topbar.addClass('hidden');
        } else {
            header.removeClass('sticky');
            // Cuando no está sticky, mostrar/ocultar topbar según dirección del scroll
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // Scrolling hacia abajo
                topbar.addClass('hidden');
            } else {
                // Scrolling hacia arriba
                topbar.removeClass('hidden');
            }
        }

        lastScrollTop = scrollTop;
    });

    // Detectar sección activa en el menú
    const sections = ['hero', 'about', 'service', 'projects', 'team', 'blog', 'contact'];
    const navLinks = $('.header-nav ul li a');

    function updateActiveSection() {
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const offset = 200; // Offset para considerar el header sticky

        let currentSection = '';

        sections.forEach((sectionId, index) => {
            const section = $('#' + sectionId);
            if (section.length) {
                const sectionTop = section.offset().top;
                const sectionHeight = section.outerHeight();
                const sectionBottom = sectionTop + sectionHeight;

                // Verificar si la sección está visible en la ventana
                if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });

        // Si estamos en la parte superior, activar HOME
        if (scrollPosition < 100) {
            currentSection = 'hero';
        }

        // Actualizar clases activas
        navLinks.removeClass('active');
        const activeIndex = sections.indexOf(currentSection);
        if (activeIndex !== -1) {
            navLinks.eq(activeIndex).addClass('active');
        }
    }

    // Ejecutar al cargar y al hacer scroll
    updateActiveSection();
    $(window).on('scroll', updateActiveSection);

    // Modal de Video
    const videoModal = $('#videoModal');
    const videoBtn = $('#videoBtn');
    const closeVideoModal = $('#closeVideoModal');
    const videoIframe = $('#videoIframe');
    const videoOverlay = $('.video-modal-overlay');
    const videoSrc = 'https://www.youtube.com/embed/MZNfVoDPq_Y?si=I_AM_1WikVp5RLmE';

    // Abrir modal al hacer clic en el botón de video
    videoBtn.on('click', function(e) {
        e.preventDefault();
        videoIframe.attr('src', videoSrc + '&autoplay=1');
        videoModal.addClass('active');
        $('body').css('overflow', 'hidden'); // Prevenir scroll del body
    });

    // Cerrar modal
    function closeModal() {
        videoModal.removeClass('active');
        videoIframe.attr('src', ''); // Detener el video
        $('body').css('overflow', ''); // Restaurar scroll del body
    }

    closeVideoModal.on('click', closeModal);
    videoOverlay.on('click', closeModal);

    // Cerrar modal con la tecla ESC
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.hasClass('active')) {
            closeModal();
        }
    });

    // Scroll to top button
    const $scrollTopBtn = $("#scroll-top-btn");

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 300) {
            $scrollTopBtn.addClass("show");
        } else {
            $scrollTopBtn.removeClass("show");
        }
    });

    $scrollTopBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    // Abrir/cerrar menú móvil
    $("#menu-toggle").click(function () {
        $("#nav-menu").toggleClass('menu-open');
    });

    // Cerrar menú al hacer clic en un enlace
    $(".btn-ancla").click(function () {
        $("#nav-menu").removeClass('menu-open');
    });
});
