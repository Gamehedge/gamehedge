$(document).ready(function(){
	if($('#home-down-arrow-link').length > 0) {
		$('#home-down-arrow-link').on('click', function(){
			$('html, body').animate({
				scrollTop: $('main').offset().top
			}, 500);
		});
	}
	if(typeof $.fancybox == 'function') {
		$('.fancybox').fancybox();
	}
	var toid = null;
	$('header nav ul li#sports-dropdown').mouseover(function(){
		if(toid == null) {
			toid = setTimeout(function(){
				$('header nav ul li#sports-dropdown #sports-dropdown-menu').show();
			}, 300);
		}
	});
	$('header nav ul li#sports-dropdown').mouseleave(function(){
		$('header nav ul li#sports-dropdown #sports-dropdown-menu').hide();
		if(toid != null) {
			clearTimeout(toid);
			toid = null;
		}
	});
	if($('.ajax-form').length > 0) {
		$('.ajax-form').submit(function(e){
			e.preventDefault();
			$.post($(this).attr('action'), $(this).serialize(), function(data) {
				if(data.status == 1) {
					window.location.href = data.message;
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
	if($('#forgotLink').length > 0) {
		$('#forgotLink').click(function(e){
			e.preventDefault();
			$('#formLoginWrapper').hide();
			$('#formForgotWrapper').removeClass('hidden');
		});
	}
	if($('#only_home').length > 0) {
		$('#only_home').click(function(){
			if($(this).is(':checked')) {
				var loc = window.location.href + '&home_only=1';
			} else {
				var loc = window.location.href.replace('&home_only=1', '');
			}
			window.location.href = loc;
		});
	}
	if($('.request_refund').length > 0) {
		$('.request_refund').click(function(e){
			e.preventDefault();
			var data = {te_id: $(this).data('teoid'), oid: $(this).data('oid'), cid: $(this).data('cid'), name: $(this).data('name'), email: $(this).data('email')};
			$.post('/member/request_refund', data, function(data) {
				alert(data.message);
				$.fancybox.close();
			}, 'json');
		});
	}
});
