function requestRefund(_id, orderId, customerId, customerName, customerEmail){
    swal({  
        title: "",
        text: "<p style='font-size:18px;'><strong>Sorry the game didn't work out as you may have hoped - but you are eligible for a Good Game Guarantee Refund!</strong></p><br/><p>Simply click on REQUEST REFUND below and you will receive a refund of 50% of your ticket price within 5-10 business days.</p><br/><p>The refund will be credited to the credit card that you used to make your purchase.</p><br/><p>If you have any questions, please email us at support@gamehedge.com or give us a jingle at 908-312-FANS (3267).</p><br/><p>Hope your team wins next time!</p>",   
        customClass: "customSweetClass", 
        html: true,
        confirmButtonColor: "#64991e",
        confirmButtonText: "REQUEST REFUND",
        showCancelButton: true,   
        closeOnConfirm: false,   
        showLoaderOnConfirm: true, 
    }, 
    function(isConfirm ){  
        if (isConfirm) {
            var data = {te_id: _id, oid: orderId, cid: customerId, name: customerName, email: customerEmail};
			$.post('/member/request_refund', data, function(data) {
				swal({title: "", text: data.message, confirmButtonColor: "#64991e"}, function(){
                    location.reload();
                });
			}, 'json');
        }
    });
}

var filtersOpen = true;
var MapOpen = true;

$(document).ready(function(){
    
    if($(window).width() <= 768){
        $(".Filters").slideUp(0);
        $("#TuMap").slideUp(0); 
        
        filtersOpen = false;
        MapOpen = false;
    }
    
    $(".filter-comp").click(function(){
        if(filtersOpen == true){
            filtersOpen = false;
            $(".Filters").slideUp(400);
        }
        else {
            $(".Filters").slideDown(400);
            filtersOpen = true;
        }
    });
    
    $(".map-filter").click(function(){
        if(MapOpen == true){
            MapOpen = false;
            $("#TuMap").slideUp(400);
        }
        else {
            $("#TuMap").slideDown(400);
            MapOpen = true;
            
            setTimeout(function(){
                $("#MapContainer").tuMap("Refresh","Reset");
            }, 0);
        }
    });
    
    $('#bs-navbar-collapse-gamehedge').on('hide.bs.collapse', function () {
        $("#bs-navbar-collapse-gamehedge").css("background","none");
    })
    
     $('#bs-navbar-collapse-gamehedge').on('show.bs.collapse', function () {
        $("#bs-navbar-collapse-gamehedge").css("background","black");
    })
    
    
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
        if($(window).width() >= 760){
            if(toid == null) {
                toid = setTimeout(function(){
                    $('header nav ul li#sports-dropdown #sports-dropdown-menu').show();
                }, 300);
            }
        }
	});
	$('header nav ul li#sports-dropdown').mouseleave(function(){
		$('header nav ul li#sports-dropdown #sports-dropdown-menu').hide();
		if(toid != null) {
			clearTimeout(toid);
			toid = null;
		}
	});
    
    $('header nav ul li#sports-dropdown').click(function(){
        if($(window).width() < 760){
            //alert("jejej");
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
    
    $('[data-toggle="tooltip"]').tooltip();
    
    var $scrollingDiv = $("#co-ticket-details-div");
    
    $(window).scroll(function() {
        if ( $( "#checkout" ).length ) {
            
            console.log($(window).scrollTop());
            //console.log($("footer"));
            
            if ($(window).scrollTop()>80 && $(window).width() >= 990)     
            {
                if($(window).scrollTop()<300){
                    $scrollingDiv.css("position",'relative' ).css("top", ($(window).scrollTop() - 80 ) + 'px' );    
                }      
            } 
            else 
            {
                $scrollingDiv.css("position",'' ).css("top",'' );           
            }
            
        }
       
    });
    
});
