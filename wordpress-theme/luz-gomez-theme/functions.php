<?php
/**
 * Funciones y definiciones del tema Luz Gomez Theme.
 *
 * @package LuzGomezTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Evita acceso directo al archivo.
}

define( 'LUZ_GOMEZ_VERSION', '1.0.0' );

/**
 * Configuración central de contacto, WhatsApp y redes sociales del tema.
 * Modifica aquí tu número de WhatsApp real (sin '+', ejemplo: '51987654321').
 */
function luz_gomez_get_contact_config() {
	return array(
		'whatsapp_display' => '+51 953 323 578',
		'whatsapp_raw'     => '51953323578',
		'email'            => 'contacto@luzgomez.com',
		'address'          => 'Perú · Atención online',
		'instagram'        => 'https://instagram.com/luzgomezjoyeria',
		'facebook'         => 'https://facebook.com/luzgomezjoyeria',
		'tiktok'           => 'https://tiktok.com/@luzgomezjoyeria',
	);
}

/**
 * Genera un enlace conectado a WhatsApp con mensaje prellenado.
 */
function luz_gomez_whatsapp_url( $message = 'Hola Luz Gomez Joyería, quisiera asesoría sobre sus joyas.' ) {
	$config = luz_gomez_get_contact_config();
	return 'https://wa.me/' . rawurlencode( $config['whatsapp_raw'] ) . '?text=' . rawurlencode( $message );
}

/**
 * Configuración inicial del tema: soporte HTML5, miniaturas y menús de navegación.
 */
function luz_gomez_theme_setup() {
	// Soporte para título dinámico gestionado por WordPress (<title>).
	add_theme_support( 'title-tag' );

	// Soporte para imágenes destacadas (Thumbnails) en entradas, páginas y productos.
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'luz-gomez-product', 600, 450, true );
	add_image_size( 'luz-gomez-hero', 1200, 800, true );

	// Soporte estricto para marcado HTML5 semántico.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Soporte para logotipo personalizado desde el Personalizador de WordPress.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 60,
			'width'       => 220,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	// Registro de menús de navegación (Menú Principal y Menú del Footer).
	register_nav_menus(
		array(
			'primary' => __( 'Menú Principal', 'luz-gomez-theme' ),
			'footer'  => __( 'Menú del Pie de Página', 'luz-gomez-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'luz_gomez_theme_setup' );

/**
 * Encolado correcto de Bootstrap 5, tipografías Google Fonts, CSS compilado desde SASS y Vanilla JS.
 * Cumple con el uso obligatorio de wp_enqueue_style y wp_enqueue_script.
 */
function luz_gomez_enqueue_assets() {
	// 1. Tipografías Google Fonts: Cormorant Garamond (Serif títulos) + Plus Jakarta Sans (Sans-serif textos).
	wp_enqueue_style(
		'luz-gomez-google-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	// 2. Bootstrap 5 CSS (Grid y componentes base).
	wp_enqueue_style(
		'bootstrap-css',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
		array(),
		'5.3.3'
	);

	// 3. Hoja de estilos principal compilada desde assets/scss/main.scss -> assets/css/main.css.
	wp_enqueue_style(
		'luz-gomez-main-css',
		get_template_directory_uri() . '/assets/css/main.css',
		array( 'bootstrap-css', 'luz-gomez-google-fonts' ),
		LUZ_GOMEZ_VERSION
	);

	// 4. Hoja de estilos base style.css del tema.
	wp_enqueue_style(
		'luz-gomez-style',
		get_stylesheet_uri(),
		array( 'luz-gomez-main-css' ),
		LUZ_GOMEZ_VERSION
	);

	// 5. Bootstrap Bundle JS (opcional para utilidades de Bootstrap).
	wp_enqueue_script(
		'bootstrap-js',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
		array(),
		'5.3.3',
		true
	);

	// 6. Vanilla JavaScript principal del tema (Manipulación del CSSOM, menú móvil, slider y carrito).
	wp_enqueue_script(
		'luz-gomez-main-js',
		get_template_directory_uri() . '/assets/js/main.js',
		array(),
		LUZ_GOMEZ_VERSION,
		true
	);

	// Pasa configuración segura de WhatsApp al script Vanilla JS.
	$config = luz_gomez_get_contact_config();
	wp_localize_script(
		'luz-gomez-main-js',
		'LuzGomezConfig',
		array(
			'whatsappNumber' => $config['whatsapp_raw'],
			'brandName'      => 'Luz Gomez Joyería',
			'currency'       => 'S/',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'luz_gomez_enqueue_assets' );
