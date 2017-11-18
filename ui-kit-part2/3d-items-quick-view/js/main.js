jQuery(document).ready(function($){
	var visionTrigger = $('.cd-3d-trigger'),
		galleryItems = $('#cd-gallery-items').children('li'),
		galleryNavigation = $('.cd-item-navigation a');

	//mobile - trigger 3d vision
	visionTrigger.on('click', function(){
		$this = $(this);
		// $this.parent('li').toggleClass('active');
		if( $this.parent('li').hasClass('active') ) {
			$this.parent('li').removeClass('active');
			hideNavigation($this.parent('li').find('.cd-item-navigation'));
		} else {
			$this.parent('li').addClass('active');
			updateNavigation($this.parent('li').find('.cd-item-navigation'), $this.parent('li').find('.cd-item-wrapper'));
		}
		
	});

	//change image in the slider
	galleryNavigation.on('click', function(){
		$this = $(this);

		var direction = $this.text(),
			activeContainer = $this.parents('nav').eq(0).siblings('.cd-item-wrapper');
		if( direction=="Next") {
			showNextSlide(activeContainer);
		}else {
			showPreviousSlide(activeContainer);
		}
		updateNavigation($this.parents('.cd-item-navigation').eq(0), activeContainer);
	});
	//desktop - update navigation visibility
	$('.no-touch #cd-gallery-items li').hover(function(){
		$this = $(this).children('.cd-item-wrapper');
		updateNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0), $this);
	}, function(){
		$this = $(this).children('.cd-item-wrapper');
		hideNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0));
	});

	function showNextSlide(container) {
		var itemToHide = container.find('.cd-item-front'),
			itemToShow = container.find('.cd-item-middle'),
			itemMiddle = container.find('.cd-item-back'),
			itemToBack = container.find('.cd-item-out').eq(0);

		itemToHide.addClass('move-right').removeClass('cd-item-front').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			itemToHide.addClass('hidden');
		});
		itemToShow.addClass('cd-item-front').removeClass('cd-item-middle');
		itemMiddle.addClass('cd-item-middle').removeClass('cd-item-back');
		itemToBack.addClass('cd-item-back').removeClass('cd-item-out');
	}

	function showPreviousSlide(container) {
		var itemToMiddle = container.find('.cd-item-front'),
			itemToBack = container.find('.cd-item-middle'),
			itemToShow = container.find('.move-right').slice(-1),
			itemToOut = container.find('.cd-item-back');

		// itemToShow.removeClass('hidden').removeClass('move-right').addClass('cd-item-front');
		itemToShow.removeClass('hidden').addClass('cd-item-front');
		itemToMiddle.removeClass('cd-item-front').addClass('cd-item-middle');
		itemToBack.removeClass('cd-item-middle').addClass('cd-item-back');
		itemToOut.removeClass('cd-item-back').addClass('cd-item-out');

		var stop = setInterval(function(){myTimer()}, 100);
		
		function myTimer(){
			if( !itemToShow.hasClass('hidden') ) {
				itemToShow.removeClass('move-right');
				window.clearInterval(stop);
			}
		}
	}

	function updateNavigation(navigation, container) {
		var isNextActive = ( container.find('.cd-item-middle').length > 0 ) ? true : false,
			isPrevActive = 	( container.children('li').eq(0).hasClass('cd-item-front') ) ? false : true;
		(isNextActive) ? navigation.find('a').eq(1).addClass('visible') : navigation.find('a').eq(1).removeClass('visible');
		(isPrevActive) ? navigation.find('a').eq(0).addClass('visible') : navigation.find('a').eq(0).removeClass('visible');
	}

	function hideNavigation(navigation) {
		navigation.find('a').removeClass('visible');
	}
});