<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;


$args = array(
	'post_type' => 'muso-album',
	'posts_per_page' => -1
);
$more_albums = Timber::get_posts($args);
shuffle($more_albums);
$context['more_albums'] = array_slice($more_albums, 1, 4);

$artist_slug = wp_get_post_terms($post->ID,'artist')[0]->slug;
$artist_args = array(
	'post_type'   => 'portfolio',
	'post_status' => 'publish',
	'numberposts' => 1,
	'name' => $artist_slug
);
$artist = Timber::get_post($artist_args);

$context['artist_name'] = $artist->post_title;
$context['artist_perma'] = get_permalink($artist->id);

echo "<script> console.dir(" . json_encode($context) . ")</script>";

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
