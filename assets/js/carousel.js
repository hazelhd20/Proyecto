function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  if (!carouselEl) {
    console.error("No se encontró el elemento con id 'carousel'");
    return;
  }
  
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".slide");
  
  if (!slideContainerEl || !slideEl) {
    console.error("No se encontraron los elementos del carrusel");
    return;
  }
  
  let slideWidth = slideEl.offsetWidth;
  let autoplay; // Declarar autoplay al principio para que esté disponible en todo el scope
  
  // Slide transition
  const getNewScrollPosition = (arg) => {
    const gap = 10;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft;
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };
  
  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };
  
  // Add click handlers
  const backButton = document.querySelector("#back-button");
  const forwardButton = document.querySelector("#forward-button");
  
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      navigate("backward");
    });
  }
  
  if (forwardButton) {
    forwardButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      navigate("forward");
    });
  }
  
  // Solo agregar eventos si existen los indicadores
  const indicators = document.querySelectorAll(".slide-indicator");
  if (indicators.length > 0) {
    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(autoplay);
        navigate(index);
      });
      dot.addEventListener("mouseenter", () => clearInterval(autoplay));
    });
  }
  
  // Add keyboard handlers
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      clearInterval(autoplay);
      navigate("backward");
    } else if (e.code === "ArrowRight") {
      clearInterval(autoplay);
      navigate("forward");
    }
  });
  
  // Add resize handler
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });
  
  // Autoplay
  autoplay = setInterval(() => navigate("forward"), 20000);
  slideContainerEl.addEventListener("mouseenter", () =>
    clearInterval(autoplay)
  );
  slideContainerEl.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => navigate("forward"), 20000);
  });
  
  // Slide indicators (solo si existen)
  const slideIndicators = carouselEl.querySelectorAll(".slide-indicator");
  if (slideIndicators.length > 0) {
    const slideObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.dataset.slideindex;
            const activeIndicator = carouselEl.querySelector(".slide-indicator.active");
            if (activeIndicator) {
              activeIndicator.classList.remove("active");
            }
            if (slideIndicators[slideIndex]) {
              slideIndicators[slideIndex].classList.add("active");
            }
          }
        });
      },
      { root: slideContainerEl, threshold: 0.1 }
    );
    document.querySelectorAll(".slide").forEach((slide) => {
      slideObserver.observe(slide);
    });
  }
}

// Función genérica para inicializar carruseles
function initCarousel(carouselId, slideContainerId, backButtonId, forwardButtonId, gap = 10) {
  const carouselEl = document.getElementById(carouselId);
  if (!carouselEl) {
    console.error(`No se encontró el elemento con id '${carouselId}'`);
    return;
  }
  
  const slideContainerEl = carouselEl.querySelector(`#${slideContainerId}`);
  const slideEl = carouselEl.querySelector(".slide, .blog-slide");
  
  if (!slideContainerEl || !slideEl) {
    console.error(`No se encontraron los elementos del carrusel ${carouselId}`);
    return;
  }
  
  let slideWidth = slideEl.offsetWidth;
  let autoplay;
  
  // Slide transition
  const getNewScrollPosition = (arg) => {
    const maxScrollLeft = slideContainerEl.scrollWidth - slideContainerEl.offsetWidth;
    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft;
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };
  
  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };
  
  // Add click handlers
  const backButton = document.querySelector(`#${backButtonId}`);
  const forwardButton = document.querySelector(`#${forwardButtonId}`);
  
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      navigate("backward");
    });
  }
  
  if (forwardButton) {
    forwardButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      navigate("forward");
    });
  }
  
  // Solo agregar eventos si existen los indicadores
  const indicators = carouselEl.querySelectorAll(".slide-indicator");
  if (indicators.length > 0) {
    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(autoplay);
        navigate(index);
      });
      dot.addEventListener("mouseenter", () => clearInterval(autoplay));
    });
  }
  
  // Add keyboard handlers (solo para el primer carrusel activo)
  if (carouselId === "carousel") {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        clearInterval(autoplay);
        navigate("backward");
      } else if (e.code === "ArrowRight") {
        clearInterval(autoplay);
        navigate("forward");
      }
    });
  }
  
  // Add resize handler
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });
  
  // Autoplay
  autoplay = setInterval(() => navigate("forward"), 20000);
  slideContainerEl.addEventListener("mouseenter", () =>
    clearInterval(autoplay)
  );
  slideContainerEl.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => navigate("forward"), 20000);
  });
  
  // Slide indicators (solo si existen)
  const slideIndicators = carouselEl.querySelectorAll(".slide-indicator");
  if (slideIndicators.length > 0) {
    const slideObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.dataset.slideindex;
            const activeIndicator = carouselEl.querySelector(".slide-indicator.active");
            if (activeIndicator) {
              activeIndicator.classList.remove("active");
            }
            if (slideIndicators[slideIndex]) {
              slideIndicators[slideIndex].classList.add("active");
            }
          }
        });
      },
      { root: slideContainerEl, threshold: 0.1 }
    );
    carouselEl.querySelectorAll(".slide, .blog-slide").forEach((slide) => {
      slideObserver.observe(slide);
    });
  }
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    autoplayCarousel();
    initCarousel('blog-carousel', 'blog-slide-container', 'blog-back-button', 'blog-forward-button', 30);
  });
} else {
  // DOM ya está cargado
  autoplayCarousel();
  initCarousel('blog-carousel', 'blog-slide-container', 'blog-back-button', 'blog-forward-button', 30);
}
