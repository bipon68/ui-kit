
$(function() {
					
	setTimeout(function(){
	
		$('.bar-content').each(function() {
			var me = $(this);
			var perc = me.attr("data-limit");
			var current_perc = 0;
			
			if(!$(this).hasClass('stop')){
			
				var progress = setInterval(function() {
												
					if (current_perc>=perc) {
						clearInterval(progress);
					} else {
						current_perc +=1;
						me.css('height', (current_perc)+'%');
						me.children("span").html(current_perc+'%');
					}
			
				}, 15);
				
				me.addClass('stop');
				
			}
			
		});
		
	}, 0);
	
});