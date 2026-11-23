/**
 * Vanilla JavaScript principal para Luz Gomez Theme.
 * Incluye manipulación del CSSOM para header dinámico, menú hamburguesa,
 * animación continua de galería Hero y carrito interactivo con WhatsApp.
 */
document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('lg-site-header');
  var menuToggle = document.getElementById('lg-menu-toggle');
  var mainNav = document.getElementById('lg-main-nav');

  // 1. Manipulación del CSSOM: cabecera dinámica al hacer scroll
  function handleScrollHeader() {
    if (!header) return;
    if (window.scrollY > 36) {
      header.classList.add('is-scrolled');
      header.style.setProperty('backdrop-filter', 'blur(10px)');
    } else {
      header.classList.remove('is-scrolled');
      header.style.removeProperty('backdrop-filter');
    }
  }
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // 2. Menú hamburguesa móvil mediante eventos del DOM y CSSOM
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Movimiento automático de imágenes en la galería del Hero
  var heroSlides = document.querySelectorAll('#lg-hero-slider .lg-hero__img');
  if (heroSlides.length > 1) {
    var currentSlide = 0;
    window.setInterval(function () {
      heroSlides[currentSlide].classList.remove('is-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('is-active');
    }, 4500);
  }

  // 4. Carrito interactivo con localStorage + conexión directa a WhatsApp
  var STORAGE_KEY = 'luz_gomez_wp_cart';
  var cart = [];
  try {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  var cartDrawer = document.getElementById('lg-cart-drawer');
  var cartBackdrop = document.getElementById('lg-cart-backdrop');
  var cartToggle = document.getElementById('lg-cart-toggle');
  var cartClose = document.getElementById('lg-cart-close');
  var cartItemsEl = document.getElementById('lg-cart-items');
  var cartCountEl = document.getElementById('lg-cart-count');
  var cartSubtotalEl = document.getElementById('lg-cart-subtotal');
  var cartWhatsappBtn = document.getElementById('lg-cart-whatsapp-checkout');
  var toastEl = document.getElementById('lg-toast');

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    window.setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 2800);
  }

  function openCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.add('is-open');
    cartBackdrop.classList.add('is-visible');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.remove('is-open');
    cartBackdrop.classList.remove('is-visible');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  function renderCart() {
    var totalQty = 0;
    var subtotal = 0;
    cart.forEach(function (item) {
      totalQty += item.qty;
      subtotal += item.price * item.qty;
    });

    if (cartCountEl) cartCountEl.textContent = String(totalQty);
    if (cartSubtotalEl) cartSubtotalEl.textContent = 'S/ ' + subtotal.toFixed(2);

    if (cartItemsEl) {
      if (cart.length === 0) {
        cartItemsEl.innerHTML =
          '<p class="lg-cart-drawer__empty">Tu bolsa está vacía. Agrega una joya para comenzar.</p>';
      } else {
        cartItemsEl.innerHTML = cart
          .map(function (item, idx) {
            return (
              '<div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">' +
              '<div><strong>' +
              item.name +
              '</strong><div class="small text-muted">Cant: ' +
              item.qty +
              ' · S/ ' +
              (item.price * item.qty).toFixed(2) +
              '</div></div>' +
              '<button type="button" class="btn btn-sm btn-outline-secondary js-remove-item" data-index="' +
              idx +
              '">Quitar</button>' +
              '</div>'
            );
          })
          .join('');
      }
    }

    if (cartWhatsappBtn) {
      var phone =
        typeof window.LuzGomezConfig !== 'undefined'
          ? window.LuzGomezConfig.whatsappNumber
          : '51953323578';
      var lines = [
        '✨ *¡Hola Luz Gomez Joyería!* ✨',
        'Quiero realizar este pedido desde mi bolsa 🛍️:',
        '',
      ];
      cart.forEach(function (item, idx) {
        lines.push(
          '💎 *' +
            (idx + 1) +
            '. ' +
            item.name +
            '* — x' +
            item.qty +
            ' (*S/ ' +
            (item.price * item.qty).toFixed(2) +
            '*)'
        );
      });
      lines.push('');
      lines.push('────────────────────');
      lines.push('💰 *TOTAL ESTIMADO: S/ ' + subtotal.toFixed(2) + '*');
      lines.push('────────────────────');
      lines.push('');
      lines.push('💖 ¿Me ayudan a coordinar el pago y la entrega, por favor?');
      cartWhatsappBtn.setAttribute(
        'href',
        'https://wa.me/' + encodeURIComponent(phone) + '?text=' + encodeURIComponent(lines.join('\n'))
      );
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // Ignorar errores de almacenamiento
    }
  }

  document.querySelectorAll('.js-add-to-cart').forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.getAttribute('data-id');
      var name = button.getAttribute('data-name');
      var price = parseFloat(button.getAttribute('data-price') || '0');
      var existing = cart.find(function (it) {
        return it.id === id;
      });
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id: id, name: name, price: price, qty: 1 });
      }
      renderCart();
      openCart();
      showToast('Joya agregada al carrito');
    });
  });

  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.classList.contains('js-remove-item')) {
        var idx = parseInt(target.getAttribute('data-index') || '-1', 10);
        if (idx >= 0) {
          cart.splice(idx, 1);
          renderCart();
        }
      }
    });
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  renderCart();
});
