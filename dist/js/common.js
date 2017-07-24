$(document).ready(function() {
	$('body').fadeOut(500).fadeIn(500);

	var time = 20, CC = 1;
$(window).scroll(function() {
	$('#counter').each(function(){
		var 
		cPos = $(this).offset().top,
		topWindow = $(window).scrollTop();
		if (cPos < topWindow + 300) {
				if (CC < 2) {
						$('.number').addClass('viz');
					  $('span').each(function(){
					    var 
					    i = 1,
					    num = $(this).data('num'),
					    step = 1000 * time / num,
					    that = $(this),
					    int = setInterval(function(){
					      if (i <= num) {
					        that.html(i);
					      }
					      else {
					      	CC = CC + 2;
					        clearInterval(int);
					      }
					      i++;
					    },step);
		  			});
		  		}
		  	}
			});
		});

$("#arrow").rotate({bind:{
  click: function(){
    $(this).rotate({
      angle: 0,
      center: ["50%", "100%"],
      animateTo:180
      })
    }
  }
});
});