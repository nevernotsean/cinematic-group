<?php
/*
 * Template Name: Home Page
 * Description: A Page Template for Home
 */

$context = Timber::get_context();
$context['news'] = Timber::get_posts('category_name=news');
$context['features'] = Timber::get_posts('category_name=features&numberposts=2');

Timber::render( array( 'page-home.twig' ), $context );
