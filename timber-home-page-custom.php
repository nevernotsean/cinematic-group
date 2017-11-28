<?php
/*
 * Template Name: Home Page
 * Description: A Page Template for Home
 */

$context = Timber::get_context();
$context['page'] = Timber::get_post();
$context['radio'] = Timber::get_posts('post_type=radio&numberposts=1');
$context['features'] = Timber::get_posts('category_name=features&numberposts=1');

$featureID = $context['features'][0]->ID;
$context['posts'] = Timber::get_posts(
    array(
        'numberposts' => 3,
        'post__not_in' => array($featureID)
    )
);

echo "<script> console.dir(" . json_encode($featureID) . ")</script>";
Timber::render( array( 'page-home.twig' ), $context );
