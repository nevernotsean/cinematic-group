<?php
/*
 * Template Name: Releases Page
 * Description: A Page Template for releases
 */

$context = Timber::get_context();
$args = array(
  'post_type' => 'muso-album'
);
$context['page'] = Timber::get_post();
$context['posts'] = Timber::get_posts($args);

Timber::render( array( 'page-releases.twig' ), $context );
