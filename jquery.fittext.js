/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function($){

	var initialized = false,
		$targets = null,
		options = {
			minFontSize: Number.NEGATIVE_INFINITY,
			maxFontSize: Number.POSITIVE_INFINITY
		};

	var pub = {
		destroy: function() {
			var $target = $(this);

			$target.removeClass("fit-text")
				   .css("font-size", "");

			$targets = $(".fit-text");

			return $targets;
		}
	};

	function _init(com, opts) {
		// Settings
		opts = $.extend({}, options, opts);
		opts.compressor = com || 1;

		// Apply to each element
		var $items = $(this);
		for (var i = 0, count = $items.length; i < count; i++) {
			_build($items.eq(i), opts);
		}

		// Events
		if (!initialized) {
			initialized = true;
			$(window).on("resize.fittext orientationchange.fittext", _onResize);
		}

		$targets = $(".fit-text");

		return $items;
	}

	function _build($target, opts) {
		var data = $.extend({}, opts);
		data.$target = $target;

		$target.addClass("fit-text")
			   .data("fit-text", data);
	}

	function _onResize(e) {
		for (var i = 0, count = $targets.length; i < count; i++) {
			var data = $targets.eq(i).data("fit-text");

			if (typeof data !== "undefined") {
				data.$target.css("font-size", Math.max(Math.min(data.$target.width() / (data.compressor*10), parseFloat(data.maxFontSize)), parseFloat(data.minFontSize)));
			}
		}
	}

	$.fn.fitText = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			return _init.apply(this, arguments);
		}
		return this;
	};
})(jQuery);
