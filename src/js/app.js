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
			offset = normalize(st, 0, window.innerHeight, -50, 100)
			op = 1 - normalize(st, 0, window.innerHeight * 0.85, -1, 1)

			op = op > 1 ? 1 : op

			$plx.css('transform', `translateY(${offset}%)`)
			$plx.css('opacity', op)
			// if (st > window.innerHeight) {

			// }
		})
	}

	if ($('.post-category-Features').length) {
		var featureBlock = $('.post-category-Features'),
			contentContainer = featureBlock.find('.content-container'),
			st,
			offset,
			op

		contentContainer.css('transform', 'translateY(100px)')

		$(window).on('scroll', function(e) {
			var st = window.scrollY,
				offset = normalize(st, 100, window.innerHeight, 100, 0),
				op = normalize(st, 0, window.innerHeight * 0.85, -1, 1)

			op = op < 0 ? 0 : op

			contentContainer.css('transform', `translateY(${offset}px)`)
			contentContainer.css('opacity', op)
			// if (st > window.innerHeight) {

			// }
		})
	}

	// Blog Post Single parrallax fade
	if ($('.overlap-container').length) {
		var st,
			offset,
			op,
			$plx = $('.overlap-container')

		$(window).on('scroll', function(e) {
			st = window.scrollY
			offset = normalize(st, 0, window.innerHeight, 0, -100)
			op = 1 - normalize(st, 0, window.innerHeight * 0.3, -1, 1)

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
			// debugger
			// $('[rel="pagefill"]').addClass('abs-centered')
		} else {
			// $('[rel="pagefill"]').removeClass('abs-centered')
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

		if (Foundation.MediaQuery.current == 'small') {
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

function rosterScripts() {
	if ($('.single-portfolio').length) {
		let $image = $('.artist-image')
		let $articleBody = $('.article-content .article-body')

		if (Foundation.MediaQuery.current == 'small') {
			$articleBody.css('max-height', 'none')
			$articleBody.css('overflow-y', '')
		} else {
			let h = $image.height()

			if (h < 1) {
				return rosterScripts()
			}

			window.addEventListener('resize', rosterScripts)

			$articleBody.css('max-height', h)
			$articleBody.css('overflow-y', 'scroll')
			$articleBody.addClass('scrollable')
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
		let container = $(this).find('.thumbnail-container')[0]
		let image = $(this).find('img')[0]

		if (!image) return false

		getImageBrightness(image.src, function(br) {
			if (br > 180) {
				$(container).addClass('border')
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

	if (Foundation.MediaQuery.current == 'small') {
		$('#loading-container').remove()
	}

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
			$(video).css('background-color', '#000')
			animateCurtain(10000)
		},
		homeHeroProgress = function(data) {
			var total = data.total,
				loaded = data.loaded,
				pct = loaded / total * 100,
				rounded = Math.floor(pct)

			if ($('#loading-container').length) {
				animateLoadingBar(rounded)
			}
		},
		homePreloadSkip = function() {
			if ($('.curtain').length) {
				animateLoadingBar(100)
				animateCurtain(10000)
			}
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

function addToAnyRefresh() {
	window.a2a && a2a.init_all('page')
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
	addToAnyRefresh()

	// run foundation
	if (!$.isFunction($(document).foundation)) {
		$(document).foundation()
	}

	homeCurtainSetup()
}

function handleTransitionComplete() {
	activateLinks()
	runSlick()
	borderImages()
	albumScripts()
	rosterScripts()

	// run foundation
	if (!$.isFunction($(document).foundation)) {
		$(document).foundation()
	}
}

$(document).ready(function() {
	$(document).foundation()
	handleNewPageReady()
	handleTransitionComplete()

	barbaApp(
		handleLinkClicked,
		handleInitStateChange,
		handleNewPageReady,
		handleTransitionComplete
	)
})
