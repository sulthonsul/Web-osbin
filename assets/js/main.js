/**
 * Template Name: Selecao
 * Updated: Jan 29 2024 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  'use strict';

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    'click',
    '.navbar .dropdown > a',
    function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on(
        'click',
        '#portfolio-flters li',
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter'),
          });
          portfolioIsotope.on('arrangeComplete', function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  });
})();

// $(document).ready(function () {
//   $('.portfolio-lightbox').magnificPopup({
//     type: 'image',
//     gallery: {
//       enabled: true,
//     },
//   });
// });

$(document).ready(function () {
  $('.portfolio-container').each(function () {
    var container = $(this);
    var filter = container.find('.filter-active').data('filter'); // Dapatkan filter yang aktif di dalam container
    var filteredImages = container.find('.portfolio-item').filter(filter); // Saring gambar-gambar yang sesuai dengan filter yang aktif di dalam container
    filteredImages.find('.portfolio-lightbox').magnificPopup({
      // Inisialisasi Magnific Popup hanya untuk gambar-gambar yang sesuai di dalam container
      type: 'image',
      gallery: {
        enabled: true,
      },
    });
  });
});

document.querySelector('.php-email-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formAction = form.getAttribute('action');

  fetch(formAction, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'You Sent Message!',
          icon: 'sent success',
        });
        form.reset();
      } else {
        alert('Oops, something went wrong. Please try again later.');
      }
    })
    .catch((error) => {
      alert('Oops, something went wrong. Please try again later.');
    });
});

if (localStorage.getItem('theme') == 'dark') {
  setDarkMode();

  if (document.getElementById('checkbox').checked) {
    localStorage.setItem('checkbox', true);
  }
}

function setDarkMode() {
  let isDark = document.body.classList.toggle('dark-mode');

  if (isDark) {
    setDarkMode.checked = true;
    localStorage.setItem('theme', 'dark');
    document.getElementById('checkbox').setAttribute('checked', 'checked');
  } else {
    setDarkMode.checked = true;
    localStorage.removeItem('theme', 'dark');
  }
}

const typewriter = document.getElementById("typing-animation");
const text = "Selamat Datang di website Official OSBIN";
let i = 0;

const type = () => {
  if (i < text.length) {
    typewriter.textContent += text[i];
    i++;
    setTimeout(type, 50);
  } else {
    // Tambahkan efek jeda setelah selesai mengetik
    setTimeout(() => {
      // Tambahkan animasi cursor berkedip
      typewriter.innerHTML += `<span class="cursor">|</span>`;
      setInterval(() => {
        const cursor = document.querySelector(".cursor");
        cursor.classList.toggle("hidden");
      }, 500);
    }, 500);
    setTimeout(() => {
      // Hapus teks yang sudah diketik
      typewriter.textContent = "";
      i = 0;
      type();
    }, 2000);   
  }
};

type();

// document.addEventListener('DOMContentLoaded', function () {
//   var galleryTop = new Swiper('.gallery-top', {
//     direction: 'vertical',
//     spaceBetween: 10,
//     loop: true,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//   });

//   var galleryThumbs = new Swiper('.gallery-thumbs', {
//     direction: 'horizontal',
//     spaceBetween: 10,
//     slidesPerView: 3,
//     loop: true,
//     loopedSlides: 5,
//     slideToClickedSlide: true,
//     watchSlidesVisibility: true,
//     watchSlidesProgress: true,
//   });

//   galleryTop.controller.control = galleryThumbs;
//   galleryThumbs.controller.control = galleryTop;
// });
