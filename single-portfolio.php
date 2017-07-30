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
	'artist' => $post->slug
);
$related_albums = Timber::get_posts($args);

$context['related_albums'] = $related_albums;

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-roster.twig' ), $context );
}
