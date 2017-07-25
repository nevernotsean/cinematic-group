import $ from 'jquery'
import Foundation from 'foundation-sites'
import slick from 'slick-carousel'
import getImageBrightness from './getImageBrightness.js'

$(document).ready(function() {
	var wh = document.documentElement.clientHeight,
		ww = document.documentElement.clientWidth,
		headerHeight = $('#header').outerHeight(),
		footerHeight = $('#footer').outerHeight()

	// active states
	var activeLinks = $(
		'ul a[href="https://' +
			location.host +
			'/' +
			location.pathname.split('/')[1] +
			'"]'
	)
	activeLinks.addClass('active')

	function fillscreen() {
		var pageTitleHeight = $('.page-title').outerHeight()
		// if (ww > 768) {
		var fillHeight = wh - headerHeight - footerHeight - 80

		$('[rel="fullscreen"]').css('min-height', wh)
		$('[rel="fillscreen"]').css('min-height', fillHeight)
		$('[rel="pagefill"]').css('min-height', fillHeight - pageTitleHeight)

		if ($('[rel="pagefill"]').outerHeight() < fillHeight + 80) {
			$('[rel="pagefill"]').addClass('abs-centered')
		} else {
			$('[rel="pagefill"]').removeClass('abs-centered')
		}
		// } else {
		$('[rel="fullscreen"]').css('min-height', wh * 0.9)
		// }
	}
	fillscreen()

	window.addEventListener('resize', function() {
		wh = document.documentElement.clientHeight
		ww = document.documentElement.clientWidth
		fillscreen()
	})

	window.addEventListener('orientationchange', function() {
		wh = document.documentElement.clientHeight
		ww = document.documentElement.clientWidth
		$('body').removeClass('menu-open')
		fillscreen()
	})

	$('.slider').slick({
		arrows: true,
		dots: true
	})

	// mute button
	// var video = $('video')[0]
	// var $muteButton = $('.mute')
	// var $icon = $muteButton.find('i.fa')

	// if (ww < 768 && video) {
	// 	video.muted = true
	// 	$icon.removeClass('fa-volume-up').addClass('fa-volume-off')
	// }

	// $muteButton.on('click', function(e) {
	// 	e.preventDefault()
	//
	// 	var isMuted = video.muted
	//
	// 	if (isMuted === false) {
	// 		video.muted = true
	// 		$icon.removeClass('fa-volume-up').addClass('fa-volume-off')
	// 	} else {
	// 		video.muted = false
	// 		$icon.removeClass('fa-volume-off').addClass('fa-volume-up')
	// 	}
	// })

	// mobile nav
	$('.menu-toggle').on('click', function(e) {
		e.preventDefault()
		$('body').toggleClass('menu-open')
	})

	// sticky nav
	var $header = $('#header')
	var st = window.scrollY
	var tempSt = 0
	var offset = 300
	if (st) {
		window.scroll(0, 0) // reset the scroll position to the top left of the document.
		st = window.scrollY
	}

	$header.addClass('fixed')

	var detectScroll = function() {
		tempSt = window.scrollY
		if (tempSt > st + offset) {
			$header.addClass('hidden')
			st = tempSt
		} else if (tempSt < st) {
			$header.removeClass('hidden')
			st = tempSt
		}
	}

	$(window).on('scroll', detectScroll)

	$('.article-item').each(function() {
		var image = $(this).find('img')[0]
		getImageBrightness(image.src, function(br) {
			if (br > 180) {
				$(image).addClass('border')
			}
		})
	})
	setTimeout(function() {
		$(document).foundation()
	}, 50)

	Foundation.reInit('equalizer')
})
