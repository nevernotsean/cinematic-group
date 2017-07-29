import $ from 'jquery'
import Barba from 'barba.js'

const StaggeredFadeTransition = Barba.BaseTransition.extend({
	start: function() {
		Promise.all([this.newContainerLoading, this.fadeOut()]).then(() =>
			this.fadeIn()
		)
	},
	fadeOut: function() {
		return $(this.oldContainer).animate({ opacity: 0 }).promise()
	},
	fadeIn: function() {
		var $el = $(this.newContainer)

		$(this.oldContainer).hide()

		$el.css({
			visibility: 'visible',
			opacity: 0
		})

		$el.animate({ opacity: 1 }, 400, () => {
			this.done()
		})
	}
})

export default StaggeredFadeTransition
