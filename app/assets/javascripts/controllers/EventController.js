controllers = angular.module('gamehedge')

controllers.controller('EventController', function($scope,$routeParams,dataService,apiService,$window,$filter,$http,$timeout,$location,$rootScope,Auth){

	$scope.prev_filter = true;
    $scope.mob_price = 0;
    $scope.mob_price_a = false;
    $scope.mob_price_b = false;
    $scope.mob_price_c = false;
    $scope.mob_price_d = false;
    
    $scope.mob_price_a_real = false;
    $scope.mob_price_b_real = false;
    $scope.mob_price_c_real = false;
    $scope.mob_price_d_real = false;
    
    $scope.secH = [];
    
    $scope.mob_real_price = 0;
    $scope.price_filter = false;
    $scope.price_filter_down_limit = 0;
    $scope.price_filter_up_limit = 0;

    $rootScope.showHeader = false;
    $rootScope.windoWidth = window.innerWidth;
    
    $scope.filterPriceFn = function(_ele) {
        val = true;
        if($scope.price_filter == true){
            val = false;
            
            if($scope.mob_price_a_real) {
                $scope.price_filter_down_limit = 0;
                $scope.price_filter_up_limit = 100;
                if( _ele.retail_price > $scope.price_filter_down_limit && _ele.retail_price <= $scope.price_filter_up_limit ) {
                    val =  true;
                }
            }
            
            if($scope.mob_price_b_real){
                $scope.price_filter_down_limit = 100;
                $scope.price_filter_up_limit = 200;
                if( _ele.retail_price > $scope.price_filter_down_limit && _ele.retail_price <= $scope.price_filter_up_limit ) {
                    val =  true;
                }
            }
            
            if($scope.mob_price_c_real){
                $scope.price_filter_down_limit = 200;
                $scope.price_filter_up_limit = 300;
                if( _ele.retail_price > $scope.price_filter_down_limit && _ele.retail_price <= $scope.price_filter_up_limit ) {
                    val =  true;
                }
            }
            
            if($scope.mob_price_d_real){
                $scope.price_filter_down_limit = 300;
                $scope.price_filter_up_limit = 99999999999999999999999;
                if( _ele.retail_price > $scope.price_filter_down_limit && _ele.retail_price <= $scope.price_filter_up_limit ) {
                    val =  true;
                }
            }
        }
        else {
            val = true;
        }
        
        return val;
    }
    
    $scope.filterSectionsFn = function(_ele) {
        var _result = false;
        if($scope.selectedSections.length > 0){
            var indexSection = 0;
            for(indexSection = 0; indexSection < $scope.selectedSections.length; indexSection++){
                if(_ele.section == $scope.selectedSections[indexSection]){
                    _result = true;
                    break;
                }
                else {
                    _result = false;
                }
            }
        }
        else {
            _result = true;
        }
        
        return _result;
    }
	
    $scope.getEventInfo = function(){
		return apiService.getData('/api/v1/events/'+$routeParams.eventId)
            .then(function(response){
            	// console.log("Event");
            	// console.log(response);
                $scope.event  = response;
                $rootScope.title = $scope.event.name + " Tickets | Gamehedge";
    			$rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by "+$scope.event.home_performer.sport.ggg+" or more, get 50% of your ticket price back.";
                
                $scope.getTicketList();
                
                if($routeParams.slug != $scope.event.slug){
                    $location.path("/");
                }
                else{
                    $scope.getTicketList();
                }
        });
	};
    
    $scope.filter_active = false;
    
    $scope.openFilter = function() {
        $scope.filter_active = true;
    }
    
    $scope.closeFilter = function() {
        $scope.filter_active = false;
        
        $scope.mob_index = $scope.index;
        $scope.mob_eticket = $scope.etickets;
        
        if($scope.onlyParking == false){
            $scope.mob_delivery = 0;
        }
        else {
            $scope.mob_delivery = 1;
        }
        
        $scope.mob_price_a = $scope.mob_price_a_real;
        $scope.mob_price_b = $scope.mob_price_b_real;
        $scope.mob_price_c = $scope.mob_price_c_real;
        $scope.mob_price_d = $scope.mob_price_d_real;
    }

	$scope.updateFilter = function(index){
		$scope.index = index;
		$scope.prev_filter = false;
		$scope.mob_index = index;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
	}

	$scope.closePrevFilter = function() {
		$scope.prev_filter = false;
	}
    
    $scope.updateMobFilter = function(index){
		$scope.mob_index = index;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
	}
    
    $scope.updateMobDelivery = function(index) {
        $scope.mob_delivery = index;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
    }
    
    $scope.updateMobEticket = function(index) {
        $scope.mob_eticket = !$scope.mob_eticket;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
    }
    
    $scope.mob_price_update = function(_val) {
        switch(_val) {
            case 1: $scope.mob_price_a = !$scope.mob_price_a;
                    break;
            case 2: $scope.mob_price_b = !$scope.mob_price_b;
                    break;
            case 3: $scope.mob_price_c = !$scope.mob_price_c;
                    break;
            case 4: $scope.mob_price_d = !$scope.mob_price_d;
                    break;
        }
        //$scope.mob_price = _val;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
    }
    
    $scope.showMobFilters = function() {
        $scope.index = $scope.mob_index;
        
        $scope.etickets = $scope.mob_eticket;
        
        switch($scope.mob_delivery){
            case 0: $scope.onlyParking = false;
                    break;
            case 1: $scope.onlyParking = true;
                    break;
        }
        //console.log($scope.mob_delivery);
        //console.log($scope.etickets);
        $scope.filter_active = false;
        
        $scope.mob_price_a_real = $scope.mob_price_a;
        $scope.mob_price_b_real = $scope.mob_price_b;
        $scope.mob_price_c_real = $scope.mob_price_c;
        $scope.mob_price_d_real = $scope.mob_price_d;
        
        //console.log($scope.mob_price);
        
        if($scope.mob_price_a == false && $scope.mob_price_b == false && $scope.mob_price_c == false && $scope.mob_price_d == false) {
            $scope.price_filter = false;
        }
        else {
            $scope.price_filter = true;
        }
    }
    
    $scope.displayDetail = false;
    
    $scope.selectedTicket = null;
    
    $scope.showDetail = function(_amount, _ticket){
        $scope.displayDetail = true;
        $scope.selectedTicket = _ticket;
        
        $("#MapContainer").tuMap("HighlightSection", _ticket.section);
    }
    
    $scope.goToCheckout = function(){
        $scope.redirect($scope.selectedTicket.amount, $scope.selectedTicket.id);
    }
    
    $scope.closeDetail = function(){
        $scope.displayDetail = false;
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
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
	}

	$scope.updateEtickets = function(){
		$scope.etickets = !$scope.etickets;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
	}

	$scope.updateParking = function(ids){
		$scope.onlyParking = ids;
        $('#tickets_list').scrollTop(-200);
        $scope.showing_list = 20;
	}

	$scope.getTicketList = function(){

		
		$http({
            method: 'GET',
            url: '/tickets/list/?id='+$routeParams.eventId,
        }).then(function successCallback(response) {
        	$scope.tickets = response;
        	$scope.loading = false;
        	//console.log($scope.tickets);
        	var sections = [];
        	angular.forEach($scope.tickets.data.ticket_groups , function(value, key) {
                value.amount = value.splits[value.splits.length-1];
        		if(sections.indexOf(value.section) == -1){
	                sections.push(value.section);
                    $scope.Data.push({"section":value.section,"price":0,"quantity":1});
	            }	
        	});
        	// $.each(sections, function(value, key) {
	        //     $scope.Data.push({"section":key,"price":0,"quantity":1});
	        // });
	        $scope.loadMap();
	        //console.log(response.data);
        }, function errorCallback(response) {
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
	}

	$scope.higlightSection = function(section,highlight){
		if(highlight == true){
			$("#MapContainer").tuMap("HighlightSection",section);
		}
		else{
			$("#MapContainer").tuMap("ResetSection",section);
		}
	}

	$scope.loadMap = function(){
		var date = $filter('date')($scope.event.occurs_at, 'yyyy-MM-ddTHH:mm');
		//console.log($scope.Data);
		$("#MapContainer").tuMap({
	        EventInfo: {
	            Venue: $scope.event.venue.name,
	            EventName: $scope.event.name,
	            EventDate: date
	        }
	        , MapType: "Interactive"
	        , EnableTooltipSectionView:false
	        , SingleSectionSelection:true
	        , AdaptiveThreshold: 0.8
	        , Tickets: $scope.Data
	        , ColorScheme: 1
	        , ControlsPosition:"Inside"
	        , ServiceUrl: "https://imap.ticketutils.net"
	        , FailoverMapUrl: "https://static.ticketutils.com/Charts/No-Seating-Chart.jpg"
	        , OnError: function (e, Error) {
	            //alert(JSON.stringify(e));
	            //alert(JSON.stringify(Error));
	            //console.log(Error);
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
	        , OnClick:function(e,Section){
	        	if(Section.Active && Section.Selected){
	            	$scope.filterBySection = true;
	                $scope.section = Section.Name;
                    $scope.selectedSections.push(Section.Name);
	                if(Section.SectionViewAvailable){
	                   	$scope.sectionUrl = Section.SectionViewUrl;
	                }
	                else{
	                    $scope.sectionUrl ="";
	                }
	                $scope.applyChanges();
	            }
                else if(Section.Active == true && Section.Selected == false) {
                    var _indexDel = $scope.selectedSections.indexOf(Section.Name);
                    $scope.selectedSections.splice(_indexDel, 1);
                }
                
                //console.log($scope.selectedSections);
                
	        }
	        , OnReset: function () {
	            $scope.filterBySection = false;
				$scope.section = "";
                $scope.selectedSections = [];
				$scope.sectionUrl = "";
				$scope.applyChanges();
				$("#MapContainer").tuMap("RemoveMapControl","Unmapped");
	            $("#MapContainer").tuMap("RemoveMapControl","Parking");
	            $("#MapContainer").tuMap("RemoveMapControl","Tailgate");     
	        }
	        , OnMouseover:function(e,Section){
	            if(Section.Active) {    
	                
	            }
	        }
            , OnInit:function(e,Data){
                //console.log(e);
                //console.log(Data);
            }
	        , TooltipFormatter:function(Data){
	            var Code = "";
	            Code += "Section " + Data.LongName
	            return Code;
	        }
	    });

	    $timeout(function () {
	        $("#MapContainer").tuMap("RemoveMapControl","Unmapped");
	        $("#MapContainer").tuMap("RemoveMapControl","Parking");
	        $("#MapContainer").tuMap("RemoveMapControl","Tailgate");
	    },1000);
	};

	$scope.compareDates = function(event_date,format){
		if(format == "Physical"){
			if(moment().add(72,'h').isAfter(event_date.replace("Z",""))){
	            return false;
	        }
	        else{
	            return true;
	        }
		}
		else{
			return true;
		}
    }

	$scope.applyChanges = function(){
		$scope.$apply()
	};

	$scope.zoomIn = function(){
		var Result=$("Selector").tuMap("ZoomIn");
	}

	$scope.zoomOut = function(){
		var Result=$("Selector").tuMap("ZoomOut");
	}

	$scope.redirect = function(amount,id) {
		//var amount = $($event.currentTarget).parent().parent().parent().find("select").val();
		var url = '/order/'+id+'?amount='+String(amount);
		//console.log(url);
	  	$location.url(url);
	};

    $scope.showMore = function(){
        $scope.showing_list = $scope.showing_list + 20;
    }

	$scope.$on('LastRepeaterElement', function(){
		//console.log('good to go');
		$timeout(function () {
	        $('[data-toggle="tooltip"]').tooltip();
	    }, 1000);
	});

	$scope.getEventInfo();
    $scope.showing_list = 20;
	$scope.Data = [];
	$scope.filterBySection = false;
	$scope.section = "";
    $scope.selectedSections = [];
	$scope.loading = true;
	$scope.sectionUrl = "";
	$scope.onlyParking = false;
	$scope.index = 0;
    $scope.mob_index = 0;
    $scope.mob_delivery = 0;
    $scope.mob_eticket = false;
	$scope.ordering = 'retail_price';
	$scope.etickets = false;
    $scope.physicals = false;
	$rootScope.isOrder = false;
	$rootScope.darkHeader = true;
	$rootScope.noFooter = true;
	$scope.searchTerm = "";
	$window.scrollTo(0, 0);
	//The global variable locat gets the current location.path
	Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
        $rootScope.user = user;
        $rootScope.isLoggedin = true;
    }, function(error) {
        // unauthenticated error
        //console.log("error login");
        $rootScope.user = undefined;
        $rootScope.isLoggedin = false;
    });
})
.filter('numberOfSeats', function() {
  return function(input,numSeats) {
    input = input || '';
    var out = [];
    if(numSeats == 0){
    	out = input;
    }
    else if(numSeats == 5){
    	angular.forEach(input, function(value, key) {
    		//console.log("Section "+value.section+" Row "+value.row);
    		var keepGoing = true;
    		angular.forEach(value.splits, function(value2, key2) {
    			if(value2 >= 5 && keepGoing == true){
    				out.push(value);
    				keepGoing = false;
    			}
    		});
    	});
    }
    else{
    	angular.forEach(input, function(value, key) {
    		if(value.splits.indexOf(numSeats) != -1){
                out.push(value);
            }	
    	});
    }
    return out;
  };
})
.directive('emitLastRepeaterElement', function() {
	return function(scope) {
		if (scope.$last){
			scope.$emit('LastRepeaterElement');
		}
	};
})
.directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');
                
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attrs.scrolly);
                }
                
                if($( document ).width() < 900){
                    var first = null;

                    $("#tickets_list > div").each(function(){
                        if( isScrolledIntoView($(this)) && !first) {
                            first = $(this);
                            first.addClass("row-selected");
                            
                            if($scope.secH.length > 0){
                                for(var u = 0; u < $scope.secH.length; u++){
                                    if(scope.secH[u].toString().indexOf( $(this).data("section").toString() ) == -1){
                                        $("#MapContainer").tuMap("ResetSection", scope.secH[u].toString() );
                                    }
                                }
                            }
                            
                            $scope.secH = [];
                            
                            $("#MapContainer").tuMap("HighlightSection", $(this).data("section").toString() );
                            
                            $scope.secH.push( $(this).data("section").toString() );
                            
                            
                            console.log($scope.secH);
                           // $("#MapContainer").tuMap("SetOptions",{
                            //    SingleSectionSelection:false
                            //});
                            
                            //$("#MapContainer").tuMap("Refresh");
                            
                            
                        }            
                        else
                           $(this).removeClass("row-selected");
                    });

                    function isScrolledIntoView(elem) {
                        var docViewTop = $("#tickets_list").scrollTop();
                        var docViewBottom = docViewTop + $("#tickets_list").height();

                        var elemTop = $(elem).position().top;
                        var elemBottom = elemTop + $(elem).height();

                        return ((elemBottom <= docViewBottom) && (elemTop > -30));
                    }  
                    
                }
                
            });
        }
    };
});;
