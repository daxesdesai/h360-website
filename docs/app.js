// H360 site interactions
(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  // sticky nav background on scroll
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll reveals
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // lazy-load + autoplay the cinematic band only when in view
  var film = document.getElementById('filmVideo');
  if (film && 'IntersectionObserver' in window) {
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (!film.src && film.dataset.src) film.src = film.dataset.src;
          if (!reduce) { var p = film.play(); if (p && p.catch) p.catch(function () {}); }
        } else {
          if (!film.paused) film.pause();
        }
      });
    }, { threshold: 0.4 });
    fio.observe(film);
  }
})();
