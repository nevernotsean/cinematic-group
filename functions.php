<?php
include 'ChromePhp.php';
// ChromePhp::log('Hello console! from functions.php line 1');

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_image_size('archiveImageCropped', 800, 400, true);
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadStyles' ) );
		parent::__construct();
	}

	function loadScripts() {
		wp_enqueue_script( 'app', get_template_directory_uri() . '/dist/bundle.js', array(), '1.0.0', true );
	}

	function loadStyles() {
		// Add main stylesheet
		wp_enqueue_style( 'site', get_template_directory_uri() . '/dist/css/app.css');
	}

	function add_to_context( $context ) {
		// $context['foo'] = 'bar';
		// $context['stuff'] = 'I am a value set in your functions.php file';
		// $context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}
}

new StarterSite();


// ACF additions

// add homepage video fields
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
	'key' => 'group_597f93f9394b9',
	'title' => 'TV',
	'fields' => array (
		array (
			'key' => 'field_597f942e87567',
			'label' => 'Youtube URL',
			'name' => 'youtube_url',
			'type' => 'url',
			'instructions' => 'Provide the Youtube video link (i.e. https://youtu.be/Hmg9Ljz62pQ or https://www.youtube.com/watch?v=Hmg9Ljz62pQ)',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 'https://youtu.be/Hmg9Ljz62pQ',
			'placeholder' => '',
		),
		array (
			'key' => 'field_59b92406bb25a',
			'label' => 'Hover Preview',
			'name' => 'hover_preview',
			'type' => 'file',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'return_format' => 'array',
			'library' => 'all',
			'min_size' => '',
			'max_size' => '',
			'mime_types' => 'mp4, webm, ogg',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'tv',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'acf_after_title',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;

// add albums custom field
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
	'key' => 'group_597e0da194439',
	'title' => 'Album',
	'fields' => array (
		array (
			'key' => 'field_597e0da51875d',
			'label' => 'Purchase Links',
			'name' => 'purchase_links',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'collapsed' => '',
			'min' => 0,
			'max' => 0,
			'layout' => 'table',
			'button_label' => 'Add Link',
			'sub_fields' => array (
				array (
					'key' => 'field_597e0db91875e',
					'label' => 'Link',
					'name' => 'link',
					'type' => 'url',
					'instructions' => '',
					'required' => 1,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '',
				),
				array (
					'key' => 'field_597e0dce1875f',
					'label' => 'Link Name',
					'name' => 'link_name',
					'type' => 'text',
					'instructions' => '',
					'required' => 1,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 'iTunes',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
			),
		),
		array (
			'key' => 'field_597e0ee1ab8df',
			'label' => 'Album Description',
			'name' => 'album_description',
			'type' => 'textarea',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => '',
			'maxlength' => '',
			'rows' => '',
			'new_lines' => 'wpautop',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'muso-album',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'acf_after_title',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;

// add tv custom field
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
	'key' => 'group_597f93f9394b9',
	'title' => 'TV',
	'fields' => array (
		array (
			'key' => 'field_597f942e87567',
			'label' => 'Youtube URL',
			'name' => 'youtube_url',
			'type' => 'url',
			'instructions' => 'Provide the Youtube video link (i.e. https://youtu.be/Hmg9Ljz62pQ or https://www.youtube.com/watch?v=Hmg9Ljz62pQ)',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 'https://youtu.be/Hmg9Ljz62pQ',
			'placeholder' => '',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'tv',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'acf_after_title',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;

// add tv post type
function cptui_register_my_cpts_tv() {

	/**
	 * Post Type: TV.
	 */

	$labels = array(
		"name" => __( 'TV', '' ),
		"singular_name" => __( 'TV', '' ),
		"menu_name" => __( 'TV Posts', '' ),
		"all_items" => __( 'All TV Posts', '' ),
		"add_new_item" => __( 'Add New TV Post', '' ),
		"edit_item" => __( 'Edit TV Post', '' ),
		"new_item" => __( 'New TV Post', '' ),
	);

	$args = array(
		"label" => __( 'TV', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => true,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "tv", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title", "editor", "thumbnail", "trackbacks", "author" ),
		"taxonomies" => array( "tv_category" ),
	);

	register_post_type( "tv", $args );
}

add_action( 'init', 'cptui_register_my_cpts_tv' );

// add tv category
function cptui_register_my_taxes_tv_category() {

	/**
	 * Taxonomy: TV Categories.
	 */

	$labels = array(
		"name" => __( 'TV Categories', '' ),
		"singular_name" => __( 'TV Category', '' ),
	);

	$args = array(
		"label" => __( 'TV Categories', '' ),
		"labels" => $labels,
		"public" => true,
		"hierarchical" => true,
		"label" => "TV Categories",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array( 'slug' => 'tv_category', 'with_front' => true, ),
		"show_admin_column" => false,
		"show_in_rest" => false,
		"rest_base" => "",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "tv_category", array( "tv" ), $args );
}

add_action( 'init', 'cptui_register_my_taxes_tv_category' );


// add radio post type
function cptui_register_my_cpts_radio() {

	/**
	 * Post Type: Radio.
	 */

	$labels = array(
		"name" => __( 'Radio', '' ),
		"singular_name" => __( 'Radio', '' ),
		"menu_name" => __( 'Radio Posts', '' ),
		"all_items" => __( 'All Radio Posts', '' ),
		"add_new_item" => __( 'Add New Radio Post', '' ),
		"edit_item" => __( 'Edit Radio Post', '' ),
		"new_item" => __( 'New Radio Post', '' ),
	);

	$args = array(
		"label" => __( 'Radio', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => true,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array( "slug" => "radio", "with_front" => true ),
		"query_var" => true,
		"supports" => array( "title", "editor", "thumbnail", "trackbacks", "revisions", "author" ),
		"taxonomies" => array( "radio_category" ),
	);

	register_post_type( "radio", $args );
}

add_action( 'init', 'cptui_register_my_cpts_radio' );

// add radio category
function cptui_register_my_taxes_radio_category() {

	/**
	 * Taxonomy: Radio Categories.
	 */

	$labels = array(
		"name" => __( 'Radio Categories', '' ),
		"singular_name" => __( 'Radio Category', '' ),
	);

	$args = array(
		"label" => __( 'Radio Categories', '' ),
		"labels" => $labels,
		"public" => true,
		"hierarchical" => true,
		"label" => "Radio Categories",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array( 'slug' => 'radio_category', 'with_front' => true, ),
		"show_admin_column" => false,
		"show_in_rest" => false,
		"rest_base" => "",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "radio_category", array( "radio" ), $args );
}

add_action( 'init', 'cptui_register_my_taxes_radio_category' );

// add roster category 
function cptui_register_my_taxes_roster_category() {
	
	/**
	 * Taxonomy: Roster Categories.
	 */

	$labels = array(
		"name" => __( 'Roster Categories', '' ),
		"singular_name" => __( 'Roster Category', '' ),
	);

	$args = array(
		"label" => __( 'Roster Categories', '' ),
		"labels" => $labels,
		"public" => true,
		"hierarchical" => true,
		"label" => "Roster Categories",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array( 'slug' => 'roster_category', 'with_front' => true, ),
		"show_admin_column" => false,
		"show_in_rest" => false,
		"rest_base" => "",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "roster_category", array( "portfolio" ), $args );
}

add_action( 'init', 'cptui_register_my_taxes_roster_category' );

// TV mapping
Routes::map('tv/:category', function($params){
	$query = 'post_type=tv&tv_category=' . $params['category'];
    Routes::load('archive-tv.php', null, $query, 200);
});

Routes::map('tv/:category/page/:pg', function($params){
	$query = 'post_type=tv&tv_category=' . $params['category'] . '&paged='.$params['pg'];
    Routes::load('archive-tv.php', null, $query);
});

// Radio Mapping
Routes::map('radio/:category', function($params){
	$query = 'post_type=radio&radio_category=' . $params['category'];
    Routes::load('archive-radio.php', null, $query, 200);
});

Routes::map('radio/:category/page/:pg', function($params){
	$query = 'post_type=radio&radio_category=' . $params['category'] . '&paged='.$params['pg'];
    Routes::load('archive-radio.php', null, $query);
});

// Portfolio (Roster) Mapping
Routes::map('roster/:category', function($params){
	$query = 'post_type=portfolio&posts_per_page=-1&orderby=title&order=ASC&roster_category=' . $params['category'];
    Routes::load('archive-portfolio.php', null, $query, 200);
});

Routes::map('roster/:category/page/:pg', function($params){
	$query = 'post_type=portfolio&posts_per_page=-1&orderby=title&order=ASC&roster_category=' . $params['category'] . '&paged='.$params['pg'];
    Routes::load('archive-portfolio.php', null, $query);
});

