$(document).ready(function() {
	switch($('#tile_tile_type_id').val()) {
		case "1":
			$('#tile_sport_id_input').show();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').hide();
			$('#tile_event_id_input').hide();
			$('#tile_event_id3_input').hide();
			$('#tile_event_id2_input').hide();
			break;
		case "2":
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').show();
			$('#tile_event_id_input').hide();
			$('#tile_event_id3_input').hide();
			$('#tile_event_id2_input').hide();
			break;
		case "3":
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').show();
			$('#tile_performer_id_input').hide();
			$('#tile_event_id_input').hide();
			$('#tile_event_id3_input').hide();
			$('#tile_event_id2_input').hide();
			break;
		case "4":
			$('#tile_sport_id_input').show();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').hide();
			$('#tile_event_id_input').show();
			$('#tile_event_id3_input').show();
			$('#tile_event_id2_input').show();
			update_events();
			break;
		default:
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').hide();
			$('#tile_event_id_input').hide();
			$('#tile_event_id3_input').hide();
			$('#tile_event_id2_input').hide();
	}
	$('#tile_sport_id').change(function(){
		if($('#tile_tile_type_id').val() == "4"){
			update_events();
		}
	})
	$('#tile_tile_type_id').change(function(){
		switch($('#tile_tile_type_id').val()) {
			case "1":
				$('#tile_sport_id_input').show();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').hide();
				$('#tile_event_id_input').hide();
				$('#tile_event_id2_input').hide();
				$('#tile_event_id3_input').hide();
				break;
			case "2":
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').show();
				$('#tile_event_id_input').hide();
				$('#tile_event_id2_input').hide();
				$('#tile_event_id3_input').hide();
				break;
			case "3":
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').show();
				$('#tile_performer_id_input').hide();
				$('#tile_event_id_input').hide();
				$('#tile_event_id2_input').hide();
				$('#tile_event_id3_input').hide();
				break;
			case "4":
				$('#tile_sport_id_input').show();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').hide();
				$('#tile_event_id_input').show();
				$('#tile_event_id2_input').show();
				$('#tile_event_id3_input').show();
				update_events();
				break;
			default:
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').hide();
				$('#tile_event_id_input').hide();
				$('#tile_event_id2_input').hide();
				$('#tile_event_id3_input').hide();
		}
	});
});

function update_events(){
	var id = $('#tile_event_id');
	var now = new Date();
    var today_date = [[AddZero(now.getFullYear()), AddZero(now.getMonth() + 1), now.getDate()].join("-"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(" ");
    //Pad given value to the left with "0"
    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    var url = "";
    if($('#tile_sport_id').val() == ""){
    	url = "/api/v1/events/?light=true&today_date="+today_date;
    }
    else{
    	url = "/api/v1/events/?sport_id="+$('#tile_sport_id').val()+"&light=true&today_date="+today_date;
    }
	$.ajax({
		url: url,
		headers: {
               'Authorization': 'Token token="TokenHere"'
        }
	}).done(function( data ) {
	  	console.log(data);
	  	var html = "<option value=''></option>"
	  	for(i=0;i<data.length;i++){
	  		html += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
	  	}
	  	var id1 = $('#tile_event_id').val();
	  	var id2 = $('#tile_event_id2').val();
	  	var id3 = $('#tile_event_id3').val();
	  	$('#tile_event_id').html(html);
	  	$('#tile_event_id2').html(html);
	  	$('#tile_event_id3').html(html);
	  	$('#tile_event_id').val(id1);
	  	$('#tile_event_id2').val(id2);
	  	$('#tile_event_id3').val(id3);
	});
}