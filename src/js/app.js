import $ from 'jquery'
import Foundation from 'foundation-sites'
import slick from 'slick-carousel'

// Your JavaScript goes here
$(document).foundation()

$(document).ready(function() {
	var wh = document.documentElement.clientHeight
	var ww = document.documentElement.clientWidth
	var headerHeight = $('header').height()
	var footerHeight = $('footer').height()

	// active states
	var activeLinks = $(
		'ul a[href="https://' +
			location.host +
			'/' +
			location.pathname.split('/')[1] +
			'"]'
	)
	activeLinks.addClass('active')

	// full screen
	if (ww > 768) {
		$('[rel="fullscreen"]').css('height', wh)
		$('[rel="fillscreen"]').css('min-height', wh - headerHeight - footerHeight)
	} else {
		$('[rel="fullscreen"]').css('height', wh * 0.9)
	}

	window.addEventListener('resize', function() {
		wh = document.documentElement.clientHeight
		ww = document.documentElement.clientWidth
		if (ww > 768) {
			$('[rel="fullscreen"]').css('height', wh)
			$('[rel="fillscreen"]').css(
				'min-height',
				wh - headerHeight - footerHeight
			)
		} else {
			$('[rel="fullscreen"]').css('height', wh * 0.9)
		}
	})

	window.addEventListener('orientationchange', function() {
		wh = document.documentElement.clientHeight
		ww = document.documentElement.clientWidth
		$('[rel="fullscreen"]').css('height', wh)
		$('[rel="fillscreen"]').css('min-height', wh - headerHeight - footerHeight)
		$('body').removeClass('open')
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
		$('body').toggleClass('open')
	})

	// sticky nav
	var $header = $('header')
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
})
