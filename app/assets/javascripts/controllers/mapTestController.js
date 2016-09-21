controllers = angular.module('gamehedge')

controllers.controller('mapTestController', function($scope){
	var  map_width =777;
    var  map_ height =637;
    var DATA_TICKTES={"list":[]};

    var DVM_map_params = {
                 'client_id':'YOUR_CLIENT_ID',
    	'map_name':'MY_MAP',
    	'key_map_name':'map_key',
    	'tickets_container':'TICKETS_CONTAINER',
    	'map_width':777,
    	'map_height':637,	
    	'feed_type':'te',
                 'map_type' : 'map_type',
                 'event_id':'EVENT_ID',
                 'headliner_id':'PERFORMER_ID'
    	'venue_id':'VENUE_ID',
    	'venue_conf':' venue configuration_id',
    	'tickets_data_object': DATA_TICKTES,
    	'tickets_type':'TICKETS_LIST_TYPE',
                 'static_map':'VENUE_STATIC_MAP_URL'

    };
});