<?php
/**
 * Plantilla de la página de inicio (front-page.php) para Luz Gomez Theme.
 * Usa HTML5 semántico estricto (<section>, <article>, <figure>) y Bootstrap Grid.
 *
 * @package LuzGomezTheme
 */

get_header();
$contact = luz_gomez_get_contact_config();
$theme_uri = get_template_directory_uri();

// Datos de categorías para el Grid de Bootstrap.
$categories = array(
	array(
		'name' => 'Anillos',
		'desc' => 'Diseños eternos en oro 18k y plata 925.',
		'img'  => $theme_uri . '/assets/images/anillo-diamante.jpg',
		'alt'  => 'Anillo de compromiso en oro blanco 18k Luz Gomez',
	),
	array(
		'name' => 'Collares',
		'desc' => 'Cadenas delicadas y dijes con brillo único.',
		'img'  => $theme_uri . '/assets/images/collar-rosegold.jpg',
		'alt'  => 'Collar corazón en oro rosa 18k Luz Gomez',
	),
	array(
		'name' => 'Aretes',
		'desc' => 'Perlas naturales y pendientes de gala.',
		'img'  => $theme_uri . '/assets/images/aretes-perla.jpg',
		'alt'  => 'Aretes de perla natural y oro 18k Luz Gomez',
	),
	array(
		'name' => 'Pulseras y Esclavas',
		'desc' => 'Pulseras tenis y brazaletes grabables.',
		'img'  => $theme_uri . '/assets/images/pulsera-tenis.jpg',
		'alt'  => 'Pulsera tenis en plata 925 con zafiro Luz Gomez',
	),
	array(
		'name' => 'Sets de Regalo',
		'desc' => 'Estuches de terciopelo para ocasiones especiales.',
		'img'  => $theme_uri . '/assets/images/set-regalo.jpg',
		'alt'  => 'Set de joyería en estuche de terciopelo Luz Gomez',
	),
	array(
		'name' => 'Joyas Personalizadas',
		'desc' => 'Grabado láser con nombres, fechas o iniciales.',
		'img'  => $theme_uri . '/assets/images/joya-grabada.jpg',
		'alt'  => 'Dije medallón con grabado personalizado Luz Gomez',
	),
);

// Productos destacados con botones funcionales para agregar al carrito.
$featured_products = array(
	array(
		'id'       => 1,
		'name'     => 'Anillo Diamante Eternidad',
		'category' => 'Anillos · Oro Blanco 18k',
		'price'    => 299.90,
		'old'      => 350.00,
		'img'      => $theme_uri . '/assets/images/anillo-diamante.jpg',
	),
	array(
		'id'       => 2,
		'name'     => 'Collar Corazón Rose Gold',
		'category' => 'Collares · Oro Rosa 18k',
		'price'    => 159.90,
		'old'      => 199.90,
		'img'      => $theme_uri . '/assets/images/collar-rosegold.jpg',
	),
	array(
		'id'       => 3,
		'name'     => 'Aretes Perla Clásica',
		'category' => 'Aretes · Oro Amarillo 18k',
		'price'    => 249.90,
		'old'      => 289.90,
		'img'      => $theme_uri . '/assets/images/aretes-perla.jpg',
	),
	array(
		'id'       => 4,
		'name'     => 'Pulsera Tenis Zafiro',
		'category' => 'Pulseras · Plata 925',
		'price'    => 349.90,
		'old'      => 439.90,
		'img'      => $theme_uri . '/assets/images/pulsera-tenis.jpg',
	),
	array(
		'id'       => 5,
		'name'     => 'Set Boda Elegance',
		'category' => 'Sets de Regalo · Oro 18k',
		'price'    => 599.90,
		'old'      => 720.00,
		'img'      => $theme_uri . '/assets/images/set-regalo.jpg',
	),
	array(
		'id'       => 6,
		'name'     => 'Dije Inicial Personalizado',
		'category' => 'Personalizados · Oro 18k',
		'price'    => 189.90,
		'old'      => 0,
		'img'      => $theme_uri . '/assets/images/joya-grabada.jpg',
	),
);
?>

<!-- Etiqueta HTML5 semántica: Sección Hero Principal con galería en movimiento -->
<section id="hero" class="lg-hero">
	<div class="container">
		<div class="row align-items-center g-4 g-lg-5">
			<div class="col-12 col-lg-5">
				<p class="lg-kicker">Alta Joyería · Oro 18k y Plata 925</p>
				<h1 class="lg-hero__title">Joyas que convierten momentos en recuerdos</h1>
				<p class="lg-hero__subtitle">
					Encuentra la joya perfecta para sorprender a quienes más quieres. Oro 18k, plata 925 y grabados personalizados con entrega segura.
				</p>
				<div class="lg-hero__actions">
					<a href="#productos-destacados" class="lg-btn lg-btn--primary">Ver colección</a>
					<button
						type="button"
						class="lg-btn lg-btn--outline js-add-to-cart"
						data-id="6"
						data-name="Dije Inicial Personalizado"
						data-price="189.90"
						data-img="<?php echo esc_url( $theme_uri . '/assets/images/joya-grabada.jpg' ); ?>"
					>
						Agregar dije personalizado
					</button>
				</div>
			</div>

			<div class="col-12 col-lg-7">
				<!-- Contenedor de imagen responsiva con movimiento suave automático (Ken Burns + Slider) -->
				<figure class="lg-hero__media" id="lg-hero-slider">
					<img
						src="<?php echo esc_url( $theme_uri . '/assets/images/hero-joyeria.jpg' ); ?>"
						alt="Colección de alta joyería Luz Gomez en oro 18k, diamantes y perlas"
						class="lg-hero__img is-active"
					>
					<img
						src="<?php echo esc_url( $theme_uri . '/assets/images/anillo-diamante.jpg' ); ?>"
						alt="Anillo Diamante Eternidad en oro blanco 18k"
						class="lg-hero__img"
					>
					<img
						src="<?php echo esc_url( $theme_uri . '/assets/images/set-regalo.jpg' ); ?>"
						alt="Set de regalo en terciopelo rosa Luz Gomez"
						class="lg-hero__img"
					>
					<figcaption class="visually-hidden">Galería animada de alta joyería Luz Gomez</figcaption>
				</figure>
			</div>
		</div>
	</div>
</section>

<!-- Etiqueta HTML5 semántica: Sección de Categorías con Grid de Bootstrap -->
<section id="categorias" class="lg-section">
	<div class="container">
		<header class="lg-section__header">
			<p class="lg-kicker">Colecciones Curadas</p>
			<h2 class="lg-section__title">Encuentra la joya perfecta</h2>
		</header>

		<div class="row g-4">
			<?php foreach ( $categories as $cat ) : ?>
				<div class="col-12 col-sm-6 col-lg-4">
					<!-- Etiqueta HTML5 semántica <article> para cada tarjeta de categoría -->
					<article class="lg-category-card">
						<figure class="lg-category-card__media">
							<img
								src="<?php echo esc_url( $cat['img'] ); ?>"
								alt="<?php echo esc_attr( $cat['alt'] ); ?>"
								class="lg-img-fluid lg-img-motion"
							>
						</figure>
						<div class="lg-category-card__body">
							<h3 class="lg-category-card__title"><?php echo esc_html( $cat['name'] ); ?></h3>
							<p class="lg-category-card__desc"><?php echo esc_html( $cat['desc'] ); ?></p>
							<a href="#productos-destacados" class="lg-category-card__link">Explorar colección &rarr;</a>
						</div>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Etiqueta HTML5 semántica: Productos Destacados con todos los botones conectados al carrito -->
<section id="productos-destacados" class="lg-section lg-section--warm">
	<div class="container">
		<header class="lg-section__header">
			<p class="lg-kicker">Selección Boutique</p>
			<h2 class="lg-section__title">Nuestros favoritos</h2>
		</header>

		<div class="row g-4">
			<?php foreach ( $featured_products as $prod ) : ?>
				<div class="col-12 col-sm-6 col-lg-4">
					<article class="lg-product-card">
						<figure class="lg-product-card__media">
							<img
								src="<?php echo esc_url( $prod['img'] ); ?>"
								alt="<?php echo esc_attr( $prod['name'] . ' - ' . $prod['category'] ); ?>"
								class="lg-img-fluid lg-img-motion"
							>
						</figure>
						<div class="lg-product-card__body">
							<p class="lg-product-card__meta"><?php echo esc_html( $prod['category'] ); ?></p>
							<h3 class="lg-product-card__title"><?php echo esc_html( $prod['name'] ); ?></h3>
							<div class="lg-product-card__pricing">
								<span class="lg-price">S/ <?php echo esc_html( number_format( $prod['price'], 2 ) ); ?></span>
								<?php if ( $prod['old'] > 0 ) : ?>
									<span class="lg-price-old">S/ <?php echo esc_html( number_format( $prod['old'], 2 ) ); ?></span>
								<?php endif; ?>
							</div>
							<div class="lg-product-card__actions">
								<button
									type="button"
									class="lg-btn lg-btn--primary w-100 js-add-to-cart"
									data-id="<?php echo esc_attr( $prod['id'] ); ?>"
									data-name="<?php echo esc_attr( $prod['name'] ); ?>"
									data-price="<?php echo esc_attr( $prod['price'] ); ?>"
									data-img="<?php echo esc_url( $prod['img'] ); ?>"
								>
									Agregar al carrito
								</button>
								<a
									href="<?php echo esc_url( luz_gomez_whatsapp_url( 'Hola Luz Gomez Joyería, quiero pedir: ' . $prod['name'] . ' (S/ ' . number_format( $prod['price'], 2 ) . ')' ) ); ?>"
									target="_blank"
									rel="noopener noreferrer"
									class="lg-btn lg-btn--outline w-100"
								>
									Pedir por WhatsApp
								</a>
							</div>
						</div>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- Etiqueta HTML5 semántica: Sección de Joyas Personalizadas -->
<section id="personalizados" class="lg-section">
	<div class="container">
		<div class="lg-banner-custom">
			<div class="row align-items-center g-4">
				<div class="col-12 col-lg-7">
					<p class="lg-kicker">Grabado Láser de Precisión</p>
					<h2 class="lg-section__title">Haz que tu joya sea única con un grabado especial</h2>
					<p class="lg-banner-custom__text">
						Personaliza anillos, esclavas y medallones con iniciales, nombres o fechas importantes. Envíos protegidos a todo el Perú.
					</p>
					<div class="d-flex flex-wrap gap-3 mt-4">
						<button
							type="button"
							class="lg-btn lg-btn--primary js-add-to-cart"
							data-id="9"
							data-name="Esclava Minimalista Grabable"
							data-price="229.90"
							data-img="<?php echo esc_url( $theme_uri . '/assets/images/joya-grabada.jpg' ); ?>"
						>
							Agregar esclava grabable (S/ 229.90)
						</button>
						<a
							href="<?php echo esc_url( luz_gomez_whatsapp_url( 'Hola Luz Gomez, quiero solicitar una joya personalizada con grabado.' ) ); ?>"
							target="_blank"
							rel="noopener noreferrer"
							class="lg-btn lg-btn--outline"
						>
							Asesoría por WhatsApp
						</a>
					</div>
				</div>
				<div class="col-12 col-lg-5">
					<figure class="lg-banner-custom__media">
						<img
							src="<?php echo esc_url( $theme_uri . '/assets/images/joya-grabada.jpg' ); ?>"
							alt="Medallón y esclava grabada en oro 18k Luz Gomez"
							class="lg-img-fluid lg-img-motion"
						>
					</figure>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
