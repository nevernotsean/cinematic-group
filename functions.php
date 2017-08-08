<?php

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
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
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

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
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
	'key' => 'group_59888a36b9b39',
	'title' => 'Homepage Video',
	'fields' => array (
		array (
			'key' => 'field_5988e0521f2be',
			'label' => 'Vimeo link',
			'name' => 'vimeo_link',
			'type' => 'url',
			'instructions' => 'From your Vimeo Pro account, select the video > settings > Video File > "Access your video files" > High Def',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => 'https://player.vimeo.com/external/211015222.hd.mp4?s=06f330a7dcf6755400b63de0a9abb9a26b7bf33b&profile_id=174',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'page',
				'operator' => '==',
				'value' => '1928',
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
		"hierarchical" => false,
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
		"taxonomies" => array( "radio_categories" ),
	);

	register_post_type( "radio", $args );
}

add_action( 'init', 'cptui_register_my_cpts_radio' );

// add radio category
function cptui_register_my_taxes_radio_categories() {

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
		"hierarchical" => false,
		"label" => "Radio Categories",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array( 'slug' => 'radio_categories', 'with_front' => true, ),
		"show_admin_column" => false,
		"show_in_rest" => false,
		"rest_base" => "",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "radio_categories", array( "radio" ), $args );
}

add_action( 'init', 'cptui_register_my_taxes_radio_categories' );
