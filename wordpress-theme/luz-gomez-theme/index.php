<?php
/**
 * Plantilla de respaldo principal (index.php) requerida por WordPress.
 *
 * @package LuzGomezTheme
 */

get_header();
?>

<section class="lg-section">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="row g-4">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<div class="col-12 col-md-6 col-lg-4">
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'lg-product-card p-4' ); ?>>
							<h2 class="lg-product-card__title">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h2>
							<div class="mt-2">
								<?php the_excerpt(); ?>
							</div>
						</article>
					</div>
				<?php endwhile; ?>
			</div>
		<?php else : ?>
			<p>No hay publicaciones disponibles en este momento.</p>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
