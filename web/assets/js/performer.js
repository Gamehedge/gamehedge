var _page = 1;
var _per_page = 15;
var _home_only_games = false;

function changePage(_new_page){
    _page = _new_page;
    $("html, body").animate({ scrollTop: 0 }, 500);
    loadPage();
}

function switchOnlyGames(){
    if(String(window.location.pathname).indexOf("-home") > 0){
        //alert("home");
        window.location = "/performer/" + String(_id) + "/" + _slug + "-tickets"
    }
    else {
        //alert("not home");
        window.location = "/performer/" + String(_id) + "/" + _slug + "-tickets-home"
    }
}

function loadPage(){
    if(String(window.location.pathname).indexOf("-home") > 0){
        _home_only_games = true;
    }
    else {
        _home_only_games = false;
    }
    
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
                var dateTodaytxt = moment().add(2,'h').format('YYYY-MM-DDTHH:mm:ss');
                var dateEventtxt = value.occurs_at.replace("Z", "");
                var dateToday = new Date(dateTodaytxt);
                var dateEvent = new Date(dateEventtxt);
                if(dateEvent < dateToday){
                    _html = _html + '<li class="clearfix">';
                    _html = _html + '<div>'
                    _html = _html + '<div class="date col-md-2 col-xs-3">';
                    _html = _html + '<div class="month">' + moment( String(value.occurs_at).replace("Z", "") ).format('MMMM') + '</div>';
                    _html = _html + '<div class="day">' + moment( String(value.occurs_at).replace("Z", "") ).format('D') + '</div>';
                    _html = _html + '<div class="time">' + moment( String(value.occurs_at).replace("Z", "") ).format('ddd. hh:mm A') + '</div>';
                    _html = _html + '</div>';
                    _html = _html + '<div class="event col-md-8 col-xs-9">';
                    if(value.performances[1]){
                        _html = _html + '<div class="name">' + value.performances[0].performer.name + ' at ' + value.performances[1].performer.name + '</div>';
                    }
                    else {
                        _html = _html + '<div class="name">' + value.performances[0].performer.name + '</div>';
                    }
                    
                    _html = _html + '<div class="location">' + value.venue.name + ' - ' + value.venue.location + '</div>';
                    _html = _html + '</div>';
                    _html = _html + '<div class="tickets-link col-md-2 col-xs-12">';
                    _html = _html + '<button  style="text-transform:none;width: 104%;" class="button green">Sold Out</button>';
                    
                    
                    _html = _html + '</div>';
                    _html = _html + '</div>';
                    _html = _html + '</li>';
                }
                else{
                    _html = _html + '<li class="clearfix">';
                    _html = _html + '<a href="/ticket/' + value.id + '">'
                    _html = _html + '<div class="date col-md-2 col-xs-3">';
                    _html = _html + '<div class="month">' + moment( String(value.occurs_at).replace("Z", "") ).format('MMMM') + '</div>';
                    _html = _html + '<div class="day">' + moment( String(value.occurs_at).replace("Z", "") ).format('D') + '</div>';
                    _html = _html + '<div class="time">' + moment( String(value.occurs_at).replace("Z", "") ).format('ddd. hh:mm A') + '</div>';
                    _html = _html + '</div>';
                    _html = _html + '<div class="event col-md-8 col-xs-9">';
                    if(value.performances[1]){
                        _html = _html + '<div class="name">' + value.performances[0].performer.name + ' at ' + value.performances[1].performer.name + '</div>';
                    }
                    else {
                        _html = _html + '<div class="name">' + value.performances[0].performer.name + '</div>';
                    }
                    
                    _html = _html + '<div class="location">' + value.venue.name + ' - ' + value.venue.location + '</div>';
                    _html = _html + '</div>';
                    _html = _html + '<div class="tickets-link col-md-2 col-xs-12">';
                    _html = _html + '<button style="text-transform:none;width: 104%;" class="button green">From $' + value.min_price + '</button>';
                    if(value.available_count < 20){
                        _html = _html + '<div class="text-center alert-text">NOT MANY LEFT</div>';
                    }
                    console.log(value);
                    _html = _html + '</div>';
                    _html = _html + '</a>';
                    _html = _html + '</li>';
                }
                
               
                
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