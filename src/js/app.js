import $ from 'jquery'
import Foundation from 'foundation-sites'
import slick from 'slick-carousel'
import getImageBrightness from './getImageBrightness.js'
import barbaApp from './barbaConfig.js'

var wh = document.documentElement.clientHeight,
	ww = document.documentElement.clientWidth,
	headerHeight = $('#header').outerHeight(),
	footerHeight = $('#footer').outerHeight()

function addEventListeners() {
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

	// mobile nav
	$('.menu-toggle').on('click', function(e) {
		e.preventDefault()
		$('body').toggleClass('menu-open')
	})
}

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

// sticky nav
function stickyNav() {
	var $header = $('#header'),
		st = window.scrollY,
		offset = 300,
		tempSt

	$header.addClass('fixed')

	function detectScroll() {
		tempSt = window.scrollY
		if (tempSt > st + offset) {
			$header.addClass('hidden')
			st = tempSt
		} else if (tempSt < st) {
			$header.removeClass('hidden')
			st = tempSt
		}
	}

	if (st) {
		window.scroll(0, 0) // reset the scroll position to the top left of the document.
		st = window.scrollY
	}

	$(window).on('scroll', detectScroll)
}

function refreshPageLoad() {
	// active states
	var activeLinks = $('a[href="' + location.href + '"]')

	$('a.active').removeClass('active')

	$('a[href="' + location.href + '"]').addClass('active')

	// run slick
	$('.slider').each(function() {
		var slides = $(this).find('.slide')
		if (slides.length > 1) {
			$(this).slick({
				arrows: true,
				dots: true
			})
		}
	})

	// add borders to images
	$('.article-item').each(function() {
		var image = $(this).find('img')[0]
		getImageBrightness(image.src, function(br) {
			if (br > 180) {
				$(image).addClass('border')
			}
		})
	})

	// active fillscreen util
	fillscreen()

	// On single release post (muso-album post-type), fix the album links
	if ($('.single-muso-album').length) {
		let $articleBody = $('.single-muso-album .article-body'),
			$albumLinks = $articleBody.find('p a.albumlink'),
			$albumList = $articleBody.find('ol'),
			$albumArt = $('.single-muso-album .album-art')
		let $trackList = $articleBody.find('.track-list')

		if (!$('.album-description').length) {
			$trackList.css('max-height', $albumArt.innerHeight() - 20)
		}

		if (Foundation.MediaQuery.current == 'Small') {
			$trackList.css('max-height', 'none')
		}

		if ($albumLinks.length) {
			let $albumList = $albumLinks.parent('p').addClass('flex-album-list')
			let $albumclone = $albumList.clone()

			$albumclone.find('br').replaceWith('|')
			$albumList.hide()

			$('.albumlist-wrapper').append($albumclone)
		}
	}

	// run foundation
	$(document).foundation()
}

function updateBodyClasses(newPageRawHTML) {
	var response = newPageRawHTML.replace(
		/(<\/?)body( .+?)?>/gi,
		'$1notbody$2>',
		newPageRawHTML
	)
	var bodyClasses = $(response).filter('notbody').attr('class')
	$('body').attr('class', bodyClasses)
}

function handleNewPageReady(current, prev, elCont, newPageRawHTML) {
	refreshPageLoad()
	updateBodyClasses(newPageRawHTML)
}

$(document).ready(function() {
	barbaApp(handleNewPageReady)
	addEventListeners()
	refreshPageLoad()
	stickyNav()

	setTimeout(function() {
		if ($('[data-equalizer]').length) {
			Foundation.reInit('equalizer')
		}
	}, 50)
})
