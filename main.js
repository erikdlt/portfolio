// Fade/slide project cards in as they scroll into view.
  // Cards stay fully visible by default (see main.css), so if this
  // script fails to run for any reason, nothing is ever hidden.
  const cards = document.querySelectorAll('.project-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  if (cards.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    cards.forEach((card) => card.classList.add('reveal-init'));
 
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
 
    cards.forEach((card) => cardObserver.observe(card));
  }
 

  // Image slideshow (used on project pages) — one item visible at a
  // time, advanced with the prev/next arrows. Slides can be images or
  // videos; a video only plays while it's the active slide.
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    const slides = Array.from(slideshow.querySelectorAll('.slide-img'));
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');
    let current = Math.max(slides.findIndex((slide) => slide.classList.contains('active')), 0);
 
    const showSlide = (index) => {
      const outgoing = slides[current];
      if (outgoing.tagName === 'VIDEO') {
        outgoing.pause();
      }
      outgoing.classList.remove('active');
 
      current = (index + slides.length) % slides.length;
      const incoming = slides[current];
      incoming.classList.add('active');
      if (incoming.tagName === 'VIDEO') {
        incoming.currentTime = 0;
        incoming.play().catch(() => {});
      }
    };
 
    prevBtn?.addEventListener('click', () => showSlide(current - 1));
    nextBtn?.addEventListener('click', () => showSlide(current + 1));
  }