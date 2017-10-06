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

$context['social_links'] = array();

$context['social_links']['facebook'] = $post->facebook;
$context['social_links']['instagram'] = $post->instagram;
$context['social_links']['twitter'] = $post->twitter;
$context['social_links']['tumblr'] = $post->tumblr;
$context['social_links']['soundcloud'] = $post->soundcloud;
$context['social_links']['youtube'] = $post->youtube;
$context['social_links']['itunes'] = $post->apple;
$context['social_links']['spotify'] = $post->spotify;
$context['social_links']['website'] = $post->website;
$context['social_links']['snapchat'] = $post->snapchat;

echo "<script> console.dir(" . json_encode($context) . ")</script>";

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-roster.twig' ), $context );
}
