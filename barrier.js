if (typeof jQuery === 'undefined')
	throw new Error('Barrier requires jQuery!');

(function($) {
	$.fn.barrier = function(options) {
		options = $.extend({
			'navigation'       : this.selector,
			'limit'            : '600',
			'otherNavigation'  : 'li[data-role="other-menu"]'
		}, options);

		return this.each(function() {
			$(options.otherNavigation).hide();

			var 
			navigationWidth = getNavigationWidth();

			if (navigationWidth > options.limit) {
				$(options.otherNavigation).show();

				while (navigationWidth > options.limit) {
					var lastMenuItem = getLastMenuItem().clone(true);
					$(options.otherNavigation).find('ul').prepend(lastMenuItem);
					getLastMenuItem().remove();
					navigationWidth = getNavigationWidth();
				}
			} 

			function getLastMenuItem() {
				return $(options.navigation).find('> li:not('+ options.otherNavigation +')').last();
			}

			function getNavigationWidth() {
				return $(options.navigation).width();
			}
		})
	}
}(jQuery));