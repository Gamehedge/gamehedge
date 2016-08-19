controllers = angular.module('gamehedge')

controllers.controller('EventController', function($scope,$routeParams,dataService,apiService,$window,$filter,$http){

	$scope.getEventInfo = function(){
		return apiService.getData('/api/v1/events/'+$routeParams.eventId)
            .then(function(response){
                console.log("Event");
            	console.log(response);
                $scope.event  = response;
                $scope.getTicketList();
        });
	};

	$scope.updateFilter = function($event){
		if($($event.currentTarget).hasClass("active") == true){
			$($event.currentTarget).removeClass("active");
		}
		else{
			$($event.currentTarget).addClass("active");
		}
	}

	$scope.updateSort = function(sort){
		if(sort == $scope.ordering.replace("-","")){
			if($scope.ordering.indexOf("-") == -1){
				$scope.ordering = "-"+sort
			}
			else{
				$scope.ordering = sort
			}
		}
		else{
			$scope.ordering = sort
		}
	}

	$scope.updateEtickets = function(){
		$scope.etickets = !$scope.etickets;
	}

	$scope.getTicketList = function(){
		$http({
            method: 'GET',
            url: '/tickets/list/?id='+String($scope.event.te_uid),
        }).then(function successCallback(response) {
        	$scope.tickets = response;
        	console.log($scope.tickets);
            $scope.loadMap();
        }, function errorCallback(response) {
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
	}

	$scope.loadMap = function(){
		var date = $filter('date')($scope.event.occurs_at, 'yyyy-MM-ddTHH:mm');
		console.log(date)
		$("#MapContainer").tuMap({
	        EventInfo: {
	            Venue: $scope.event.venue.name,
	            EventName: $scope.event.name,
	            EventDate: date
	        }
	        , MapType: "Interactive"
	        , ControlsPosition:"Outside"
	        , EnableTooltipSectionView:false
	        , SingleSectionSelection:true
	        , AdaptiveThreshold: 0.8
	        //, Tickets: Data
	        , ColorScheme: 1
	        , ServiceUrl: "https://imap.ticketutils.net"
	        , FailoverMapUrl: "https://static.ticketutils.com/Charts/No-Seating-Chart.jpg"
	        , OnError: function (e, Error) {
	            //alert(JSON.stringify(e));
	            //alert(JSON.stringify(Error));
	            console.log(Error);
	            if (Error.Code == 0) {
	                var Message = "<div style=\"padding:10px;\">";
	                Message += "<span style=\"color:red;font-weight:bold;\">This Sample is Configured to run under host 'localhost'</span>";
	                Message += "<br />";
	                Message += "Please configure IIS/Apache or Compatible Web Server to point 'demo' folder in order to view the Sample. If you intend to Run it under different Domain, please contact TicketUtils Support for Activation";
	                Message += "</div>";
	                $("#MapContainer").html(Message);
	            }
	            else if(Error.Code == 1){
	                $("#MapContainer").html("");
	                $("#static_seating_chart").show();
	            }
	        }
	    });
	};
	$scope.getEventInfo();
	$scope.ordering = 'retail_price'
	$scope.etickets = false
	$window.scrollTo(0, 0);
});