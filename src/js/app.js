import $ from 'jquery'
import Foundation from 'foundation-sites'
import slick from 'slick-carousel'
import getImageBrightness from './getImageBrightness.js'
import barbaApp from './barbaConfig.js'
import Blazy from 'blazy'
import PreloadVideo from './videoPreloader.js'

var wh = window.innerHeight,
	ww = window.innerWidth,
	headerHeight = $('#header').outerHeight(),
	footerHeight = $('#footer').outerHeight(),
	contentArea = document.getElementById('oc-content')

function addEventListeners() {
	window.addEventListener('resize', function() {
		wh = window.innerHeight
		ww = window.innerWidth
		fillscreen()
	})

	window.addEventListener('orientationchange', function() {
		wh = window.innerHeight
		ww = window.innerWidth
		$('body').removeClass('menu-open')
		fillscreen()
	})

	// mute button
	var video = $('video')[0]
	var $muteButton = $('.mute')
	var $icon = $muteButton.find('i.fa')

	if (ww < 768 && video) {
		video.muted = true
		$icon.removeClass('fa-volume-up').addClass('fa-volume-off')
	}

	$muteButton.on('click', function(e) {
		e.preventDefault()

		var isMuted = video.muted

		if (isMuted === false) {
			video.muted = true
			$icon.removeClass('fa-volume-up').addClass('fa-volume-off')
		} else {
			video.muted = false
			$icon.removeClass('fa-volume-off').addClass('fa-volume-up')
		}
	})

	// mobile nav
	$('.mobile-nav .menu-item a').on('click', function(e) {
		$('[data-off-canvas]').foundation('close')
	})

	// Home page parrallax fade
	if ($('.parallax').length) {
		var st,
			offset,
			op,
			$plx = $('.parallax')

		$(window).on('scroll', function(e) {
			st = window.scrollY
			offset = normalize(st, 0, window.innerHeight, -100, 100)
			op = 1 - normalize(st, 0, window.innerHeight, -1, 1)

			op = op > 1 ? 1 : op

			$plx.css('transform', `translateY(${offset}%)`)
			$plx.css('opacity', op)
			// if (st > window.innerHeight) {

			// }
		})
	}

	// video thumbnails
	$('.post-type-tv.hoverable').each(function() {
		var video = $(this).find('video.hover')[0]

		if (!video.src) return

		video.addEventListener('canplay', function() {
			$(video)
				.parents('.hoverable')
				.addClass('loaded')
		})

		function videoHoverIn() {
			if (video.buffered) {
				video.play()
			} else {
				video.load()
			}
		}
		function videoHoverOut() {
			var video = $(this).find('video.hover')[0]
			video.pause()
			video.currentTime = 0
		}

		$(this).hover(videoHoverIn, videoHoverOut)
	})
}

// function preLoadHoverVideo(vidEle) {
// 	var hoverVideoLoaded = function() {
// 			console.log('video loaded')
// 		},
// 		hoverVideoProgress = function(data) {
// 			var total = data.total,
// 				loaded = data.loaded,
// 				pct = loaded / total * 100,
// 				rounded = Math.floor(pct)

// 			console.log('video loading: ', rounded)
// 		},
// 		hoverVideoPreloadSkip = function() {
// 			console.log('video preload skip')
// 		},
// 		hoverVideoPreload = function() {
// 			console.log('video preload')
// 		}

// 	var hoverVideo = new PreloadVideo(
// 		vidEle,
// 		hoverVideoProgress,
// 		hoverVideoLoaded,
// 		hoverVideoPreloadSkip,
// 		hoverVideoPreload
// 	)
// }

function normalize(v, vmin, vmax, tmin, tmax) {
	var nv = Math.max(Math.min(v, vmax), vmin),
		dv = vmax - vmin,
		pc = (nv - vmin) / dv,
		dt = tmax - tmin,
		tv = tmin + pc * dt

	return tv
}

function fillscreen() {
	var pageTitleHeight = $('.page-title').outerHeight()

	if (ww > 768) {
		var fillHeight = wh - headerHeight - footerHeight - 100

		$('[rel="fullscreen"]').css('min-height', wh)

		$('[rel="fillscreen"]').css('min-height', fillHeight)

		$('[rel="pagefill"]').css('min-height', fillHeight - pageTitleHeight)

		if ($('[rel="pagefill"]').outerHeight() < fillHeight + 80) {
			$('[rel="pagefill"]').addClass('abs-centered')
		} else {
			$('[rel="pagefill"]').removeClass('abs-centered')
		}
	} else {
		$('[rel="fullscreen"]').css('min-height', wh * 0.9)
	}
}

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

function albumScripts() {
	if ($('.single-muso-album').length) {
		let $articleBody = $('.single-muso-album .article-body'),
			$albumLinks = $articleBody.find('p a.albumlink'),
			$albumList = $articleBody.find('ol'),
			$albumArt = $('.single-muso-album .album-art')
		let $trackList = $articleBody.find('.track-list')

		if (!$('.album-description').length) {
			$trackList.css('height', $albumArt.innerHeight() - 20)
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
}

function updateBodyClasses(newPageRawHTML) {
	if (!newPageRawHTML) {
		// console.log('!newPageRawHTML')
		return
	}
	var response = newPageRawHTML.replace(
		/(<\/?)body( .+?)?>/gi,
		'$1notbody$2>',
		newPageRawHTML
	)
	var bodyClasses = $(response)
		.filter('notbody')
		.attr('class')
	$('body').attr('class', bodyClasses)
}

function activateLinks() {
	var activeLinks = $('a[href="' + location.href + '"]')

	$('a.active').removeClass('active')

	$('a[href="' + location.href + '"]').addClass('active')
}

function runSlick() {
	$('.carousel').each(function() {
		var slides = $(this).find('.slide')
		if (slides.length > 1) {
			var $slider = $(this).slick({
				arrows: false,
				dots: false,
				centerPadding: '40px',
				focusOnSelect: true
			})
		}
	})
}

function borderImages() {
	$('.article-item, article').each(function() {
		let image = $(this).find('.thumbnail-container')[0]

		if (!image) return false

		getImageBrightness(image.src, function(br) {
			if (br > 180) {
				$(image).addClass('border')
			}
		})
	})
}

function reflowEqualizer(parent) {
	if (!parent.length) {
		return
	}
	const plugClass = parent.data('zfPlugin')

	if (!plugClass) {
		parent.foundation()
	}
	parent.foundation('getHeightsByRow', heights => {
		parent.foundation('applyHeightByRow', heights)
	})
}

function lazyLoadImages() {
	var bLazy = new Blazy({
		success: function(ele) {
			const parent = $(ele).parents('[data-equalizer]')

			reflowEqualizer(parent)

			// border the image
			getImageBrightness(ele.src, function(br) {
				if (br > 180) {
					$(ele).addClass('border')
				}
			})

			// also load the hover image
			$(ele)
				.siblings('img.hover')
				.each(function() {
					$(this)
						.attr('src', $(this).data('src'))
						.removeAttr('data-src')
				})
		},
		container: '#oc-content',
		offset: 150
	})
}

function animateLoadingBar(pct) {
	var barheight = 350 - 350 * pct / 100
	$('#loading-bar').css('height', barheight + 'px')
}

function animateCurtain(delay) {
	var timeout1, timeout2, timeout3

	$('#loading-container').addClass('skip-reveal')

	timeout1 = setTimeout(function() {
		window.scrollTo(0, 0)
		$('.underside').css('opacity', 0)
		timeout2 = setTimeout(function() {
			$('body').addClass('remove-curtain')
			timeout3 = setTimeout(function() {
				$('#loading-container').remove()
				$('#header').removeClass('hidden')
				$('html').css('overflow-y', '')
			}, delay)
		}, delay)
	}, 100)

	window.addEventListener('keydown', skipCurtain)
	window.addEventListener('click', skipCurtain)

	function skipCurtain() {
		clearTimeout(timeout1)
		clearTimeout(timeout2)
		clearTimeout(timeout3)
		$('html').css('overflow-y', '')
		$('body').addClass('remove-curtain')
		setTimeout(function() {
			$('#loading-container').remove()
			$('#header').removeClass('hidden')
		}, 2000)
	}
}

function homeCurtainSetup() {
	window.scrollTo(0, 0)

	if ($('.curtain').length) {
		$('html').css('overflow-y', 'hidden')
		// $('#header').addClass('hidden')
		$('#content').css('margin-top', 0)
	} else {
		$('body').css('overflow-y', '')
		$('#header').removeClass('hidden')
		$('#content').css('margin-top', '')
	}

	var homeHeroLoaded = function() {
			console.log('video loaded')
			$(video).css('background-color', '#000')
			animateCurtain(10000)
		},
		homeHeroProgress = function(data) {
			var total = data.total,
				loaded = data.loaded,
				pct = loaded / total * 100,
				rounded = Math.floor(pct)

			// console.log('loaded: ', rounded)

			if ($('#loading-container').length) {
				animateLoadingBar(rounded)
			}
		},
		homePreloadSkip = function() {
			console.log('animate trigger')
			animateLoadingBar(100)
			animateCurtain(10000)
		},
		homePreload = function() {
			$('#loading-bar').remove()
		},
		homeHeroVideo = document.querySelector('#player')

	var homePageVideo = new PreloadVideo(
		homeHeroVideo,
		homeHeroProgress,
		homeHeroLoaded,
		homePreloadSkip,
		homePreload
	)
}

// Page transition Callbacks
function handleLinkClicked(el, evt) {
	$('.hdr-logo-link').addClass('loading')
}

function handleInitStateChange(currentStatus) {}

function handleNewPageReady(current, prev, elCont, newPageRawHTML) {
	$('.hdr-logo-link').removeClass('loading')
	updateBodyClasses(newPageRawHTML)
	stickyNav()
	fillscreen()
	addEventListeners()
	lazyLoadImages()

	homeCurtainSetup()
}

function handleTransitionComplete() {
	activateLinks()
	runSlick()
	borderImages()
	albumScripts()

	// run foundation
	$(document).foundation()
}

$(document).ready(function() {
	handleNewPageReady()
	handleTransitionComplete()

	barbaApp(
		handleLinkClicked,
		handleInitStateChange,
		handleNewPageReady,
		handleTransitionComplete
	)
})
