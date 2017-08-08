<?php
/*
 * Template Name: Home Page
 * Description: A Page Template for Home
 */

$context = Timber::get_context();
$context['page'] = Timber::get_post();
$context['news'] = Timber::get_posts('category_name=news');
$context['features'] = Timber::get_posts('category_name=features&numberposts=2');
// echo "<script> console.dir(" . json_encode($context) . ")</script>";
Timber::render( array( 'page-home.twig' ), $context );
