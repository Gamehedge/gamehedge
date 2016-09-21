controllers = angular.module('gamehedge')

controllers.controller('mapTestController', function($scope,apiService,$http,angularLoad,$timeout){

    $scope.getEventInfo = function(){
        return apiService.getData('/api/v1/events/1013157')
            .then(function(response){
                $scope.event  = response;
                $scope.getTicketList();
                // console.log($scope.event);
        });
    };

    $scope.getTicketList = function(){
        $http({
            method: 'GET',
            url: '/tickets/list/?id=1013157',
        }).then(function successCallback(response) {
            $scope.tickets = response;
            // console.log($scope.tickets);
            var tickets = []
            for(i=0;i<$scope.tickets.data.ticket_groups.length;i++){
                var b = "";
                for(j=0;j<$scope.tickets.data.ticket_groups[i].splits.length;j++){
                    if(j==0){
                        b = b + $scope.tickets.data.ticket_groups[i].splits[j];
                    }
                    else{
                        b = b + "," + $scope.tickets.data.ticket_groups[i].splits[j];
                    }
                }
                var a = {
                    id:String($scope.tickets.data.ticket_groups[i].id),
                    section:String($scope.tickets.data.ticket_groups[i].section),
                    row:String($scope.tickets.data.ticket_groups[i].row),
                    price:String($scope.tickets.data.ticket_groups[i].retail_price),
                    qty:String($scope.tickets.data.ticket_groups[i].available_quantity),
                    avail:String(b),
                    notes:String($scope.tickets.data.ticket_groups[i].public_notes),
                }
                tickets.push(a)
            }
            // console.log(tickets)
            var DATA_TICKTES={"list":tickets};
            DVM_map_params = {
                'client_id':String(99),
                'map_name':'MY_MAP',
                'key_map_name':'map_key',
                'tickets_container':'tickets_list',
                'map_width':777,
                'map_height':637,   
                'feed_type':'te',
                'map_type' : 'zone',
                'event_id': String($scope.event.id),
                'headliner_id':String($scope.event.home_performer.id),
                'venue_id':String($scope.event.venue.id),
                'venue_conf':String(5895),
                'tickets_data_object': DATA_TICKTES,
                'tickets_type':'json',
            };
            console.log("DVM_map_params")
            console.log(DVM_map_params);
            $timeout(function(){
                angularLoad.loadScript("https://dynamicvenuemaps.com/maps/dvm.js?v=beta").then(function() {
                    console.log("dvm.js loadded successfully");
                    // Script loaded succesfully.
                    // We can now start using the functions from someplugin.js
                }).catch(function() {
                    console.log("failure");
                    // There was some error loading the script. Meh
                });
            },100);
        }, function errorCallback(response) {
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    $scope.getEventInfo();
});