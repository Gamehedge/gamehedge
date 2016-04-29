var _page = 1;
var _per_page = 15;
var _home_only_games = false;

function changePage(_new_page){
    _page = _new_page;
    $("html, body").animate({ scrollTop: 0 }, 500);
    loadPage();
}

function switchOnlyGames(){
    if(_home_only_games == true){
        _home_only_games = false;
    }
    else {
        _home_only_games = true;
    }
    _page = 1;
    loadPage();
}

function loadPage(){
    $("#pag_navigation").html("");
    $("#games").slideUp(300);
    $("#home-loading-data").slideDown(300);
    
    $.getJSON( "/external/performer_events", {actual_date: moment().add(2,'h').format('YYYY-MM-DD HH:mm:ss'), id: _id, page: _page, per_page: _per_page, home_only_games: _home_only_games} )
      .done(function( json ) {
        var _html = "";
        $("#home-loading-data").slideUp(300);
        if(_home_only_games == true){
            _html = '<div style="margin-bottom: 10px"><label><input type="checkbox" id="only_home" onchange="switchOnlyGames()" value="1" checked > Only show home games</label></div>';
        }
        else {
            _html = '<div style="margin-bottom: 10px"><label><input type="checkbox" id="only_home" onchange="switchOnlyGames()" value="1" > Only show home games</label></div>';
        }
        
        if(json.events && json.events.length > 0){
            _html = _html + "<ul>";
            $.each(json.events, function( index, value ) {
                
                _html = _html + '<li class="clearfix">';
                _html = _html + '<div class="date">';
                _html = _html + '<div class="month">' + moment( String(value.occurs_at).replace("Z", "") ).format('MMMM') + '</div>';
                _html = _html + '<div class="day">' + moment( String(value.occurs_at).replace("Z", "") ).format('D') + '</div>';
                _html = _html + '<div class="time">' + moment( String(value.occurs_at).replace("Z", "") ).format('ddd. hh:mm A') + '</div>';
                _html = _html + '</div>';
                _html = _html + '<div class="event">';
                _html = _html + '<div class="name">' + '<a href="/performer/' + value.performances[0].performer.id + '/' + value.performances[0].performer.slug + '" title="' +  value.performances[0].performer.name + '">' + value.performances[0].performer.name + '</a>' + ' at ' + '<a href="/performer/' + value.performances[1].performer.id + '/' + value.performances[1].performer.slug + '" title="' +  value.performances[1].performer.name + '">' + value.performances[1].performer.name + '</a>' + '</div>';
                _html = _html + '<div class="location"><a href="/venue/' + value.venue.id + '/' + value.venue.slug + '">' + value.venue.name + '</a> - ' + value.venue.location + '</div>';
                _html = _html + '</div>';
                _html = _html + '<div class="tickets-link">';
                _html = _html + '<a href="/ticket/' + value.id + '" class="btn-green-gradient">Buy Tickets <i class="fa fa-angle-right"></i></a>';
                if(value.available_count < 20){
                    _html = _html + '<div class="text-center alert-text">NOT MANY LEFT</div>';
                }
                
                _html = _html + '</div>';
                _html = _html + '</li>';
               
                
            });

            _html = _html + "</ul>";
            
            /* navigation section */
            var pages = Math.ceil( json.total_entries / _per_page );
            var _nav_html = "";
            
            if(pages > 0){
                _nav_html = '<ul class="pagination pull-right">';
                _nav_html = _nav_html + '<ul class="pagination pull-right">';

                for(var i=1; i <= pages; i++){
                    if(i == _page){
                        _nav_html = _nav_html + '<li class="active"><a href="javascript:void()" onclick="changePage(' + i + ')">' + i + '</a></li>';
                    }
                    else {
                        _nav_html = _nav_html + '<li><a href="javascript:void()" onclick="changePage(' + i + ')">' + i + '</a></li>';
                    }
                    
                }
                _nav_html = _nav_html + '</ul>';    
            }
            else {
                _nav_html = "";
            }
            
            $("#games").html(_html);
            $("#pag_navigation").html(_nav_html);
            $("#games").slideDown(300);
            
        }
        else {
            _html = "<p>There are no games available at this time.</p>";
            $("#games").html(_html);
            $("#pag_navigation").html("");
            $("#games").slideDown(300);
        }
        
        //console.log( "JSON Data: " + json );
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
}

$(document).ready(function(){
    $("#upcoming-games").slideUp(0);
    $("#games").slideUp(0);
    loadPage();
    
});