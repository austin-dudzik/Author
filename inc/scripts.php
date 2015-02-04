<?php

/*
 * Front-end scripts
 */
function ct_author_load_scripts_styles() {

	wp_register_style( 'ct-author-google-fonts', '//fonts.googleapis.com/css?family=Rokkitt:400|Lato:400');

	// enqueue on front-end only
	if( ! is_admin() ) {

		// main JS file
		wp_enqueue_script('ct-author-js', get_template_directory_uri() . '/js/build/production.min.js#ct_author_asyncload', array('jquery'),'', true);

		// Google Fonts
		wp_enqueue_style('ct-author-google-fonts');

		// Font Awesome
		wp_enqueue_style('font-awesome', get_template_directory_uri() . '/assets/font-awesome/css/font-awesome.min.css');

		// Stylesheet
		wp_enqueue_style('style', get_template_directory_uri() . 'style.min.css');
	}
	// enqueue comment-reply script only on posts & pages with comments open ( included in WP core )
	if( is_singular() && comments_open() && get_option('thread_comments') ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action('wp_enqueue_scripts', 'ct_author_load_scripts_styles' );

/*
 * Back-end scripts
 */
function ct_author_enqueue_admin_styles($hook){

	// if is user profile page
	if('profile.php' == $hook || 'user-edit.php' == $hook ){

		// Enqueues all scripts, styles, settings, and templates necessary to use all media JavaScript APIs.
		wp_enqueue_media();

		// enqueue the JS needed to utilize media uploader on profile image upload
		wp_enqueue_script('ct-author-profile-image-uploader', get_template_directory_uri() . '/js/build/profile-image-uploader.min.js');
	}
}
add_action('admin_enqueue_scripts',	'ct_author_enqueue_admin_styles' );

/*
 * Customizer scripts
 */
function ct_author_enqueue_customizer_scripts(){

	// stylesheet for customizer
	wp_enqueue_style('ct-author-customizer-styles', get_template_directory_uri() . '/styles/customizer.min.css');

	// JS for hiding/showing Customizer options
	wp_enqueue_script('ct-author-customizer-js', get_template_directory_uri() . '/js/build/customizer.min.js',array('jquery'),'',true);

}
add_action('customize_controls_enqueue_scripts','ct_author_enqueue_customizer_scripts');

/*
 * Script for live updating with customizer options. Has to be loaded separately on customize_preview_init hook
 * transport => postMessage
 */
function author_enqueue_customizer_post_message_scripts(){

	// JS for live updating with customizer input
	wp_enqueue_script('ct-author-customizer-post-message-js', get_template_directory_uri() . '/js/build/postMessage.min.js',array('jquery'),'',true);

}
add_action('customize_preview_init','author_enqueue_customizer_post_message_scripts');

// load scripts asynchronously
function ct_author_add_async_script($url) {

	// if async parameter not present, do nothing
	if (strpos($url, '#ct_author_asyncload') === false){
		return $url;
	}
	// if async parameter present, add async attribute
	return str_replace('#ct_author_asyncload', '', $url)."' async='async";
}
add_filter('clean_url', 'ct_author_add_async_script', 11, 1);