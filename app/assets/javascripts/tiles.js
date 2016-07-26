$(document).ready(function() {
	switch($('#tile_tile_type_id').val()) {
		case "1":
			$('#tile_sport_id_input').show();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').hide();
			break;
		case "2":
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').show();
			break;
		case "3":
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').show();
			$('#tile_performer_id_input').hide();
			break;
		default:
			$('#tile_sport_id_input').hide();
			$('#tile_venue_id_input').hide();
			$('#tile_performer_id_input').hide();
	}
	$('#tile_tile_type_id').change(function(){
		switch($('#tile_tile_type_id').val()) {
			case "1":
				$('#tile_sport_id_input').show();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').hide();
				break;
			case "2":
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').show();
				break;
			case "3":
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').show();
				$('#tile_performer_id_input').hide();
				break;
			default:
				$('#tile_sport_id_input').hide();
				$('#tile_venue_id_input').hide();
				$('#tile_performer_id_input').hide();
		}
	});
});