<?php
/**
 * Cabecera semántica del tema Luz Gomez Theme.
 *
 * @package LuzGomezTheme
 */

$contact = luz_gomez_get_contact_config();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<!-- Meta viewport obligatoria para diseño Mobile-First y Responsive Web Design -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Luz Gomez Joyería Premium. Anillos de compromiso, oro 18k, plata 925 y joyas personalizadas.">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'lg-body' ); ?>>
<?php wp_body_open(); ?>

<!-- Etiqueta HTML5 semántica: cabecera principal dinámica (cambia de estilo al hacer scroll vía CSSOM) -->
<header id="lg-site-header" class="lg-header">
	<div class="container">
		<div class="lg-header__inner">
			<!-- Logo de la marca -->
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="lg-brand" aria-label="Inicio Luz Gomez">
				<?php if ( has_custom_logo() ) : ?>
					<?php the_custom_logo(); ?>
				<?php else : ?>
					<span class="lg-brand__mark" aria-hidden="true">◆</span>
					<span class="lg-brand__name">Luz Gomez</span>
				<?php endif; ?>
			</a>

			<!-- Etiqueta HTML5 semántica: navegación principal -->
			<nav id="lg-main-nav" class="lg-nav" aria-label="Navegación principal">
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'menu_class'     => 'lg-nav__list',
							'fallback_cb'    => false,
						)
					);
				} else {
					?>
					<ul class="lg-nav__list">
						<li><a href="#hero" class="lg-nav__link">Inicio</a></li>
						<li><a href="#categorias" class="lg-nav__link">Categorías</a></li>
						<li><a href="#productos-destacados" class="lg-nav__link">Tienda</a></li>
						<li><a href="#personalizados" class="lg-nav__link">Personalizados</a></li>
						<li><a href="#redes-sociales" class="lg-nav__link">Contacto</a></li>
					</ul>
					<?php
				}
				?>
			</nav>

			<!-- Acciones de usuario, redes rápidas, WhatsApp y carrito -->
			<div class="lg-header__actions">
				<a
					href="<?php echo esc_url( $contact['instagram'] ); ?>"
					target="_blank"
					rel="noopener noreferrer"
					class="lg-icon-btn d-none d-md-inline-flex"
					aria-label="Instagram de Luz Gomez"
				>
					IG
				</a>
				<a
					href="<?php echo esc_url( luz_gomez_whatsapp_url() ); ?>"
					target="_blank"
					rel="noopener noreferrer"
					class="lg-whatsapp-pill d-none d-sm-inline-flex"
					aria-label="Conectar por WhatsApp"
				>
					WhatsApp
				</a>
				<button
					type="button"
					id="lg-cart-toggle"
					class="lg-cart-btn"
					aria-label="Abrir carrito de compras"
					aria-expanded="false"
					aria-controls="lg-cart-drawer"
				>
					<span>Bolsa</span>
					<span id="lg-cart-count" class="lg-cart-btn__badge">0</span>
				</button>

				<!-- Botón hamburguesa para móviles -->
				<button
					type="button"
					id="lg-menu-toggle"
					class="lg-hamburger"
					aria-label="Abrir menú de navegación"
					aria-expanded="false"
					aria-controls="lg-main-nav"
				>
					<span class="lg-hamburger__line"></span>
					<span class="lg-hamburger__line"></span>
					<span class="lg-hamburger__line"></span>
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Panel lateral del carrito interactivo -->
<aside id="lg-cart-drawer" class="lg-cart-drawer" aria-hidden="true" aria-label="Carrito de compras">
	<div class="lg-cart-drawer__header">
		<h2 class="lg-cart-drawer__title">Tu bolsa de joyas</h2>
		<button type="button" id="lg-cart-close" class="lg-cart-drawer__close" aria-label="Cerrar bolsa">&times;</button>
	</div>
	<div id="lg-cart-items" class="lg-cart-drawer__body">
		<p class="lg-cart-drawer__empty">Tu bolsa está vacía. Agrega una joya para comenzar.</p>
	</div>
	<div class="lg-cart-drawer__footer">
		<div class="lg-cart-drawer__row">
			<span>Subtotal:</span>
			<strong id="lg-cart-subtotal">S/ 0.00</strong>
		</div>
		<a id="lg-cart-whatsapp-checkout" href="<?php echo esc_url( luz_gomez_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="lg-btn lg-btn--primary w-100 text-center">
			Finalizar pedido por WhatsApp
		</a>
	</div>
</aside>
<div id="lg-cart-backdrop" class="lg-backdrop" aria-hidden="true"></div>

<main id="lg-main-content">
