<?php
/**
 * Pie de página semántico del tema Luz Gomez Theme.
 *
 * @package LuzGomezTheme
 */

$contact = luz_gomez_get_contact_config();
?>
</main>

<!-- Etiqueta HTML5 semántica: pie de página completo -->
<footer id="redes-sociales" class="lg-footer">
	<div class="container">
		<div class="row g-4">
			<div class="col-12 col-md-6 col-lg-4">
				<h3 class="lg-footer__title">Luz Gomez Joyería</h3>
				<p class="lg-footer__desc">
					Alta joyería en oro 18k, plata 925 y grabados personalizados. Piezas creadas para convertir momentos en recuerdos eternos.
				</p>
				<div class="lg-social-links" aria-label="Redes sociales de Luz Gomez">
					<a href="<?php echo esc_url( $contact['instagram'] ); ?>" target="_blank" rel="noopener noreferrer" class="lg-social-links__item">
						Instagram
					</a>
					<a href="<?php echo esc_url( $contact['facebook'] ); ?>" target="_blank" rel="noopener noreferrer" class="lg-social-links__item">
						Facebook
					</a>
					<a href="<?php echo esc_url( $contact['tiktok'] ); ?>" target="_blank" rel="noopener noreferrer" class="lg-social-links__item">
						TikTok
					</a>
					<a href="<?php echo esc_url( luz_gomez_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="lg-social-links__item lg-social-links__item--whatsapp">
						WhatsApp
					</a>
				</div>
			</div>

			<div class="col-6 col-md-3 col-lg-2">
				<h4 class="lg-footer__subtitle">Tienda</h4>
				<ul class="lg-footer__list">
					<li><a href="#hero">Inicio</a></li>
					<li><a href="#categorias">Categorías</a></li>
					<li><a href="#productos-destacados">Nuestros favoritos</a></li>
					<li><a href="#personalizados">Personalizados</a></li>
				</ul>
			</div>

			<div class="col-6 col-md-3 col-lg-3">
				<h4 class="lg-footer__subtitle">Ayuda y Garantías</h4>
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'footer',
							'container'      => false,
							'menu_class'     => 'lg-footer__list',
						)
					);
				} else {
					?>
					<ul class="lg-footer__list">
						<li><a href="#productos-destacados">Guía de tallas</a></li>
						<li><a href="#productos-destacados">Cuidados de oro y plata</a></li>
						<li><a href="#productos-destacados">Envíos a todo el Perú</a></li>
						<li><a href="#productos-destacados">Política de privacidad</a></li>
					</ul>
					<?php
				}
				?>
			</div>

			<div class="col-12 col-lg-3">
				<h4 class="lg-footer__subtitle">Contacto Directo</h4>
				<address class="lg-footer__address">
					<p>📍 <?php echo esc_html( $contact['address'] ); ?></p>
					<p>📱 <?php echo esc_html( $contact['whatsapp_display'] ); ?></p>
					<p>✉️ <a href="mailto:<?php echo esc_attr( $contact['email'] ); ?>"><?php echo esc_html( $contact['email'] ); ?></a></p>
				</address>
				<a
					href="<?php echo esc_url( luz_gomez_whatsapp_url( 'Hola Luz Gomez Joyería, deseo atención personalizada.' ) ); ?>"
					target="_blank"
					rel="noopener noreferrer"
					class="lg-btn lg-btn--outline mt-2"
				>
					Chatear por WhatsApp
				</a>
			</div>
		</div>

		<div class="lg-footer__bottom">
			<p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> Luz Gomez Joyería. Todos los derechos reservados.</p>
		</div>
	</div>
</footer>

<!-- Botón flotante conectado directamente a WhatsApp -->
<a
	href="<?php echo esc_url( luz_gomez_whatsapp_url( 'Hola Luz Gomez Joyería, quisiera realizar una consulta sobre sus joyas.' ) ); ?>"
	target="_blank"
	rel="noopener noreferrer"
	class="lg-floating-whatsapp"
	aria-label="Conectar por WhatsApp con Luz Gomez"
>
	<span>WhatsApp</span>
</a>

<!-- Notificación accesible al agregar al carrito -->
<div id="lg-toast" class="lg-toast" role="status" aria-live="polite" aria-hidden="true"></div>

<?php wp_footer(); ?>
</body>
</html>
