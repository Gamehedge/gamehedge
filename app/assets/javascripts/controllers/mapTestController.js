controllers = angular.module('gamehedge')

controllers.controller('mapTestController', function($scope,apiService,$http,angularLoad){

    $scope.getEventInfo = function(){
        return apiService.getData('/api/v1/events/1013157')
            .then(function(response){
                $scope.event  = response;
                $scope.getTicketList();
                console.log($scope.event);
        });
    };

    $scope.getTicketList = function(){
        $http({
            method: 'GET',
            url: '/tickets/list/?id=1013157',
        }).then(function successCallback(response) {
            $scope.tickets = response;
            console.log($scope.tickets);
            var tickets = []
            for(i=0;i<$scope.tickets.data.ticket_groups.length;i++){
                var b = "";
                for(j=0;j<$scope.tickets.data.ticket_groups[i].splits.length;j++){
                    b = b + $scope.tickets.data.ticket_groups[i].splits[j] +  ",";
                }
                var a = {
                    id:$scope.tickets.data.ticket_groups[i].id,
                    section:$scope.tickets.data.ticket_groups[i].section,
                    row:$scope.tickets.data.ticket_groups[i].row,
                    price:$scope.tickets.data.ticket_groups[i].retail_price,
                    qty:$scope.tickets.data.ticket_groups[i].available_quantity,
                    avail:b,
                    notes:$scope.tickets.data.ticket_groups[i].public_notes,
                }
                tickets.push(a)
            }
            console.log(tickets)
            DATA_TICKTES={"list":tickets};
            DVM_map_params = {
                'client_id':'99',
                'map_name':'MY_MAP',
                'key_map_name':'map_key',
                'tickets_container':'TICKETS_CONTAINER',
                'map_width':777,
                'map_height':637,   
                'feed_type':'te',
                'map_type' : 'zone',
                'event_id': $scope.event.id,
                'headliner_id':$scope.event.home_performer.id,
                'venue_id':$scope.event.venue.id,
                'venue_configuration_id':'5895',
                'tickets_data_object': DATA_TICKTES,
                'tickets_type':'json',
            };
            angularLoad.loadScript("https://dynamicvenuemaps.com/maps/dvm.js?v=1.0").then(function() {
                console.log("success");
                // Script loaded succesfully.
                // We can now start using the functions from someplugin.js
            }).catch(function() {
                console.log("failure");
                // There was some error loading the script. Meh
            });
        }, function errorCallback(response) {
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    $scope.getEventInfo();
});