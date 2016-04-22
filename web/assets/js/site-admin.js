$(document).ready(function(){
	if($('form#formLogin').length > 0) {
		$('form#formLogin').submit(function(e){
			e.preventDefault();
			$.post($(this).attr('action'), $(this).serialize(), function(data){
				if(data.status == 1) {
					window.location.href = '/admin';
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
	if($('form#formUpdatePassword').length > 0) {
		$('form#formUpdatePassword').submit(function(e){
			e.preventDefault();
			$.post($(this).attr('action'), $(this).serialize(), function(data){
				if(data.status == 1) {
					alert('Successfully updated your password.');
					$(this).find('input[type="password"]').val('');
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
	if($('form#formAddUser').length > 0) {
		$('form#formAddUser').submit(function(e){
			e.preventDefault();
			$.post($(this).attr('action'), $(this).serialize(), function(data){
				if(data.status == 1) {
					alert('Successfully added a new user.');
					location.reload();
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
	if($('form#formResetPassword').length > 0) {
		$('form#formResetPassword').submit(function(e){
			e.preventDefault();
			$.post($(this).attr('action'), $(this).serialize(), function(data){
				if(data.status == 1) {
					alert('Successfully reset users password.');
					location.reload();
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
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
			$('#login-panel').hide();
			$('#forgot-panel').removeClass('hidden');
		});
	}
	if($('.change_refund').length > 0) {
		$('.change_refund').click(function(e){
			e.preventDefault();
			var id     = $(this).data('rel');
			var status = $('#refund_status' + id).val();
			var data   = {id: id, status: status};
			$.post('/admin/orders/refund_status', data, function(data) {
				if(data.status == 1) {
					alert('Changed Refund Status');
				} else {
					alert(data.message);
				}
			}, 'json');
		});
	}
});