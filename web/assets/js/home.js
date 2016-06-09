$(document).ready(function(){
    $("#upcoming-games").slideUp(0);
    $.getJSON( "/external/close_events", {actual_date: moment().add(2,'h').format('YYYY-MM-DD HH:mm:ss')} )
      .done(function( json ) {
        var _html = "";
        $("#home-loading-data").slideUp(300);
        
        if(json.length > 0){
            $.each(json, function( index, value ) {
                _html = _html + '<div class="col-md-3">';
                _html = _html + '<div class="game-item">';
                _html = _html + '<div class="date">' + moment( String(value.occurs_at).replace("Z", "") ).format('dddd, MMM D') + '</div>';
                _html = _html + '<div class="name margin-divider-half">';
                _html = _html + value.performances[0].performer.name + '<br />';
                _html = _html + '<span>vs</span><br />';
                _html = _html + value.performances[1].performer.name;
                _html = _html + '</div>';
                //_html = _html + '<div class="location margin-divider-half"><i class="fa fa-map-marker"></i> <a href="/venue/' + value.venue.id + '/' + value.venue.slug + '">' + value.venue.name + '</a></div>';
                _html = _html + '<div class="location margin-divider-half"><i class="fa fa-map-marker"></i></div>';
                _html = _html + '<button class="button green" onclick="document.location.href=\'/ticket/' + value.id + '\'">Buy Tickets</button>';
                _html = _html + '</div>';
                _html = _html + '</div>';
            });

            $("#upcoming-games").html(_html);
            $("#upcoming-games").slideDown(300);
        }
        else {
            $("#upcoming_title").slideUp(300);
            $("#upcoming-games").slideDown(300);
        }
        
        //console.log( "JSON Data: " + json );
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
});