/* Il Casale delle Erbe — comportamenti
   Tutto è progressive-enhancement: senza JS il sito resta completo e visibile.
   La classe .js-anim viene aggiunta subito nel <head> (script inline) così
   lo stato "da animare" esiste solo quando il JS c'è davvero. */

(function () {
  'use strict';

  var ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── comparsa allo scroll (robusta) ──────────────────────
     Se qualcosa va storto o non c'è IntersectionObserver, si rivela tutto. */
  var elementi = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function rivelaTutti() {
    elementi.forEach(function (e) { e.classList.add('dentro'); });
  }

  if (ridotto || !('IntersectionObserver' in window)) {
    rivelaTutti();
  } else {
    var osservatore = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) {
          v.target.classList.add('dentro');
          osservatore.unobserve(v.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    elementi.forEach(function (e) { osservatore.observe(e); });

    /* rete di sicurezza: qualsiasi elemento già in viewport al load si rivela;
       e comunque dopo 2.5s non resta nulla di invisibile. */
    window.addEventListener('load', function () {
      elementi.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { e.classList.add('dentro'); }
      });
    });
    setTimeout(rivelaTutti, 2500);
  }

  /* ── menu mobile ─────────────────────────────────────────*/
  var apri = document.querySelector('.apri-menu');
  var chiudi = document.querySelector('.chiudi-menu');
  var menu = document.getElementById('menu');

  function chiudiMenu() {
    if (!menu) return;
    menu.classList.remove('aperto');
    if (apri) apri.setAttribute('aria-expanded', 'false');
    document.body.style.removeProperty('overflow');
  }
  function apriMenu() {
    if (!menu) return;
    menu.classList.add('aperto');
    if (apri) apri.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (apri && menu) {
    apri.addEventListener('click', apriMenu);
    if (chiudi) chiudi.addEventListener('click', chiudiMenu);
    menu.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') chiudiMenu();
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') chiudiMenu();
    });
  }

  /* ── parallasse leggero sullo sfondo hero ────────────────*/
  var sfondo = document.querySelector('.hero__sfondo');
  if (sfondo && !ridotto) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          sfondo.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.06)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── modulo iscrizione ───────────────────────────────────*/
  var modulo = document.getElementById('modulo');
  var esito = document.getElementById('esito');
  if (modulo && esito) {
    modulo.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (modulo.action.indexOf('TUO-ID-FORMSPREE') !== -1) {
        esito.className = 'esito ko';
        esito.textContent = 'Il modulo non è ancora collegato. Intanto scrivici su WhatsApp.';
        return;
      }
      var pulsante = modulo.querySelector('button[type=submit]');
      pulsante.disabled = true;
      esito.className = 'esito';
      esito.textContent = 'Un attimo…';
      fetch(modulo.action, {
        method: 'POST',
        body: new FormData(modulo),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          modulo.reset();
          esito.className = 'esito ok';
          esito.textContent = 'Grazie, ci siamo segnati il tuo recapito.';
        } else { throw new Error(); }
      }).catch(function () {
        esito.className = 'esito ko';
        esito.textContent = 'Non è partito. Riprova, oppure scrivici su WhatsApp.';
      }).then(function () { pulsante.disabled = false; });
    });
  }
})();
