<?php
/*
 * Template Name: Home Page
 * Description: A Page Template for Home
 */

$context = Timber::get_context();
$context['page'] = Timber::get_post();
$context['posts'] = Timber::get_posts('numberposts=5');
$context['radio'] = Timber::get_posts('post_type=radio&numberposts=1');
$context['features'] = Timber::get_posts('category_name=features&numberposts=1');
// echo "<script> console.dir(" . json_encode($context) . ")</script>";
Timber::render( array( 'page-home.twig' ), $context );
