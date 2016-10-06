controllers = angular.module('gamehedge')

controllers.controller('mapTestController', function($scope,$routeParams,dataService,apiService,$window,$filter,$http,$timeout,$location,$rootScope,Auth,angularLoad){
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
                if( _ele.section.indexOf( $scope.selectedSections[indexSection] ) != -1){
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
                console.log("Event");
                console.log(response);
                $scope.event  = response;
                $rootScope.title = $scope.event.name + " Tickets | Gamehedge";
                $rootScope.description = "Buy and Save up to 60% on all game tickets. If the home team losses by "+$scope.event.home_performer.sport.ggg+" or more, get 50% of your ticket price back.";
                
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
        $scope.filterEventsData();
        //$scope.showing_list = 20;
    }

    $scope.closePrevFilter = function() {
        $scope.prev_filter = false;
    }
    
    $scope.updateMobFilter = function(index){
        $scope.mob_index = index;
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
    }
    
    $scope.updateMobDelivery = function(index) {
        $scope.mob_delivery = index;
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
    }
    
    $scope.updateMobEticket = function(index) {
        $scope.mob_eticket = !$scope.mob_eticket;
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
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
        //$scope.showing_list = 20;
    }
    
    $scope.mob_price_update_real = function(_val) {
        switch(_val) {
            case 1: $scope.mob_price_a_real = !$scope.mob_price_a_real;
                    break;
            case 2: $scope.mob_price_b_real = !$scope.mob_price_b_real;
                    break;
            case 3: $scope.mob_price_c_real = !$scope.mob_price_c_real;
                    break;
            case 4: $scope.mob_price_d_real = !$scope.mob_price_d_real;
                    break;
        }
        
        if($scope.mob_price_a_real == false && $scope.mob_price_b_real == false && $scope.mob_price_c_real == false && $scope.mob_price_d_real == false) {
            $scope.price_filter = false;
        }
        else {
            $scope.price_filter = true;
        }
        
        //$scope.mob_price = _val;
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
        $scope.filterEventsData();
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
        $scope.filterEventsData();
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
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        var htm = $('.listing-row').sort(function (a1, b1) {
            var a = "";
            var b = "";
            if($scope.ordering.indexOf("section") != -1){
                a = $(a1).attr('data-section');
                b = $(b1).attr('data-section');
            }
            else if($scope.ordering.indexOf("row") != -1){
                a = $(a1).attr('data-row');
                b = $(b1).attr('data-row');
            }
            else if($scope.ordering.indexOf("retail_price") != -1){
                a = $(a1).attr('data-value');
                b = $(b1).attr('data-value');
            }
            var aA = a.replace(reA, "");
            var bA = b.replace(reA, "");
            if($scope.ordering.indexOf("-") == -1){
                if(aA === bA) {
                var aN = parseInt(a.replace(reN, ""), 10);
                    var bN = parseInt(b.replace(reN, ""), 10);
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                } else {
                    return aA > bA ? 1 : -1;
                }
            }
            else{
                if(aA === bA) {
                var aN = parseInt(a.replace(reN, ""), 10);
                    var bN = parseInt(b.replace(reN, ""), 10);
                    return aN === bN ? 0 : aN > bN ? -1 : 1;
                } else {
                    return aA > bA ? -1 : 1;
                }
            }
        })
        $('#tickets_list').html(htm);
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
    }

    $scope.updateEtickets = function(){
        $scope.etickets = !$scope.etickets;
        
        $('#tickets_list').scrollTop(-200);
        //$scope.showing_list = 20;
    }

    $scope.updateParking = function(ids){
        $scope.onlyParking = ids;
        $('#tickets_list').scrollTop(-200);
         $scope.filterEventsData();
        //$scope.showing_list = 20;
    }

    $scope.getTicketList = function(){

        
        $http({
            method: 'GET',
            url: '/tickets/list/?id='+$routeParams.eventId,
        }).then(function successCallback(response) {
            $scope.tickets = response.data.ticket_groups;
            $scope.loading = false;
            // console.log($scope.tickets);
            var sections = [];
            angular.forEach($scope.tickets , function(value, key) {
                value.amount = value.splits[value.splits.length-1];
                if(sections.indexOf(value.section) == -1){
                    sections.push(value.section);
                    $scope.Data.push({"section":value.section,"price":0,"quantity":1});
                }   
            });
            $scope.fillEventsData();
        }, function errorCallback(response) {
            //console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.fillEventsData = function(){
        var htm = "";
        var list = $scope.tickets;
        var select_list = "";
        for(i=0;i<list.length;i++){
            select_list = "";
            var amount = list[i].splits.reverse();
            for(j=0;j<amount.length;j++){
                select_list += '<option value="'+amount[j]+'">'+amount[j]+'</option>'
            }
            if(list[i].public_notes == null){
                htm += '<div class="row listing-row" data-info="'+amount+'" data-section="'+list[i].section+'" data-row="'+list[i].row+'" data-value="'+list[i].retail_price+'" data-type="'+list[i].type+'" data-id="'+list[i].id+'"><div class="hidden-xs hidden-sm col-xs-1 info-ico vertical-center full-height"></div><div class="col-xs-3 col-md-3 vertical-center horizontal-center section full-height">'+list[i].section+'</div><div class="col-xs-2 vertical-center horizontal-center full-height">'+list[i].row+'</div><div class="col-xs-3 col-md-2 vertical-center horizontal-center full-height"><div class="select-container custom-select"><select value="list[i].amount">+'+select_list+'</select></div></div><div class="col-xs-4 vertical-center horizontal-center buy-btn full-height"><span class="buy-btn-span"><button class="redirect-button">$'+list[i].retail_price+'/ea</button><p class="format">'+list[i].format+'</span></div></div>'
            }
            else{
                htm +='<div class="row listing-row"  data-info="'+amount+'" data-section="'+list[i].section+'" data-row="'+list[i].row+'" data-value="'+list[i].retail_price+'" data-type="'+list[i].type+'" data-id="'+list[i].id+'"><div class="hidden-xs hidden-sm col-xs-1 info-ico vertical-center full-height"><span aria-hidden="true" data-toggle="tooltip" data-placement="right" title='+list[i].public_notes+'><img src="'+info_url+'" alt="info" /></span></div><div class="col-xs-3 col-md-3 vertical-center horizontal-center section full-height">'+list[i].section+'</div><div class="col-xs-2 vertical-center horizontal-center full-height">'+list[i].row+'</div><div class="col-xs-3 col-md-2 vertical-center horizontal-center full-height"><div class="select-container custom-select"><select value="list[i].amount">+'+select_list+'</select></div></div><div class="col-xs-4 vertical-center horizontal-center buy-btn full-height"><span class="buy-btn-span"><button class="redirect-button">$'+list[i].retail_price+'/ea</button><p class="format">'+list[i].format+'</span></div></div>'
            }
        }
        $('#tickets_list').html(htm);
        $timeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
            // $('.listing-row').mouseover($scope.higlightSection($(this).attr('data-section'), true));
            $('.listing-row').mouseover(function(){
                $("#MapContainer").tuMap("HighlightSection",$(this).attr('data-section'));
            });
            $('.listing-row').mouseleave(function(){
                $("#MapContainer").tuMap("ResetSection",$(this).attr('data-section'));
            });
            $('.redirect-button').click(function(){
                var vid = $(this).parents().eq('2').attr('data-id');
                var val = $(this).parents().eq('2').find('select').val()
                $scope.relocateURL(vid,val);
            });
        }, 100);
        $scope.filterEventsData();
        $scope.loadMap();
    }

    $scope.relocateURL = function(id,val){
        $location.search('amount', val);
        $location.path('/order/'+id);
        $scope.applyChanges();
    }

    $scope.filterEventsData = function(){
        $('.listing-row').removeClass('hidden');
        if($scope.index != 0){
            $('.listing-row').each(function(){
                if($scope.index == 5){
                    if(Number($(this).attr('data-info').split(',')[0]) < $scope.index){
                        $(this).addClass("hidden");
                    }
                }
                else{
                    if($(this).attr('data-info').split(',').indexOf(String($scope.index)) == -1){
                        $(this).addClass("hidden");
                    }    
                }
            });
        }
        if($scope.price_filter == true){
            $('.listing-row').each(function(){
                var val = false;
                if($scope.mob_price_a_real) {
                    $scope.price_filter_down_limit = 0;
                    $scope.price_filter_up_limit = 100;
                    if(Number($(this).attr('data-value')) > $scope.price_filter_down_limit && Number($(this).attr('data-value')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_b_real){
                    $scope.price_filter_down_limit = 100;
                    $scope.price_filter_up_limit = 200;
                    if( Number($(this).attr('data-value')) > $scope.price_filter_down_limit && Number($(this).attr('data-value')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_c_real){
                    $scope.price_filter_down_limit = 200;
                    $scope.price_filter_up_limit = 300;
                    if( Number($(this).attr('data-value')) > $scope.price_filter_down_limit && Number($(this).attr('data-value')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_d_real){
                    $scope.price_filter_down_limit = 300;
                    $scope.price_filter_up_limit = 99999999999999999999999;
                    if( Number($(this).attr('data-value')) > $scope.price_filter_down_limit && Number($(this).attr('data-value')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                if(val == false){
                    $(this).addClass("hidden");
                }
            });
        }
        $('.listing-row').each(function(){
            if($scope.onlyParking == true){
                if($(this).attr('data-type') == 'event'){
                    $(this).addClass("hidden");
                }
            }
            else{
                if($(this).attr('data-type') == 'parking'){
                    $(this).addClass("hidden");
                }
            }
            if($scope.selectedSections.length > 0){
                if($scope.selectedSections.indexOf($(this).attr('data-section')) == -1){
                    $(this).addClass("hidden");
                }
            }
        });
    }

    $scope.higlightSection = function(section,highlight){
        console.log(section);
        if(section != undefined){
            if(highlight == true){
                $("#MapContainer").tuMap("HighlightSection",section);
            }
            else{
                $("#MapContainer").tuMap("ResetSection",section);
            }
        }
    }

    $scope.loadMap = function(){
        var tickets = []
        for(i=0;i<$scope.tickets.length;i++){
            var b = "";
            for(j=0;j<$scope.tickets[i].splits.length;j++){
                if(j==0){
                    b = b + $scope.tickets[i].splits[j];
                }
                else{
                    b = b + "," + $scope.tickets[i].splits[j];
                }
            }
            var a = {
                id:String($scope.tickets[i].id),
                section:String($scope.tickets[i].section),
                row:String($scope.tickets[i].row),
                price:String($scope.tickets[i].retail_price),
                qty:String($scope.tickets[i].available_quantity),
                avail:String(b),
                notes:String($scope.tickets[i].public_notes),
            }
            tickets.push(a)
        }
        // console.log(tickets)
        var DATA_TICKTES={"list":tickets};
        var map_width = window.innerWidth;
        var map_height = window.innerHeight - 180;
        if(map_width > 991){
            map_width = map_width*0.58;
        }
        else{
            map_height = map_width;
        }
        DVM_map_params = {
            'client_id':'99',
            'map_name':'seatzone_map',
            'key_map_name':'map_key',
            'tickets_container':'tickets_list',
            'map_width':map_width,
            'map_height':map_height,
            'feed_type':'te',
            'event_id': String($scope.event.te_uid),
            'headliner_id':String($scope.event.home_performer.te_uid),
            'venue_id':String($scope.event.venue.te_uid),
            'venue_conf':String($scope.event.venue_configuration_id),
            'tickets_data_object': DATA_TICKTES,
            'static_map': '',
        };
        console.log("DVM_map_params")
        console.log(DVM_map_params);
        $timeout(function(){
            angularLoad.loadScript("/dvm.js?v=35").then(function() {
                console.log("dvm.js loadded successfully");
                $timeout(function(){
                    document.body.addEventListener("sectionSelected", function (e) {
                        console.log(e);
                    },false);
                },1000);
                // Script loaded succesfully.
                // We can now start using the functions from someplugin.js
            }).catch(function() {
                console.log("failure");
                // There was some error loading the script. Meh
            });
        },100);
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

    $("#tickets_list").scroll(function() {
        console.log("jeje");
    });
    
    $scope.showMore = function(){
        // //$scope.showing_list = //$scope.showing_list + 20;
    }

    $scope.getEventInfo();
    //$scope.showing_list = 20;
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
    $rootScope.isEvent = true;
    $rootScope.darkHeader = true;
    $rootScope.noFooter = true;
    $scope.searchTerm = "";
    $scope.compareDate =  "2015-09-05T00:00:00.000Z"
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
});
