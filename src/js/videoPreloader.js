const PreloadVideo = function(
	ele,
	progressCb,
	loadCb,
	preloadSkipCb,
	preloadCb
) {
	this.xhr = new XMLHttpRequest()
	this.video = ele
	this.progressCb = progressCb
	this.loadCb = loadCb
	this.preloadSkipCb = preloadSkipCb
	this.preloadCb = preloadCb

	if (!this.video) {
		return
	}

	if (this.video.preload == 'none') {
		this.video.src = this.video.getAttribute('data-src')
		this.video.addEventListener('play', this.preloadSkipCb)
		return
	}

	this.xhr.open('GET', this.video.getAttribute('data-src'), true)
	this.xhr.responseType = 'blob'

	this.xhr.onload = function(e) {
		if (this.status == 200) {
			var myBlob = this.response
			var vid = (window.URL ? URL : URL).createObjectURL(myBlob)
			this.video.src = vid
		}
	}

	this.xhr.addEventListener('progress', this.progressCb)

	this.xhr.addEventListener('load', this.loadCb)

	this.xhr.send()
}

export default PreloadVideo
