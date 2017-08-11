<?php
/*
 * Template Name: Home Page
 * Description: A Page Template for Home
 */

$context = Timber::get_context();
$context['page'] = Timber::get_post();
$context['posts'] = Timber::get_posts('numberposts=5');
// $context['news'] = Timber::get_posts('category_name=news&numberposts=3');
// $context['features'] = Timber::get_posts('category_name=features&numberposts=2');
// echo "<script> console.dir(" . json_encode($context) . ")</script>";
Timber::render( array( 'page-home.twig' ), $context );
