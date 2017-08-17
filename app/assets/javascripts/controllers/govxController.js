controllers = angular.module('gamehedge')

controllers.controller('govxController', function($scope,$routeParams,dataService,apiService,$window,$filter,$http,$timeout,$location,$rootScope,Auth,angularLoad){
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
    $('#ticketDetails').hide();
    $('#ticketDetails2').hide();
    $scope.redirecttoorder = function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $rootScope.order_img =  $("#dialog_img").attr('src');
        }
        //$('#dialog1').dialog("close");
        $( ".ui-icon-closethick" ).click();
        var url = '/govx-order/'+$scope.tvid+'?amount='+$scope.tval;
        $location.url(url);
    }
    $scope.getQty = function(){
        $scope.tval = $scope.select_qty;
    }
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
                // console.log("Event");
                // console.log(response);
                $scope.event  = response;
                $rootScope.title = $scope.event.name + " Tickets | Gamehedge";
                $rootScope.description = "Buy and Save up to 75% on all game tickets. If the home team loses by "+$scope.event.home_performer.sport.ggg+" or more, get 50% of your ticket price back.";
                
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
                a = $(a1).attr('data-price');
                b = $(b1).attr('data-price');
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






$timeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
            var tismobile = false;

            // $('.listing-row').mouseover($scope.higlightSection($(this).attr('data-section'), true));
            $('.listing-row').mouseout(function(){
                    $('#seuilbl').css('display','none');                    
            });
            $('.listing-row').mouseover(function(){
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    $('#ticketDetails').show();
                    $('#ticketDetails2').hide();
                }
                
                var vid = $(this).attr('data-ticketid');
                var row = $(this).attr('data-row');
                var qty = $(this).attr('data-info');
                var prc = $(this).attr('data-price');
                var val = $(this).find('select').val();

                if (!tismobile){
                    var rowpos = $(this).position();
                    var rowoffset = $(this).offset();

                    $('#seuilbl').css('top',rowoffset.top-135+'px');
                    $('#seuilbl').css('left','-153px');
                    $('#ref_amount').html('Potential Refund<br/>'+'<b>$'+(prc/2).toFixed(2).replace(/\.0+$/,"")+'/ea*</b>');
                    $('#seuilbl').css('display','block');                    
                }

                var select_list = "";
                $('#tvid').val(vid);
                $scope.tvid = vid;
                $scope.tval = val;
                var qty = qty.split(',');
                for(j=0;j<qty.length;j++){
                    select_list += '<option value="'+qty[j]+'">'+qty[j]+'</option>'
                }
                $('#selectVal').html(select_list);
                $("#ticket_row").html(row);
                $("#ticket_price").html(prc);
                $("#m_refund").html('$'+(prc/2).toFixed(2).replace(/\.0+$/,""));

                //$rootScope.trow = row;
                //$rootScope.tqty = qty;
            });
            $('.redirect-button').click(function(){
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

                }else{
                    var vid = $(this).parents().eq('2').attr('data-ticketid');
                    var val = $(this).parents().eq('2').find('select').val()
                    $scope.relocateURL(vid,val);
                }

            });
        }, 100);







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
            console.log($scope.tickets);
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

    $scope.resetMap = function(){
        isSeatClicked = 0;
        selectedSeats = [];
        client_dvm_reset_maps();
        $scope.selectedSections = [];
        $scope.filterEventsData();
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
            if(list[i].public_notes == null || list[i].public_notes == ""){
                htm += '<div class="row listing-row rowTicket" data-info="'+amount+'" data-section="'+list[i].section+'" data-row="'+list[i].row+'" data-price="'+list[i].retail_price+'" data-type="'+list[i].type+'" data-ticketid="'+list[i].id+'"><div class="hidden-xs hidden-sm col-xs-1 info-ico vertical-center full-height"></div><div class="col-xs-3 col-md-3 vertical-center horizontal-center section2 full-height">'+list[i].section+'</div><div class="col-xs-2 vertical-center horizontal-center full-height">'+list[i].row+'</div><div class="col-xs-3 col-md-2 vertical-center horizontal-center full-height"><div class="select-container custom-select"><select class="rowAvail" value="list[i].amount">+'+select_list+'</select></div></div><div class="col-xs-4 vertical-center horizontal-center buy-btn full-height"><span class="buy-btn-span"><button class="redirect-button">$'+list[i].retail_price+'/ea</button><p class="format">'+list[i].format+'</span></div></div>'
            }
            else{
                htm +='<div class="row listing-row rowTicket" data-info="'+amount+'" data-section="'+list[i].section+'" data-row="'+list[i].row+'" data-price="'+list[i].retail_price+'" data-type="'+list[i].type+'" data-ticketid="'+list[i].id+'"><div class="hidden-xs hidden-sm col-xs-1 info-ico vertical-center full-height"><span aria-hidden="true" data-toggle="tooltip" data-placement="right" title="'+list[i].public_notes+'"><img src="'+info_url+'" alt="info" /></span></div><div class="col-xs-3 col-md-3 vertical-center horizontal-center section2 full-height">'+list[i].section+'</div><div class="col-xs-2 vertical-center horizontal-center full-height">'+list[i].row+'</div><div class="col-xs-3 col-md-2 vertical-center horizontal-center full-height"><div class="select-container custom-select"><select class="rowAvail" value="list[i].amount">+'+select_list+'</select></div></div><div class="col-xs-4 vertical-center horizontal-center buy-btn full-height"><span class="buy-btn-span"><button class="redirect-button">$'+list[i].retail_price+'/ea</button><p class="format">'+list[i].format+'</span></div></div>'
            }
        }
        $('#tickets_list').html(htm);
        $timeout(function () {
            var tismobile = false;
            $('[data-toggle="tooltip"]').tooltip();
            // $('.listing-row').mouseover($scope.higlightSection($(this).attr('data-section'), true));
            $('.listing-row').mouseout(function(){
                    $('#seuilbl').css('display','none');                    
            });

            $('#tickets_list').scroll(function(){
                    $('#seuilbl').css('display','none');                    
            });


            $('.listing-row').mouseover(function(){
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    $('#ticketDetails').show();
                    $('#ticketDetails2').hide();
                    tismobile = true;
                }
                
                var vid = $(this).attr('data-ticketid');
                var row = $(this).attr('data-row');
                var qty = $(this).attr('data-info');
                var prc = $(this).attr('data-price');
                var val = $(this).find('select').val();


                if (!tismobile){
                    var rowpos = $(this).position();
                    var rowoffset = $(this).offset();

                    $('#seuilbl').css('top',rowoffset.top-135+'px');
                    $('#seuilbl').css('left','-153px');
                    $('#ref_amount').html('Potential Refund<br/>'+'<b>$'+(prc/2).toFixed(2).replace(/\.0+$/,"")+'/ea*</b>');
                    $('#seuilbl').css('display','block');                    
                }



                var select_list = "";
                $('#tvid').val(vid);
                $scope.tvid = vid;
                $scope.tval = val;
                var qty = qty.split(',');
                for(j=0;j<qty.length;j++){
                    select_list += '<option value="'+qty[j]+'">'+qty[j]+'</option>'
                }
                $('#selectVal').html(select_list);
                $("#ticket_row").html(row);
                $("#ticket_price").html(prc);
                $("#m_refund").html('$'+(prc/2).toFixed(2).replace(/\.0+$/,""));
                //$rootScope.trow = row;
                //$rootScope.tqty = qty;
            });
            $('.redirect-button').click(function(){
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

                }else{
                    var vid = $(this).parents().eq('2').attr('data-ticketid');
                    var val = $(this).parents().eq('2').find('select').val()
                    $scope.relocateURL(vid,val);
                }

            });
        }, 100);
        $scope.filterEventsData();
        $scope.loadMap();
    }

    $scope.relocateURL = function(id,val){
        $location.search('amount', val);
        $location.path('/govx-order/'+id);
        $scope.applyChanges();
    }

    $scope.filterEventsData = function(){
        $('.listing-row').removeClass('hidden');
        $('.listing-row').each(function(){
            if($scope.selectedSections.length > 0){
                var a = "";
                var b = "";
                for(i=0;i<$scope.selectedSections.length;i++){
                    a = $(this).attr('data-section').replace(/[^0-9]/g, '');
                    b = $scope.selectedSections[i].replace(/[^0-9]/g, '');
                    if(a != b){
                        $(this).addClass("hidden");
                    }
                    else{
                        $(this).removeClass("hidden");
                        break;
                    }
                }
            }
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
        });
        if($scope.index != 0){
            $('.listing-row').each(function(){
                if($scope.index == 5){
                    if(Number($(this).attr('data-info').split(',')[0]) < $scope.index){
                        $(this).addClass("hidden");
                    }else{
                        //QTY FIX                        
                        //FIX DEFAULT SELECTBOX VALUE WHEN QTY FILTER APPLY
                        $(this).find("select").val($(this).attr('data-info').split(',')[0]);
                    }
                }
                else{
                    if($(this).attr('data-info').split(',').indexOf(String($scope.index)) == -1){
                        $(this).addClass("hidden");
                    }  else{
                        //QTY FIX                        
                        //FIX DEFAULT SELECTBOX VALUE WHEN QTY FILTER APPLY
                        $(this).find("select").val($scope.index);
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
                    if(Number($(this).attr('data-price')) > $scope.price_filter_down_limit && Number($(this).attr('data-price')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_b_real){
                    $scope.price_filter_down_limit = 100;
                    $scope.price_filter_up_limit = 200;
                    if( Number($(this).attr('data-price')) > $scope.price_filter_down_limit && Number($(this).attr('data-price')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_c_real){
                    $scope.price_filter_down_limit = 200;
                    $scope.price_filter_up_limit = 300;
                    if( Number($(this).attr('data-price')) > $scope.price_filter_down_limit && Number($(this).attr('data-price')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                
                if($scope.mob_price_d_real){
                    $scope.price_filter_down_limit = 300;
                    $scope.price_filter_up_limit = 99999999999999999999999;
                    if( Number($(this).attr('data-price')) > $scope.price_filter_down_limit && Number($(this).attr('data-price')) <= $scope.price_filter_up_limit ) {
                        val =  true;
                    }
                }
                if(val == false){
                    $(this).addClass("hidden");
                }
            });
        }
    }

    $scope.higlightSection = function(section,highlight){
        // console.log(section);
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
        var map_height = window.innerHeight - 180; //180 DANIEL HEIGHT FIX
        if(map_width > 991){
            map_width = map_width*0.58;
        }
        else{
            map_height = window.innerHeight - 310;//385; DANIEL HEIGHT FIX IPHONE 6 PLUS
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
        console.log('Event ID' + String($scope.event.te_uid))
        console.log('Headliner ID' + String($scope.event.home_performer.te_uid))
        console.log('Venue ID' + String($scope.event.venue.te_uid))
        console.log('Venue Conf' + String($scope.event.venue_configuration_id))
        console.log('Ticket Data Object' + DATA_TICKTES)
        $timeout(function(){
            $.ajax({
               url: '/dvm.js?v=104',
               dataType: "script",
               success: success
             });
             function success(){
                $timeout(function(){
                    document.body.addEventListener("sectionSelected", function (e) {
                        console.log(e);
                    },false);
                },1000);
            }

        },100);
     };
        //console.log("DVM_map_params")
        //console.log(DVM_map_params);
    //     $timeout(function(){
    //         angularLoad.loadScript("/dvm.js?v=104").then(function() {
    //             console.log("dvm.js loadded successfully");
    //             $timeout(function(){
    //                 document.body.addEventListener("sectionSelected", function (e) {
    //                     console.log(e);
    //                 },false);
    //             },1000);
    //             // Script loaded succesfully.
    //             // We can now start using the functions from someplugin.js
    //         }).catch(function() {
    //             console.log("failure");
    //             // There was some error loading the script. Meh
    //         });
    //     },100);
    // };
    $("body").on( "sectionSelected", function(event,section,selected) {
        var bare_section = section.split("-")[section.split("-").length - 1]
        if(selected == true){
            $scope.selectedSections.push(bare_section)
        }
        else{
            $scope.selectedSections.splice($scope.selectedSections.indexOf(bare_section),1);
        }
        //console.log('--------'+$scope.selectedSections);
        $scope.filterEventsData();
    });
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
        var url = '/govx-order/'+id+'?amount='+String(amount);
        //console.log(url);
        $location.url(url);
    };
    // Scroll Functionality on Mobile Map

    // $("#tickets_list").scroll(function() {
    //     console.log("jeje");
    // });
    // -------------------------------------------------------
    // var changedZones = [];
    // var currentZone = [];
    // var RowOffset = $('.filter-header').offset().top;
    // var runOnce = true;
    // var oldData = {};
    // var tempVar = true;
    // $("#tickets_list").scroll(function() {
    //     if(runOnce){
    //         $("path").each(function(){
    //             pathID = $(this).attr('id');
    //             oldData[pathID+"-fill"] = $(this).attr('fill');
    //             oldData[pathID+"-stroke"] = $(this).attr('stroke');
    //         });
    //         runOnce = false;
    //     }
    //     //var resetOldColour = true;
    //     $(".listing-row").each(function(){
    //         if($(this).offset().top <= (RowOffset+104)){
    //             if($(this).offset().top > (RowOffset+34)){
    //                 var topRowId = $(this).attr('data-section');
    //                 topRowIdLength = topRowId.length;
    //                 $('path').each(function(){
    //                     var pathID = $(this).attr('id');
    //                     var subStrPathId = pathID.substr(pathID.length - topRowIdLength);
    //                     if(subStrPathId == topRowId){
    //                         if (changedZones.indexOf(pathID) == -1) {
    //                             changedZones.push(pathID);
    //                         }
    //                         currentZone = [];
    //                         currentZone.push(pathID);
    //                         $(this).attr({fill:'#e5df00',stroke:'#000000'});
    //                     }
    //                 })
    //             }else{
    //                 //if(resetOldColour){
    //                     for (i = 0; i < changedZones.length; i++) {
    //                         var index = changedZones[i];
    //                         if (currentZone.indexOf(index) == -1) {
    //                             $('#'+changedZones[i]).attr({fill:oldData[index+"-fill"],stroke:oldData[index+"-stroke"]});
    //                            var temp = currentZone.indexOf(index);
    //                            changedZones.splice(temp, 1);

    //                         }
    //                     }
    //                    // resetOldColour = false;
    //                 //}
    //             }
    //         }
    //     })
    // });
    
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


    $rootScope.govx = true;
    
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