import $ from 'jquery'
import Barba from 'barba.js'
import FadeTransition from './barbaAnimations/FadeTransition.js'
import StaggeredFadeTransition from './barbaAnimations/StaggeredFadeTransition.js'

function barbaApp(pageCallback) {
	Barba.Pjax.getTransition = function() {
		if ($('.article-item').length) {
			return StaggeredFadeTransition
		}
		return FadeTransition
	}

	Barba.Pjax.Dom.containerClass = 'content-wrapper'
	Barba.Pjax.Dom.wrapperId = 'content'
	Barba.Pjax.start()

	Barba.Dispatcher.on('newPageReady', pageCallback)

	Barba.Dispatcher.on('linkClicked', function(htmlel, e) {
		if ($(htmlel).hasClass('ab-item')) {
			window.location = htmlel.href
			return false
		}
	})
}

export default barbaApp
