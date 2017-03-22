//-------------------------------------------------------------
//  Document name: DVM_functions.js
//  Author       : Abdelali AHBIB
//  Object       : SVG intersectionTooltipactive maps Plugin
//  Creation     : 15/07/2013
/*-------------------------------------------------------------
 Version :
 31.12.2013
 - Map text position bug fixed
 - Separate test and production DVM_functions file
 - Use "data-section", "data-row", "data-price" and "data-ticketid" as html tags instead of "class='rowSection'"...Changed also in the documentation
 - "recup_svg.php" changes : get "stroke-linejoin" and "stroke-linecap" path attributes from svg files and add them as "slc" and "slj" to "map_shapes.js" file
 08.11.2013
 - Documentation added to google drive
 15.07.2013
 - version initiale
 -------------------------------------------------------------*/
//vars init
var rMap, panZoom,km_select = '', map_name, parking_map_name, key_map_name, tickets_container, hiddenClickedSections, hiddenClickedRows, logo, event_id, venue_id, headliner_id, tickets_list, venue_folder, map_width, map_height, new_map_width = 0, new_map_height = 0, map_args = [], prices = [], intervals = [],groub_zon_km = [], zone_intervals = {}, glows = [],zoneSectionsList_zone = [], total_tickets_qty = 0, $sections = {}, $rows = {}, $rows_sections = {}, $traces = {}, $other_maps_elements = {}, $map_pins = {}, $map_pins_center = {}, $texts_rows = {}, $texts = {}, tickets_first_list, sections_tickets_list = [], unmapped_tickets_list = [], tickets_qty_filtre = [], tickets_price_filtre = [], filter_vals = [], matched_sections = [], matched_sections_rows = [], matched_sections_reverse = [], matched_rows = [], matched_rows_reverse = [], imgSectionHidden = false, ifInsideTooltipSection = false, imgRowHidden = false, ifInsideTooltipRow = false, is_mobile = false, is_tooltip_big, is_mapped, is_map_test, clickSection, mouseoverSection, sectionsCopy = {}, hasZone = false;
//set map
function set_map(args) {
    is_static_map = false;
    map_args = args;
    map_name = map_args['map_name'];
    map_type = map_args['map_type'];
   
    //console.log(map_args['client_id']+'--');
    parking_map_name = map_args['parking_map_name'];
    key_map_name = map_args['key_map_name'];
    tickets_container = map_args['tickets_container'];
    hiddenClickedSections = tickets_container + 'SectionPass';
    hiddenClickedRows = tickets_container + 'RowPass';
    map_width = map_args['map_width'];
    map_height = map_args['map_height'];
    var tickets_data = map_args['tickets_data'], feed_type = map_args['feed_type'], venue_configuration_id = map_args['venue_configuration_id'];
    event_id = map_args['event_id'];
    venue_id = map_args['venue_id'];
    headliner_id = map_args['headliner_id'];
    //venue folder
    venue_folder = venue_id;

    isSeatClicked = 0;
    selectedSeats = [];
    //folders exceptions
    //clippers
//    if (headliner_id === '101535') {
//        venue_folder += '-clippers';
//    }
//
//    if (DVM_map_params['venue_id'] == '1480_5188' && DVM_map_params['headliner_id'] == '101535') {
//
//        venue_folder = "1480_18273";
////            $dvm_venue_id = "1480";
////            $dvm_venue_conf = "18273";
//    }
//    //honda center - katy perry
//    else if (headliner_id === '122192' && venue_id === '104953') {
//        venue_folder += '-katy';
//    }
//    //Rose Bowl - eminem
//    else if ((headliner_id == '136182' || headliner_id == '101496' || headliner_id == '136181' || headliner_id == '136189') && venue_id == '106322') {
//        venue_folder += '-eminem';
//    }
//    //Xcel Energy Center - Lady Gaga
//    else if (headliner_id === '122688' && DVM_map_params['venue_id'] === '134837') {
//        venue_folder = '123703';
//        venue_id = 123703;
//    }
//    //staples center - sparks
//    if (venue_folder === '105234' && headliner_id === '103733') {
//        venue_folder += '-gr';
//    }
    //dodgers parking test
//    if (venue_folder === '104272' && headliner_id === '101258') {
//        venue_folder += '-parking';
//    }
    //mobile width and height
    // is_mobile = detectmob();
    // if (is_mobile) {
    //     map_width = 600;
    //     map_height = 300;
    // }
    //tickets_data json decode
    //correct a bug in xml version of tickets list
    if (map_args['tickets_data_object']['ticket']) {
        map_args['tickets_data_object']['list'] = map_args['tickets_data_object']['ticket'];
        delete map_args['tickets_data_object']['ticket'];
    }
    //sets all tickets list in a global variable
    if (map_args['tickets_data_object']) {
        tickets_first_list = map_args['tickets_data_object'];
    } else {
        //tickets_first_list = JSON && JSON.parse(tickets_data) || $.parseJSON(tickets_data);
        tickets_first_list = $.parseJSON(tickets_data);
    }
    tickets_list = cloneObject(tickets_first_list);
    tickets_list['list'] = [];
    //to match map sections with section names in the ticket listing : SECTION MATCHING
    var key;
    for (key in tickets_first_list['list']) {
        ticket_id = tickets_first_list['list'][key]['id'];
        //delete space if found in section or row
        if (/^\s*(.+)\s*$/i.test(tickets_first_list['list'][key]['section'])){
            tickets_first_list['list'][key]['section'] = $.trim(tickets_first_list['list'][key]['section'])
        }
        if (/^\s*(.+)\s*$/i.test(tickets_first_list['list'][key]['row'])){
            tickets_first_list['list'][key]['row'] = $.trim(tickets_first_list['list'][key]['row'])
        }
        //and add ticket_id as index
        tickets_list['list'][ticket_id] = tickets_first_list['list'][key];
        //#############   sections
        //matching sections
        es = $.trim(bare_section(tickets_first_list['list'][key]['section']));
        er = $.trim(bare_row(tickets_first_list['list'][key]['row']));
        edited_section = section_matching(es, er);
        if (dvm_matching_synonyms && dvm_matching_synonyms[es]) {
            edited_section = dvm_matching_synonyms[es];
        }
//        if (edited_section === false) {
//            edited_section = match_section_by_num(es);
//            edited_section = sectited_section,er);
//        }
        //garder les matched sections dans une variable propre au cas ou on veut reconnaitre le nom exact de la section avant le matching
        matched_sections[tickets_first_list['list'][key]['section']] = edited_section;
        if (!matched_sections_rows[tickets_first_list['list'][key]['section']])
            matched_sections_rows[tickets_first_list['list'][key]['section']] = [];
        if (!matched_sections_rows[tickets_first_list['list'][key]['section']][tickets_first_list['list'][key]['row']]) {
            matched_sections_rows[tickets_first_list['list'][key]['section']][tickets_first_list['list'][key]['row']] = edited_section;
        }
        if (!matched_sections_reverse[edited_section])
            matched_sections_reverse[edited_section] = [];
        if ($.inArray(tickets_first_list['list'][key]['section'], matched_sections_reverse[edited_section]) === -1) {
            matched_sections_reverse[edited_section].push(tickets_first_list['list'][key]['section']);
        }
        //changer la section dans la variable globale de tickets pour que l'appel soit toujours avec le nom matched
        tickets_list['list'][ticket_id]['section'] = edited_section;
        //#############   rows
        edited_row = bare_row(tickets_first_list['list'][key]['row']);
        edited_row = row_matching(edited_section, edited_row);
        //garder les matched rows dans une variable propre au cas oÃ¯Â¿Â½ on veut reconnaitre le nom exact de la row avant le matching
        if (!matched_rows[edited_section])
            matched_rows[edited_section] = [];
        matched_rows[edited_section][tickets_first_list['list'][key]['row']] = edited_row;
        if (!matched_rows_reverse[edited_section])
            matched_rows_reverse[edited_section] = [];
        if (!matched_rows_reverse[edited_section][edited_row])
            matched_rows_reverse[edited_section][edited_row] = [];
        matched_rows_reverse[edited_section][edited_row].push(tickets_first_list['list'][key]['row']);
        //changer la row dans la variable globale de tickets pour que l'appel soit toujours avec le nom matched
        tickets_list['list'][ticket_id]['row'] = edited_row;
    }
    //detect unmatched sections
    //is_unmatched_sections_parsed
//    for (feed_section_name in matched_sections) {
//        var doubt_section = matched_sections[feed_section_name];
//        //console.log('feed section : '+feed_section_name+'--doubt_section : '+matched_sections[feed_section_name]);
////        $.get("https://dynamicvenuemaps.com/maps/svg_ajax/check_unmatched_section.php", {'venue_folder': venue_folder, 'doubt_section': doubt_section, 'feed_section_name': feed_section_name, 'event_id': event_id}, function () {
////        });
//    }

    //Load rows_tickets_list : an array of row that contains ticket list for each row
    for (var id in tickets_list['list']) {
        t_section = tickets_list['list'][id]['section'];
        t_row = tickets_list['list'][id]['row'];
        if (!sections_tickets_list[t_section])
            sections_tickets_list[t_section] = [];
        sections_tickets_list[t_section][t_row] = tickets_list['list'][id];
        //prices [to use for ranges]
        if ($.inArray(tickets_list['list'][id]['price'], prices) === -1)
        {
            prices.push(parseFloat(tickets_list['list'][id]['price']));
        }
        //qty array
        avail_split = tickets_list['list'][id]['avail'].split(',');
        for (k in avail_split) {
            if (!tickets_qty_filtre[parseFloat(avail_split[k])]) {
                tickets_qty_filtre[parseFloat(avail_split[k])] = [];
            }
            tickets_qty_filtre[parseFloat(avail_split[k])].push(id);
        }
        //prices array for filtre
        if (!tickets_price_filtre[parseFloat(tickets_list['list'][id]['price'])])
        {
            tickets_price_filtre[parseFloat(tickets_list['list'][id]['price'])] = [];
        }
        tickets_price_filtre[parseFloat(tickets_list['list'][id]['price'])].push(id);
        //total qty
        total_tickets_qty += parseInt(tickets_list['list'][id]['qty']);
    }
    //group prices in intervals
    if (map_params['priceRangeColors'] && prices.length > 0) {
        //interv       //intervals = set_intervals(prices);
        intervals = set_intervals();
    }
    $(document).ready(function(){
       $('#seatzone_map').children('svg').attr('viewBox','0 0 800 600').css('left','25');
    });


    //set the containers
    //zoom & pan buttons
    $('#' + map_name).before(
            '<div class="left" id="zoom_div" style="z-index: 99;">' +
            '<a id="map_zoom_plus" href="javascript:void()" title="Zoom In"><img src="https://dynamicvenuemaps.com/maps/images/plus.png" alt="Zoom In" border="0" /></a>' +
            '<div id="slider-vertical"></div>' +
            '<a id="map_zoom_less" href="javascript:void()" title="Zoom Out">' +
            '<img src="https://dynamicvenuemaps.com/maps/images/sk.png" style="height:5px;width: 22px;" border="0" />' +
            '<img src="https://dynamicvenuemaps.com/maps/images/minus.png" alt="Zoom Out" border="0" /></a>' +
            '</div>'
//    +'<div id="pan_map">'+
//        '<div class="left">'+
//            '<div title="Up" id="map_pan_up"></div>'+
//            '<div class="left_init_right_pan"><div title="Left" id="map_pan_left"></div> <div title="Reset" id="map_pan_init"></div> <div title="Right" id="map_pan_right"></div></div>'+
//            '<div title="Down" id="map_pan_down"></div>'+
//        '</div>'+
//    '</div>'
            //+'<div id="slider-vertical" style="height: 61px;"></div>'
            //+'<div class="clear"></div>'
            );
    $('#zoom_div').css('margin-top', '5px');
    $('#zoom_div').css('margin-left', '10px');
//    if (map_args['client_id']=='51') {
//        $('#zoom_div').css('top',($("#"+map_name).offset().top+10)+'px');
//        $('#zoom_div').css('left',($("#"+map_name).offset().left+26)+'px');
//        console.log(($("#"+map_name).offset().top+10)+'px------'+($("#"+map_name).offset().left+26)+'px');
//    }
    //map width and height
    $("#" + map_name).width(map_width + 'px');
    $("#" + map_name).height(map_height + 'px');
    //some hiddens used to show or hide tickets
    $("#" + map_name).html(
            //hidden that saves all selected sections
            '<input type="hidden" id="' + tickets_container + 'SectionPass" name="' + tickets_container + 'SectionPass" value="" />' +
            //hidden that saves all selected rows
            '<input type="hidden" id="' + tickets_container + 'RowPass" name="' + tickets_container + 'RowPass" value="" />'//+

            );
//    $("#"+map_name).before(
//        '<input type="hidden" name="hfdiv" id="hfdiv" value="0" />'+
//        '<input type="hidden" name="hswf" id="hswf" value="0" />'+
//        '<input type="hidden" name="hfdivRow" id="hfdivRow" value="0" />'+
//        '<input type="hidden" name="hswfRow" id="hswfRow" value="0" />'
//        );
    //parking map
//    $("#"+parking_map_name).width(map_width+'px');
//    $("#"+parking_map_name).height(map_height+'px');
//    $("#"+parking_map_name).html("Parking maps");
//    $("#"+parking_map_name).hide();
    //map key
       if (map_type === 'zone' && this_map_params['color_zone'])
        {  
            
        
        zone_intervals=this_map_params['color'];
        
      //console.log('**********sections_tickets_list****************'+tickets_list['list']); 
     //console.log('**********sections_tickets****************'+tickets_first_list['list']); 
    
//      console.log(zone_intervals) ; 
         
                   //{"mezzanine":"#000000","balcony":"#00FFFF","orchestra":"#FF00FF","grand-tier":"#FFFF00"}
           //color_price_ranges={0: "#21CCF4", 1: "#21CCF4", 2: "#21CCF4", 3: "#21CCF4"};
         //  console.log('************zone_intervals**************');
         //  console.log(zone_intervals) ;
         //  


           //console.log('***********seatingChart***************');
           //console.log(seatingChart) ;
           //console.log('*******priceRangeColors*******************');
            //map_params['priceRangeColors']
            var content_map_key = '';
            
            for (var zone in zone_intervals) {
                
               console.log("zone :" +zone+"existe :"+is_section_has_tix_zone(zone));
                var reg=new RegExp("[-]+", "g");
                var zonnne=zone.split(reg);
              
                var zone_x="";
                for (var i=0; i<zonnne.length; i++) {
                    //zone_x+=zonnne[i].charAt(0).toUpperCase()+ zonnne[i].substring(1, tab[i].length) + " ";
                    zone_x += zonnne[i].substring(0, 1).toUpperCase() + zonnne[i].substring(1, zonnne[i].length) + " ";
                }
             
                if(is_section_has_tix_zone(zone) > 0){
                    
                content_map_key += '<div class="map_key_row" value="' + zone + '" style="width:33% !important;margin: 10px 0px 10px 0px"><div id="'+zone+'" class="map_key_color" style="background-color:' + zone_intervals[zone] + ';float:left;margin: 0px 10px 0px 0px"></div>' + zone_x + ' </div>';

                }else{
                
                content_map_key += '<div class="map_key_row" value="' + zone + '" style="opacity: 0.4;width:33% !important;margin: 10px 0px 10px 0px"><div class="map_key_color" style="background-color:' + zone_intervals[zone] + ';float:left;margin: 0px 10px 0px 0px"></div>' + zone_x + ' </div>';
            }
            }
        }else{
            var content_map_key = '';
            for (var i in intervals) {
                content_map_key += '<div class="map_key_row">$' + intervals[i] + ' <div class="map_key_color" style="background-color:' + color_price_ranges[i] + '"></div></div>';
            }
        }
    $("#" + key_map_name).html(content_map_key);
    //$("#"+key_map_name).show();
    //zoom values
    var zoom_width = map_width * 100 / this_map_params['map_original_width'] / 100;
    var zoom_height = map_height * 100 / this_map_params['map_original_height'] / 100;
    if (zoom_width <= zoom_height) {
        zoom = zoom_width;
    } else {
        zoom = zoom_height;
    }
    //instantiate raphael, new map
    rMap = Raphael(map_name, map_width, map_height);
    panZoom = rMap.panzoom({
        map_original_width: this_map_params['map_original_width'],
        map_original_height: this_map_params['map_original_height'],
        map_width: map_width,
        map_height: map_height,
        zoomStep: 0.1,
        initialZoom: 0,
        initialPosition: {
            x: 0,
            y: 0
        }
    });
    panZoom.enable();
    //slider
    $("#slider-vertical").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 9,
        step: 1,
        value: 0,
        stop: function (event, ui) {
            if (ui.value > panZoom.getCurrentZoom()) {
                while (ui.value > panZoom.getCurrentZoom()) {
                    if (panZoom.getCurrentZoom() < 9) {
                        panZoom.zoomIn(1);
                    }
                }
                rows_or_sections_display();
            }
            if (ui.value < panZoom.getCurrentZoom()) {
                while (ui.value < panZoom.getCurrentZoom()) {
                    if (panZoom.getCurrentZoom() > 0) {
                        panZoom.zoomOut(1);
                    }
                }
                rows_or_sections_display();
            }
        }
    });
    //##############   boucler sur les paths pour les tracer et leurs ajouter les evenements de la souris etc...
    for (var key in seatingChart) {
        if (seatingChart[key]['type'] === 'path') {
            element = rMap.path(seatingChart[key]['p']);
            //categorize
            if (is_row(key)) {
                element.node.id = key;
                //recuperer id section et id row
                h = key.indexOf('-s');
                r = key.substr(0, h);
                s = key.substr(h + 1, key.length - h);
                //paramettres
                attrs = normal_attr_row_setting(s, r);
                element.attr(attrs).data('id', key);
                $rows[key] = element;
            } else if (is_section(key)) {
                element.node.id = key;
                //paramettres
                attrs = normal_attr_section_setting(key);
                element.attr(attrs).data('id', key);
                $sections[key] = element;
            } else if (is_trace(key)) {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $traces[key] = element;
            } else {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $other_maps_elements[key] = element;
            }
        }
        else if (seatingChart[key]['type'] === 'rect') {
            element = rMap.rect(seatingChart[key]['x'], seatingChart[key]['y'], seatingChart[key]['w'], seatingChart[key]['h']);
            //categorize
            if (is_row(key)) {
                element.node.id = key;
                //recuperer id section et id row
                h = key.indexOf('-s');
                r = key.substr(0, h);
                s = key.substr(h + 1, key.length - h);
                //paramettres
                attrs = normal_attr_row_setting(s, r);
                element.attr(attrs).data('id', key);
                $rows[key] = element;
            } else if (is_section(key)) {
                element.node.id = key;
                //paramettres
                attrs = normal_attr_section_setting(key);
                element.attr(attrs).data('id', key);
                $sections[key] = element;
            } else if (is_trace(key)) {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $traces[key] = element;
            } else {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $other_maps_elements[key] = element;
            }
        }
        else if (seatingChart[key]['type'] === 'line') {
            element = rMap.path("M" + seatingChart[key]['x1'] + "," + seatingChart[key]['y1'] + " L" + seatingChart[key]['x2'] + "," + seatingChart[key]['y2'] + "z");
            //categorize
            if (is_row(key)) {
                element.node.id = key;
                //recuperer id section et id row
                h = key.indexOf('-s');
                r = key.substr(0, h);
                s = key.substr(h + 1, key.length - h);
                //paramettres
                attrs = normal_attr_row_setting(s, r);
                element.attr(attrs).data('id', key);
                $rows[key] = element;
            } else if (is_section(key)) {
                element.node.id = key;
                //paramettres
                attrs = normal_attr_section_setting(key);
                element.attr(attrs).data('id', key);
                $sections[key] = element;
            } else if (is_trace(key)) {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $traces[key] = element;
            } else {
                element.node.id = key;
                //paramettres
                attrs = get_attr_traces_setting(seatingChart[key]);
                element.attr(attrs).data('id', key);
                $other_maps_elements[key] = element;
            }
        }
        else if (seatingChart[key]['type'] === 'text') {
            //if we will use bg image instead of texts
            if (this_map_params['text_sections_use_bg'] || this_map_params['text_row_use_bg']) {
                break;
            }
            var itr = is_text_row(key);
            if (this_map_params['rows_display'] === false && itr) {
                continue;
            }
            var $t;
            $t = rMap.text(0, 0, seatingChart[key]['t']);
            //$t = rMap.print(0, 0, seatingChart[key]['t'],rMap.getFont(seatingChart[key]['f']));
            $t.node.id = key;
            //var font_size = (seatingChart[key]['s']>2)?seatingChart[key]['s']:'3';
            var font_size = parseFloat(seatingChart[key]['s']); //+0.7;
            if (seatingChart[key]['f'] == 'Arial Black') {
                font_size -= 2;
            }
             if(map_type ==='zone'){
                 var font_color =  '#000000';
             }else{
                 var font_color = (seatingChart[key]['c'] != '') ? seatingChart[key]['c'] : '#636363';
             }
            
            var text_anchor;
            if (this_map_params['old_text_problem_resolved']) {
                text_anchor = 'start';
            } else {
                text_anchor = 'middle';
            }
            $t.attr({
                "fill": font_color,
                "font-family": seatingChart[key]['f'],
                "font-size": font_size,
                "unselectable": "on",
                "font-weight": '400',
                "text-anchor": text_anchor,
                "opacity": 1
            }).data('id', key);
            $t.transform('m' + seatingChart[key]['m']).data('id', key);
            $("#" + key).css('pointer-events', 'none');
            rMap.safari();
            //
            if (itr) {
                $texts_rows[key] = $t;
            } else {
                $texts[key] = $t;
            }
        }
        else if (seatingChart[key]['type'] === 'image') {
            var $t;
            $t = rMap.image('https://dynamicvenuemaps.com/maps/maps_setting/' + venue_folder + '/' + seatingChart[key]['src'], 0, 0, seatingChart[key]['w'], seatingChart[key]['h']);
            //$t = rMap.print(0, 0, seatingChart.texts[key]['t'],rMap.getFont(seatingChart.texts[key]['f']));
            $t.node.id = key;
            $t.attr({
                "unselectable": "on",
                "opacity": 1
            }).data('id', key);
            $t.transform('m' + seatingChart[key]['m']).data('id', key);
            $("#" + key).css('pointer-events', 'none');
            rMap.safari();
        }
    }

    //##### BARRYSTICKETS LOGO
//    logo = rMap.image('http://dynamicvenuemaps.com/maps/images/logo_barrys_map.png',0,(rMap.height-118),185,118);
//    logo.node.id='bg_logo';
//    logo.attr({'opacity': 0.5});
//    logo.toBack();
    //##### BACKGROUND NUMBERS
    if (this_map_params['text_sections_use_bg']) {
        bg_numbers_sections = rMap.image('https://dynamicvenuemaps.com/maps/maps_setting/' + venue_folder + '/map_bg_sections.svg', 0, 0, this_map_params['map_original_width'], this_map_params['map_original_height']);
        bg_numbers_sections.node.id = 'bg_numbers_sections';
        bg_numbers_sections.toBack();
    }
    if (this_map_params['text_row_use_bg']) {
        bg_numbers_rows = rMap.image('https://dynamicvenuemaps.com/maps/maps_setting/' + venue_folder + '/map_bg_rows.svg', 0, 0, this_map_params['map_original_width'], this_map_params['map_original_height']);
        bg_numbers_rows.node.id = 'bg_numbers_rows';
        bg_numbers_rows.attr({'opacity': 0.9});
        bg_numbers_rows.toBack();
    }

    //#####    TRACES : Attributes and events
//    for (keyElement in $traces) {
//    }
    //#####    Rows : Attributes and events
    for (keyElement in $rows) {
        $rows[keyElement].attr({
            'fill': 'none',
            'stroke': '#000',
            "stroke-width": 1,
            'stroke-opacity': 0.2
        }).data('id', keyElement);
        if (seatingChart.shapes)
            $rows[keyElement].toFront();
        //recuperer id section et id row
        half_section_row = keyElement.indexOf('-s');
        row_id = keyElement.substr(0, half_section_row);
        row_section_id = keyElement.substr(half_section_row + 1, keyElement.length - half_section_row);
        //push to rows list
        if (!$rows_sections[row_section_id])
            $rows_sections[row_section_id] = [];
        $rows_sections[row_section_id][row_id] = $rows[keyElement];
        //what to do for every row
        (function (row, row_id, section_id) {
            bs = bare_section(section_id);
            rs = bare_row(row_id);
            row[0].stateRow = 0;
            row[0].style.cursor = "pointer";
            //draw a rowPick with x and y of the row
            if (is_row_has_tix(section_id, row_id)) {
                p = set_rowPick_4_row(row, section_id, row_id);
                //row pointer
                row_rowPick = p[0];
                if (!$map_pins[section_id]) {
                    $map_pins[section_id] = [];
                }
                $map_pins[section_id][row_id] = row_rowPick;
                $map_pins[section_id][row_id].toFront();
                //circle inside the row pointer
                row_rowPickCircle = p[1];
                if (!$map_pins_center[section_id]) {
                    $map_pins_center[section_id] = [];
                }
                $map_pins_center[section_id][row_id] = row_rowPickCircle;
                $map_pins_center[section_id][row_id].toFront();
            }
        })($rows_sections[row_section_id][row_id], row_id, row_section_id);
    }
    //#####    Rows rowPicks : Attributes and events
    for (s in $map_pins) {
        for (r in $map_pins[s]) {
            //what to do for every row rowPick
            (function (map_pin, section_id, row_id) {
                map_pin[0].stateRow = 0;
                map_pin[0].style.cursor = "pointer";
                $map_pins_center[s][r][0].style.cursor = "pointer";
                //map pin
                var mouseoverRowPick = function (rp, e, section_id, row_id) {
                    if (panZoom.getCurrentZoom() >= 0) {
                        //map pin color
//                        var rowPick_params = map_params['rowPickParams']['hover'];
//                        var rowPick_attrs = {
//                            'fill': rowPick_params['color'],
//                            'stroke':rowPick_params['strokeColor'],
//                            'fill-opacity':rowPick_params['opacity'],
//                            'stroke-width': rowPick_params['strokeWidth'],
//                            'stroke-opacity':rowPick_params['strokeOpacity'],
//                            'title':'Row : '+bare_row(row_id)
//                        };
//                        $map_pins[section_id][row_id].animate(rowPick_attrs,0);


                        //tooltip display
                        //mouse coordinates
                        complete_row_id = get_row_complete_id(section_id, row_id);
                        x = $('#rowPick-' + complete_row_id).offset().left + ($map_pins[section_id][row_id].getBBox().width / 2);
                        y = $('#rowPick-' + complete_row_id).offset().top + ($map_pins[section_id][row_id].getBBox().height / 2);
                        display_tooltip_row(section_id, row_id, x, y);
                        if (rp.stateRow === 0) {
                            //change sections color and stroke
                            attrs = hover_attr_row_setting(section_id, row_id);
                            $rows_sections[section_id][row_id].animate(attrs, 500);
                        }
                        //correction bug safari
                        rMap.safari();
                    }
                }
                map_pin[0].onmouseover = function (e) {
                    mouseoverRowPick(this, e, section_id, row_id);
                };
                var mouseoutRowPick = function (rp, e, section_id, row_id) {
                    //if (panZoom.getCurrentZoom()>=1) {
                    if (panZoom.getCurrentZoom() >= 0) {
                        //hide tooltip
                        hide_tooltip_row(true);
                        if (rp.stateRow == 0) {
                            //change sections color and stroke
                            attrs = normal_attr_row_setting(section_id, row_id);
                            $rows_sections[section_id][row_id].animate(attrs, 500);
                            //if there are other tickets clicked we reduce opacity of this row
                            if ($("#" + hiddenClickedRows).val() && $("#" + hiddenClickedRows).val() != '') {
                                var isClicked = 0;
                                var rowsIdsSplit = $("#" + hiddenClickedRows).val().split(",");
                                if ($("#" + hiddenClickedRows).val() == '' || $.inArray(section_id + '|' + row_id, rowsIdsSplit) != -1) {
                                    isClicked++;
                                }
                                if (isClicked == 0) {
                                    $rows_sections[section_id][row_id].animate({
                                        'fill-opacity': map_params['reducedRowOpacity']
                                    }, 500);
                                }
                            }
                        }
                        //correction bug safari
                        rMap.safari();
                    }
                }
                map_pin[0].onmouseout = function (e) {
                    mouseoutRowPick(map_pin[0], e, section_id, row_id);
                };
                var clickRowPick = function (rp, e, section_id, row_id) {
                    //if (panZoom.getCurrentZoom()>=1) {
                    if (panZoom.getCurrentZoom() >= 0) {
                        if (is_row_has_tix(section_id, row_id)) {
                            if (rp.stateRow == 0) {
                                //change rows color and stroke
                                attrs = click_attr_row_setting(section_id, row_id);
                                $rows_sections[section_id][row_id].animate(attrs, 500);
                                //display row tickets
                                display_row_tickets(section_id, row_id, false);
                            } else {
                                //change rows color and stroke
                                attrs = normal_attr_row_setting(section_id, row_id);
                                $rows_sections[section_id][row_id].animate(attrs, 500);
                                //display row tickets
                                display_row_tickets(section_id, row_id, true);
                            }
                            //reduire l'opacitÃ¯Â¿Â½ des autres rows et ne laisser actifs que les rows sÃ¯Â¿Â½lctionnÃ¯Â¿Â½s
                            reduceNotClickedRowsOpacity();
                            if (rp.stateRow == 0)
                                rp.stateRow = 1;
                            else
                                rp.stateRow = 0;
                            //safari bug correction
                            rMap.safari();
                        }
                        //No tickets available in this row
                        else {
                            //change sections color and stroke
                            attrs = normal_attr_row_setting(section_id, row_id);
                            $rows_sections[section_id][row_id].animate(attrs, 500);
                        }
                    }
                }
                map_pin[0].onclick = function (e) {
                    clickRowPick(map_pin[0], e, section_id, row_id);
                };
                //map pin center
                $map_pins_center[s][r][0].onmouseover = function (e) {
                    mouseoverRowPick(map_pin[0], e, section_id, row_id);
                };
                $map_pins_center[s][r][0].onmouseout = function (e) {
                    mouseoutRowPick(map_pin[0], e, section_id, row_id);
                };
                $map_pins_center[s][r][0].onclick = function (e) {
                    clickRowPick(map_pin[0], e, section_id, row_id);
                };
            })($map_pins[s][r], s, r);
        }
    }

    var options = [], optionName = [], zoneName;
    //#####    SECTIONS : Attributes and events
    for (var section in $sections) {
        (function (st, section) {
            st[0].state = 0;
            st[0].style.cursor = "pointer";
            var section_has_tix = false;
            if (is_section_has_tix(section)) {
                section_has_tix = true;
            }
            mouseoverSection = function (sts, section, section_has_tix) {
              if(isSeatClicked == 0) { 
                  if (section_as_row(section) || (this_map_params['rows_display'] === false) ) {// || (this_map_params['rows_display'] && panZoom.getCurrentZoom()<1)
                      //tooltip display
                      if (section_has_tix ) {
                          //mouse coordinates &&  groub_zon_km.length  === 0

  //                        x = e.pageX;

                          var decalage = $('#' + section).offset();
                          x = decalage.left;
                          y = decalage.top;
                          if (sts[0].state === 0) {
                              //change sections color and stroke
                              attrs = hover_attr_section_setting(section);
                              //st.attr(attrs);
                              sts.animate(attrs, 200);

   //-----------------------------------------------------KM-Select------------------------------------------------                           
                              var chaine = $("#" + hiddenClickedSections).val();
                              if (chaine.length )
                              {
                                  var tableau = chaine.split(',');
                                  // console.log(tableau);
                                  for (var i = 0; i < tableau.length; i++) {
                                   // console.log("tableau[" + i + "] = " + 's-' + tableau[i]);
                                    click_attr_section_setting('s-' + tableau[i]);
                                  }
                              }
       
                             
  //-------------------------------------------------------------------------------------------------------------------

                          }
                          
                          display_tooltip_section(section, x, y);
                      }
                      //correction bug safari
                      rMap.safari();
                  }
                  current = section;
                }else{
                    if(selectedSeats.indexOf(section) >= 0){
                        if (section_as_row(section) || (this_map_params['rows_display'] === false) ) {// || (this_map_params['rows_display'] && panZoom.getCurrentZoom()<1)
                            //tooltip display
                            if (section_has_tix ) {
                                //mouse coordinates && groub_zon_km.length  === 0

        //                        x = e.pageX;

                                var decalage = $('#' + section).offset();
                                x = decalage.left;
                                y = decalage.top;
                                if (sts[0].state === 0) {
                                    //change sections color and stroke
                                    attrs = hover_attr_section_setting(section);
                                    //st.attr(attrs);
                                    sts.animate(attrs, 200);

//-----------------------------------------------------KM-Select------------------------------------------------
                                    var chaine = $("#" + hiddenClickedSections).val();
                                    if (chaine.length )
                                    {
                                        var tableau = chaine.split(',');
                                        // console.log(tableau);
                                        for (var i = 0; i < tableau.length; i++) {
                                         // console.log("tableau[" + i + "] = " + 's-' + tableau[i]);
                                            click_attr_section_setting('s-' + tableau[i]);
                                        }
                                    }


//-------------------------------------------------------------------------------------------------------------------

                                }

                                display_tooltip_section(section, x, y);
                            }
                            //correction bug safari
                            rMap.safari();
                        }
                        current = section;
                    }
                }
            };
            st[0].onmouseover = function (e) {
                e = jQuery.event.fix(e);
                mouseoverSection(st, section, section_has_tix);
            };

            var mouseoutSection = function (sts, e, section, section_has_tix) {
                e = jQuery.event.fix(e);
                //if (section_as_row(section) || panZoom.getCurrentZoom()<1) {
                if (section_as_row(section) || (this_map_params['rows_display'] === false) ) {// || (this_map_params['rows_display'] && panZoom.getCurrentZoom()<1)
                    if (sts[0].state === 0 ) {
                        //change sections color and stroke

                        attrs = normal_attr_section_setting(section);
                        sts.animate(attrs, 500);

                        //if there are other tickets clicked we reduce opacity of this section
                        if ($("#" + hiddenClickedSections).val() && $("#" + hiddenClickedSections).val() != '') {
                            var isClicked = 0;
                            var sectionsIdsSplit = $("#" + hiddenClickedSections).val().split(",");
                            if ($("#" + hiddenClickedSections).val() == '' || $.inArray(section, sectionsIdsSplit) !== -1) {
                                isClicked++;
                            }

                            if (isClicked > 0) {
                                sts.animate({
                                    'fill-opacity': sectionSettings['normal']['withTix']['opacity']
                                }, 500);
                            } else {
                                sts.animate({
                                    'fill-opacity': sectionSettings['normal']['noTix']['opacity']
                                }, 500);
                            }
                        }
                    }
                    //hide tooltip
                    if (section_has_tix) {
                        hide_tooltip_section(true);
                    }
  //--------------------------------------------------------------------------------------------------------
               if(zoneSectionsList_zone.length > 0)    {
                     for (var index = 0; index < zoneSectionsList_zone.length; index++) {
      zone_has_tix = is_section_has_tix(bare_section(zoneSectionsList_zone[index]));
      
       if(zone_has_tix){
                          var attrss = click_attr_section_setting(zoneSectionsList_zone[index]);
                           var sts = $sections[zoneSectionsList_zone[index]];
                           
                            sts.animate(attrss, 500);
                        
                     }
                    
                     
      
  }   
               }
  ////-----------------------------------------------------------------------------------------------------                  
                    //correction bug safari
                    rMap.safari();
                }
            }
            st[0].onmouseout = function (e) {
              //  console.log(section);
               
                mouseoutSection(st, e, section, section_has_tix);
            };
            //-------------------------------------05-05-2015-------------------------------------------
            //
            //----------------------------------------------------------------------------------
            clickSection = function (sts, section, section_has_tix) {
                //e = jQuery.event.fix(e);
                //if (section_as_row(section) || panZoom.getCurrentZoom()<1) {
                if (section_as_row(section) || (this_map_params['rows_display'] === false)) {// || (this_map_params['rows_display'] && panZoom.getCurrentZoom()<1)
                    if (section_has_tix) {
                        if (sts[0].state === 0) {
                            //change sections color and stroke
                            attrs = click_attr_section_setting(section);
                            sts.animate(attrs, 500);

                            //                        if (glows.length>0) {
                            //                            for (k in glows) {
                            //                                    console.log(k+' glow removed');
                            //    //                                console.log(glows[k]);
                            //                                glows[k].remove();
                            //                            }
                            //                        }
                            //console.log(section + typeof glows['shadow_'+section] +'---'); click_attr_section_setting('s-' + tableau[i]);
                            //                        if ( typeof glows['shadow_'+section] == 'undefined' )
                            //                            glows['shadow_'+section] = st.glow();
                            //                        console.log(glows);
                            //                        console.log(glows.length);
                            //display section tickets
                            display_section_tickets(section, false);
                            $( "body" ).trigger( "sectionSelected", [ section, true ] );
                            selectedSeats.push(section);
                            isSeatClicked = isSeatClicked + 1;
                              if (section_has_tix ) {
                                //mouse coordinates &&  groub_zon_km.length  === 0

        //                        x = e.pageX;

                                var decalage = $('#' + section).offset();
                                x = decalage.left;
                                y = decalage.top;
                                if (sts[0].state === 0) {
                                    //change sections color and stroke
                                    attrs = hover_attr_section_setting(section);
                                    //st.attr(attrs);
                                    sts.animate(attrs, 200);

         //-----------------------------------------------------KM-Select------------------------------------------------                           
                                    var chaine = $("#" + hiddenClickedSections).val();
                                    if (chaine.length )
                                    {
                                        var tableau = chaine.split(',');
                                        // console.log(tableau);
                                        for (var i = 0; i < tableau.length; i++) {
                                         // console.log("tableau[" + i + "] = " + 's-' + tableau[i]);
                                          click_attr_section_setting('s-' + tableau[i]);
                                        }
                                    }
             
                                   
        //-------------------------------------------------------------------------------------------------------------------

                                }
                                
                                display_tooltip_section(section, x, y);
                            }
                        } else {
                            var indexOfSeat = selectedSeats.indexOf(section);
                            selectedSeats.splice(indexOfSeat, 1);
                            isSeatClicked = isSeatClicked - 1;
                            // console.log(selectedSeats);
                            //change sections color and stroke
                            attrs = normal_attr_section_setting(section);
                            sts.animate(attrs, 500);
                            //display section tickets
                            display_section_tickets(section, true);
                            $( "body" ).trigger( "sectionSelected", [ section, false ] );
                        }
                        //reduire l'opacitÃƒÂ© des autres sections et ne laisser actifs que les sections sÃ¯Â¿Â½lectionnÃ¯Â¿Â½es 
                        reduceNotClickedSectionsOpacity();
                        if (sts[0].state === 0)
                            sts[0].state = 1;
                        else
                            sts[0].state = 0;
                        //safari bug correction
                        rMap.safari();
                        current = section;
                    }
                    //No tickets available in this section
                    else {
                        //change sections color and stroke
                        attrs = normal_attr_section_setting(section);
                        //st.attr(attrs);
                        st.animate(attrs, 500);
                    }
                }
//-----------------------------------------------------KM-Select------------------------------------------------                           

                var chaine = $('#tickets2SectionPass').val();
                
                if(chaine === undefined || chaine === null){}else{
                var tableau = chaine.split(',');

                for (var i = 0; i < tableau.length; i++) {
                    //console.log("tableau[" + i + "] = " + 's-'+tableau[i]);
                    click_attr_section_setting('s-' + tableau[i]);
                }
            }
//-------------------------------------------------------------------------------------------------------------------

            };
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                st[0].ontouchstart = function (e) {
                    $('#ticketDetails').hide();
                    e.preventDefault();
                    $('#ticketDetails').hide();
                    $('#ticketDetails2').show();
                    clickSection(st, section, section_has_tix);
                };
            }else{
                st[0].onclick = function (e) {
                    e.preventDefault();
                    clickSection(st, section, section_has_tix);
                };
            }
        })($sections[section], section);

        sectionsCopy = $sections;

        //Fill section Zone

        zoneName = bare_section(section);
//        console.log("bare_section : "+zoneName+"\n");
        zoneName = zoneName.split("-");
//        console.log("split        : "+zoneName+"\n");
        //remove last value
        zoneName.pop();
//        console.log("pop          : "+zoneName+"\n");
        zoneName = zoneName.join(" ");
//       console.log("join         : "+zoneName+"\n");
        optionName.push(zoneName);
    }

    optionName = uniqueArray(optionName);

    var maxAllowedZone = 600;
//console.log("maxAllowedZone         : "+maxAllowedZone+"\n");
//console.log("optionName.length         : "+optionName+"\n");
    if (optionName.length <= maxAllowedZone)
    {
        $.each(optionName, function (i, value) {
            //----------------------------------km-MAJ-------------------
            var st = $.trim(value[0] + value.substr(1));
            var tab = st.split(" ");
            var chaine = "";
            for (var i = 0; i < tab.length; i++)
            {
                chaine += tab[i].substring(0, 1).toUpperCase() + tab[i].substring(1, tab[i].length) + " ";
            }

            //------------------------------------------------------------
            options.push("<option value='" + value + "'>" + chaine + "</option>");
            //console.log("optionName.length         : "+$.trim(value[0] + value.substr(1))+"\n");
        });
        //Add Zone support

        //dodger baseball

        if (this_map_params['map_zone'])
        {
            //console.log('map zone' + this_map_params['map_zone']);
           // console.log(matched_sections);
            hasZone = true;
            $("#zone").html(options.join(''));
            head.load(
                    'https://dynamicvenuemaps.com/maps/css/multiple-select.css',
                    'https://dynamicvenuemaps.com/maps/js/jquery.multiple.select.js',
                    function ()
                    {
                        //alert('zonne ok');
                        $sections = sectionsCopy;

                        var highlightedSection = [];
                        //get all sections and traces id
                        var sectionList = $.map(seatingChart, function (element, index) {
                            return index;
                        });
                        //select only section
                        sectionList = $.grep(sectionList, function (value, key) {
                            return new RegExp("^s-").test(value);
                        });

                        $('#zoneContainer').css('display', '');
                        $('#zone').multipleSelect({
                            //click_attr_section_setting("s-preferred-field-53"); 
                            placeholder: "Select Zone",
                            selectAll: false,
                            filter: true,
                            multiple: true,
                            multipleWidth: 200,
                            onOpen: function () {
                                $('.ms-drop').css({'width': 460});
                            },
                            onClick: function (view) {


                                var liste_x = "";
                               
                                //Dim all section
                                $.each(sectionList, function (i, value) {
                                    $sections[value].animate({
                                        'fill-opacity': sectionSettings['normal']['noTix']['opacity']
                                    }, 250);
                                });
                                //hide ticket list
                                // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').hide();
                                $('#' + hiddenClickedSections).val('');

                                //Section list to display
                                highlightedSection = [];

                                var zoneSectionsList = [];
                                //For each selected zone
                                $.each($('#zone').multipleSelect('getSelects'), function (selectedId, selectedValue) {
                                   // console.log('getSelect : ' + $('#zone').multipleSelect('getSelects'));
                                    //console.log('selectedValue : ' + selectedValue);
                                    //tranform the zone to "section id" structure
                                    var sectionGroup = format_section_to_id(selectedValue);
                                   
                                    //get all sections which match the zone name
                                    zoneSectionsList = $.grep(sectionList, function (value, key) {
                                        //Filter by zone only
                                        //ex: top deck != top deck vip
                                        return new RegExp(sectionGroup + "-[^-]+$").test(value);
                                    });
                                 
                                    //For each section in the zone
                                    
                                    $.each(zoneSectionsList, function (i, value) {
                                        zone_has_tix = is_section_has_tix(bare_section(value));
                                       // console.log('bare_section : ' + bare_section(value)+"value" +value);
                                        if (zone_has_tix)
                                        {

                                            var sts = $sections[value];
                                            sts[0] = [];
                                            sts[0].state = 0;
                                            clickSection(sts, value, zone_has_tix);


                                            /*  console.log('section :');
                                             console.log(value);
                                             console.log('sts :');
                                             console.log(sts);
                                             console.log('zone_has_tix :');
                                             console.log(zone_has_tix);
                                             
                                             console.log('finish click!!');
                                             */
                                            //Section has ticket(s) so add it to the list

                                            //highlightedSection.push(value);
                                            // $("#" + hiddenClickedSections).val($("#" + hiddenClickedSections).val() + value+',');
                                            //dvm_add_section_to_display_list(bare_section(value), false);
                                            //click_attr_section_setting('value);
                                            // click_attr_section_setting(value);

                                            //liste_x+=value+",";
                                            // alert(value);
                                        }
                                    });


                                    //  alert(liste_x);
                                });

                                if ($('#zone').multipleSelect('getSelects').length === 0)
                                {
                                    // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').show();

                                    $.each(sectionsCopy, function (i, value) {

                                        attrs = normal_attr_section_setting(i);
                                        sectionsCopy[i].animate(attrs, 250);
                                    });
                                }

                                //displayTicketsBySectionList(highlightedSection);

                            }
                        });
                        //********************************************************km***********************************                                   
                        // click_attr_section_setting("s-preferred-field-53");           
                        //********************************************************km*********************************** 
                    });
            //  console.debug(matched_sections);
            // console.log(matched_sections);
            for (var prop in matched_sections) {
                //console.log("prop"+prop+"*****"+matched_sections[prop]);
                //$("#"+prop).val(matched_sections[prop]);
            }
        }

    }




    //#####    Other maps elements : Attributes and events
//    for (keyElement in $other_maps_elements) {
//    }
    //#####    Make texts in the front
    for (keyElement in $texts) {
        if (seatingChart.shapes)
            $texts[keyElement].toFront();
    }
    for (keyElement in $texts_rows) {
        if (seatingChart.shapes)
            $texts_rows[keyElement].toFront();
    }
    //show sections and hide rows
    rows_or_sections_display();
    //add tooltips html to body
    // $(
    //         //tooltip div
    //         '<div id="sectionTooltip" class="move_right" style="position: absolute; display:none;z-index:99;">' +
    //         '<div class="tpit tpit_no_img">' +
    //         '<div class="had">' +
    //         '<div class="colr">' +
    //         '</div>' +
    //         '&nbsp;<span id="fdsection">No section selected</span>&nbsp;    ' +
    //         '</div>' +
    //         '<a class="fancybox_no" id="smallimg"><img class="lb_img" src="" id="imgsmall" width="250" height="140" border="0"/></a>' +
    //         '<div class="lti lti_no_img">' +
    //         '<span class="vrt">QUANTITY </span>: <span id="fdqty">No</span> SEAT(S)<br />' +
    //         '<span class="vrt">ROW(S) </span>: <span id="fdrow">-</span><br />' +
    //         '<span class="vrt">PRICE </span>: <span id="fdprice">-</span>' +
    //         '<p></p>' + //Click this section to view  corresponding listings
    //         '</div>' +
    //         '</div>' +
    //         '</div>' +
    //         '<div id="rowTooltip" style="position: absolute; display:none;z-index:900;">' +
    //         '<div class="tpit tpit_no_img">' +
    //         '<div class="had">' +
    //         '<div class="colr"></div>' +
    //         '<div class="s_r_labels">' +
    //         '<div class="section_label"><span>Section : </span> <span id="fdsection">-</span></div>' +
    //         '<div class="row_label"><span>Row : </span> <span id="fdrow">-</span></div>' +
    //         '</div>' +
    //         '</div>' +
    //         '<a class="fancybox_no" id="smallimg"><img class="lb_img" src="" id="imgsmall" width="250" height="140" border="0"/></a>' +
    //         '<div class="lti lti_no_img">' +
    //         //'AVAILABILITY<br /><br />'+
    //         '<span class="vrt">QUANTITY </span>: <span id="fdqty">No</span> SEAT(S)<br />' +
    //         '<span class="vrt">PRICE </span>: <span id="fdprice">-</span>' +
    //         '<p></p>' + //Click this row to view  corresponding listings
    //         '</div>' +
    //         '</div>' +
    //         '</div>').appendTo('body');
    //initialiser la position du tooltip
    $("#sectionTooltip").css({
        "left": $("#" + map_name).offset().left,
        "top": $("#" + map_name).offset().top
    });
    $("#rowTooltip").css({
        "left": $("#" + map_name).offset().left,
        "top": $("#" + map_name).offset().top
    });
    //resize map
    var zoom_width = map_width * 100 / this_map_params['map_original_width'] / 100;
    var zoom_height = map_height * 100 / this_map_params['map_original_height'] / 100;
    if (zoom_width <= zoom_height)
        zoom = zoom_width;
    else
        zoom = zoom_height;
//    rMap.setViewBox(0, 0, map_width/zoom, map_height/zoom,true);

    rMap.safari();
    //###########added for mousewheel zoom
    //mousewheel
//    $("#"+map_name).bind('mousewheel', function (e, delta) {
//        rows_or_sections_display();
//    });
    $("#" + map_name).bind("mousewheel", function (event) {
        event.preventDefault();
    });
    //mouseleave
    $("#" + map_name).on('mouseleave', function (event) {
        //event.preventDefault();
//        console.log("#"+map_name+' mouseleave');
//        console.log('ifInsideTooltipSection : '+ifInsideTooltipSection);
//        if (!ifInsideTooltipSection) {
//            hide_tooltip_section(false);
//            hide_tooltip_row(false);
//            console.log(' yes hide');
//        } else {
//            console.log(' no hide');
//        }
    });
    //map zoom buttons
    $("#map_zoom_less").click(
            function (event) {
                event.preventDefault();
                //new zoom out with panZoom
                if (panZoom.getCurrentZoom() > 0) {
                    panZoom.zoomOut(1);
                    rows_or_sections_display();
                    //zoom seeker change
                    zoom_seeker_change('-');
                }
            }
    );
    $("#map_zoom_plus").click(
            function (event) {
                event.preventDefault();
                //new zoom in with panZoom
                if (panZoom.getCurrentZoom() < 9) {
                    panZoom.zoomIn(1);
                    rows_or_sections_display();
                    //zoom seeker change
                    zoom_seeker_change('+');
                }
            }
    );
     $("#map_zoom_less_mine").click(
            function (event) {
                event.preventDefault();
                //new zoom out with panZoom
                if (panZoom.getCurrentZoom() > 0) {
                    panZoom.zoomOut(1);
                    rows_or_sections_display();
                    //zoom seeker change
                    zoom_seeker_change('-');
                }
            }
    );
    $("#map_zoom_plus_mine").click(
            function (event) {
                event.preventDefault();
                //new zoom in with panZoom
                if (panZoom.getCurrentZoom() < 9) {
                    panZoom.zoomIn(1);
                    rows_or_sections_display();
                    //zoom seeker change
                    zoom_seeker_change('+');
                }
            }
    );

 
   // $('#sectionTooltip').click(function(){
    
    
   // // $('#smallimg').show();
   // // alert($('#sectionTooltip').next().html());
   // });

    //tooltip display
    $('#sectionTooltip').on('mouseenter', inTooltip).on('mouseleave', outTooltip);
    $('#rowTooltip').on('mouseenter', inTooltipRow).on('mouseleave', outTooltipRow);
    //when you double click on the map
    $("#" + map_name).dblclick(function (event) {
        event.preventDefault();
        $("#map_pan_init").click();
    });
    //pan buttons
    $("#map_pan_up").on('click', function (event) {
        event.preventDefault();
        panZoom.pan(0, -10);
    });
    $("#map_pan_down").click(function (event) {
        event.preventDefault();
        panZoom.pan(0, 10);
    });
    $("#map_pan_right").click(function (event) {
        event.preventDefault();
        panZoom.pan(10, 0);
    });
    $("#map_pan_left").click(function (event) {
        event.preventDefault();
        panZoom.pan(-10, 0);
    });
    $("#map_pan_init").click(function (event) {
        event.preventDefault();
        dvm_map_init();
    });
    //on key interval click
     //-----------------------------------------------------Key Zone KM---------------------------------------------------------------------  
  
    $('.map_key_row').on('click', function (event) {
  //-----------------------------------Firt-------------------------------------------- 
    //$('.map_key_row').on('click', function (event) {
     
    if (map_type === 'zone' && this_map_params['color_zone'])
        {
            dvm_reset_maps(true);
          checkboxes = $("#"+tickets_container+" input[type=checkbox]:checked");
       if(checkboxes.length>0){
        for(var key=0;key<checkboxes.length;key++){
            checkboxes[key].checked="";
        }
    }
    //show all ticket sets
    // $("#"+tickets_container+" .rowTicket").show();
            
        var sectionList = $.map(seatingChart, function (element, index) {
                            return index;
                        });
                        //select only section
                        sectionList = $.grep(sectionList, function (value, key) {
                            return new RegExp("^s-").test(value);
                        });
        i = $(this).parent('div').attr('id');
      //  console.log("html :"+i)
        p = $(this).attr("value");
         // groub_zon_km =format_section_to_id($(this).attr("value"));
        //groub_zon_km.push(format_section_to_id($(this).attr("value")));
       // console.log("groub_zon_km :"+groub_zon_km);
        var sectionGroup = format_section_to_id($(this).attr("value"));
      // console.log('format  : '+sectionGroup+ 'val :'+$(this).attr("value"))
       //---------------------------------Groub zone-----------------------
         
        
        
        var removeCounter = 0;

    for (var index = 0; index < groub_zon_km.length; index++) {
        if (groub_zon_km[index] === sectionGroup) {
            $("#"+groub_zon_km[index]).removeClass('key_selected_km');
            groub_zon_km.splice(index, 1);
            removeCounter++;
            index--;
             
        }
    } 
    if(removeCounter === 0){groub_zon_km.push(sectionGroup);}
   
    //console.log("groub_zon_km :"+groub_zon_km);
        //-------------------------------------------------------------------
        
       zoneSectionsList_zone = [];
        var zoneSectionsList_melang = [];
       
   //-----------------------------------------------------------------
 if(this_map_params['group']){
     for (var index = 0; index < groub_zon_km.length; index++) {
                         $.each(this_map_params['group'], function (k, val) {
                         //console.log("val :" +val+"k :"+k);
                          
                           if (  k ===  groub_zon_km[index]){
                               var reg=new RegExp("[,]+", "g");                                       
                                        var tableau=val.split(reg);
                                        for (var i=0; i<tableau.length; i++) { 
                                         if(tableau[i] != '') zoneSectionsList_melang.push(tableau[i]);
                                        }
                            //  zoneSectionsList_melang.push(val);
                              
                        
                           }
                           
                       });
                   }
                  //console.log("zoneSectionsList_melang"+zoneSectionsList_melang + '---->');
                   }
   //-----------------------------------------------------------------
for (var index = 0; index < groub_zon_km.length; index++) {
        zoneSectionsList_zone_g = $.grep(sectionList, function (value, key) {
                                        //Filter by zone only
                                        //ex: top deck != top deck vip
                                       // console.log("value :" +value+'index :'+zoneSectionsList_melang);  
                                        return new RegExp(groub_zon_km[index] ).test(value);
                                    });
                              
        //console.log("zoneSectionsList_zone_g :" +zoneSectionsList_zone_g+' !sectionList :'+sectionList+ '!groub_zon_km'+groub_zon_km);                          
         // console.log("zoneSectionsList_zone_g" +zoneSectionsList_zone_g);                          
            zoneSectionsList_zone =     $.merge(zoneSectionsList_zone,zoneSectionsList_zone_g); 
            if(zoneSectionsList_melang.length > 0){
            
            zoneSectionsList_zone =     $.merge(zoneSectionsList_zone,zoneSectionsList_melang); 
           }
            // console.log("zoneSectionsList_zone :" +zoneSectionsList_zone);
             $("#"+groub_zon_km[index]).addClass("key_selected_km");
                                    }
                                  
  //console.log("zoneSectionsList_zone :"+zoneSectionsList_zone);
  //var startTime = new Date().getTime();  
  //var elapsedTime = 0; 
 // var char = '';
  for (var index = 0; index < zoneSectionsList_zone.length; index++) {
      zone_has_tix = is_section_has_tix(bare_section(zoneSectionsList_zone[index]));
      
       if(zone_has_tix){
                          var attrss = click_attr_section_setting(zoneSectionsList_zone[index]);
                           var sts = $sections[zoneSectionsList_zone[index]];
                            //sts[0] = [];
                            //sts[0].state = 0;
                            sts.animate(attrss, 500);
                           // char +=zoneSectionsList_zone[index].replace("s-", "")+',';
                            //reduceNotClickedSectionsOpacity();
                            //click_attr_section_setting(zoneSectionsList_zone[index]);
                            //reduceNotClickedSectionsOpacity();  var chaine = $('#tickets2SectionPass').val();
                           // display_section_tickets('s-'+zoneSectionsList_zone[index], true);
                        
//                                            var sts = $sections[zoneSectionsList_zone[index]];
//                                            sts[0] = [];
//                                            sts[0].state = 0;
//                                            clickSection(sts, zoneSectionsList_zone[index], zone_has_tix); 
                     }
                    
                     
      
  }

//         $.each(zoneSectionsList_zone, function (i, value) {
//                     zone_has_tix = is_section_has_tix(bare_section(value));
//                    // console.log("value :" +value+"zone_has_tix :"+zone_has_tix);
////                     if(this_map_params['group']){
////                         $.each(this_map_params['group'], function (k, val) {
////                         console.log("val :" +val+"k :"+k);
////                           if (  k ===  value){
////                               console.log("click trace  value:"+value +' val :'+value);
////                           }
////                           
////                       });
////                   }
// 
//                     if(zone_has_tix){
//                        
//                                            var sts = $sections[value];
//                                            sts[0] = [];
//                                            sts[0].state = 0;
//                                            clickSection(sts, value, zone_has_tix); 
//                     }
//                
//                 });
//elapsedTime = new Date().getTime() - startTime;  
//$("#" + hiddenClickedSections).val(char);
//console.log('---------------TIME--------------'+elapsedTime+'---------------');   

//        zoneSectionsList_zone = $.grep(sectionList, function (value, key) {
//                                        //Filter by zone only
//                                        //ex: top deck != top deck vip
//                                       
//                                        return new RegExp(sectionGroup + "-[^-]+$").test(value);
//                                    });
//                                    
//          if(sectionGroup !== km_select){
//              //map_key_color key_selected_km
//                 $("#"+km_select).removeClass('key_selected_km');
//                        
//              
//                 $.each(zoneSectionsList_zone, function (i, value) {
//                     zone_has_tix = is_section_has_tix(bare_section(value));
//                    //console.log("value" +value+"zone_has_tix"+zone_has_tix);
//                    
//                     if(zone_has_tix){
//                                            var sts = $sections[value];
//                                            sts[0] = [];
//                                            sts[0].state = 0;
//                                            clickSection(sts, value, zone_has_tix); 
//                     }
//                 });
//               km_select  = sectionGroup; 
//               $("#"+km_select).addClass("key_selected_km");
//              // console.log("km_select  :" +km_select +"value :"+p);
//           }else  {
//                $("#"+km_select).removeClass('key_selected_km');
//               dvm_reset_maps(true);
//              
//           km_select  = "";  
//           checkboxes = $("#"+tickets_container+" input[type=checkbox]:checked");
//           if(checkboxes.length>0){
//           for(var key=0;key<checkboxes.length;key++){
//            checkboxes[key].checked="";
//           }
//    }
//    //show all ticket sets
//    $("#"+tickets_container+" .rowTicket").show();
//    //map_key_color key_selected_km
                
                //}                  

    //});
 
        }else{
    //-----------------------------------------------------------------------------------------------------------
        event.preventDefault();
        //initialize filtres
        if (typeof client_dvm_initialize_filters_inputs === 'function') {
            client_dvm_initialize_filters_inputs();
        }
//        $("#filter_qty").val("");
//        $("#filter_min_price").val("");
//        $("#filter_max_price").val("");
        //detect wich interval is clicked
        i = $(this).html();
        //console.log('click zone :'+i);
        is = i.match(/\$(.+)\s?\<div/i);
        p = $.trim(is[1]);
        // price1 to price2 interval
        if (/(.+)-(.+)/i.test(p)) {
            parts = p.match(/(.+)-(.+)/i);
            //filter
            
            prices_to_filter = [];
            prices_to_filter["filter_min_price"] = parts[1];
            prices_to_filter["filter_max_price"] = parts[2];
            //console.log('prices_to_filter :'+prices_to_filter);
            client_dvm_arg_filter(prices_to_filter);
        }
        //price+ interval
        else if (/(.+)+/i.test(p)) {
            parts = p.match(/(.+)\+/i);
            //filter
            //console.log('parts2 :'+parts);
            prices_to_filter = [];
            prices_to_filter["filter_min_price"] = parts[1];
           // console.log('prices_to_filter :'+prices_to_filter);
            client_dvm_arg_filter(prices_to_filter);
        }
    
        }
    
   //-------------------------------------------------END----------------------------- 
    });
 
    //resolves text problem
    if (this_map_params['old_text_problem_resolved']) {
        $('#' + map_name + ' svg tspan').removeAttr('dy');
    }
    //resolves safari problem
    rMap.safari();

//------------------------------3-11-2014------------Mobil------------------------    
    if (map_args['displaySection'] && map_args['displaySection'] != '' && matched_sections[map_args['displaySection']] != '') {
        zone_has_tix = true;
        $("#zoom_div").hide();
            $('#sectionTooltip').hide();
    $('#rowTooltip').hide();
//        feed_section_name = map_args['displaySection'];
//        dvm_section_name = matched_sections[feed_section_name];
//        var sts = $sections['s-' + dvm_section_name];
//        //console.log("sts:"+dvm_section_name);
//     
//        sts[0] = [];
//        sts[0].state = 0;
//        clickSection(sts, 's-' + dvm_section_name, zone_has_tix);
//       //console.log("matched_sections:"+dvm_section_name);
//        $("#draggable").html(" <div id='switch-div'><img class='switch' src='img_new_mobile/switch.png' /></div><div id='switch-map'><img src='http://dynamicvenuemaps.com/maps/maps_setting/" + map_args['venue_id'] + "/seatviews/big/" +dvm_section_name + ".jpg' > </div>");
//        //mouseoverSection(sts, 's-'+map_args['displaySection'], zone_has_tix);
        $("#map").css({
            width: '60%',
            height: '60%'
        });
        var svg = $("#map").find('svg')[0];



        // var w = svg.getAttribute('width').replace('px', '');
        // var h = svg.getAttribute('height').replace('px', '');

        // svg.setAttribute('viewbox', '0 0 ' + w + ' ' + h);
        // svg.setAttribute('preserveaspectratio', 'xMidYMid');
        // svg.setAttribute('width', '');
        // svg.setAttribute('height', '');



        $(svg)
                .css('width', '100%')
                // .css('height', '100%')
                .css('pointer-events', 'none');

                /** fix height in iphone <5 safari ***/

//         function fixWebkitHeightBug(){

// var svgW = 600;
// var svgH = 500;
// var curSVGW = $(svg).width();
// var newSVGH = heightInRatio(svgH,svgW,curSVGW);
// $(svg).height(newSVGH);

//         function heightInRatio(oH,oW,nW){

//         return (oH / oW * nW);

//         }

// }

// $(window).resize(function() {

// fixWebkitHeightBug();

// });
// $(document).ready(function() {

// fixWebkitHeightBug();

// });

/** END fix height in iphone <5 safari  ***/

    }
    //---------------------------END--------------------------------------------------  
}
//---------------------------END--------------------------------------------------  
function displayTicketsBySectionList(sectionList)
{
    //$('#' + hiddenClickedSections).val(uniqueArray($('#' + hiddenClickedSections).val().split(",")));

    $.each(sectionList, function (i, value) {
        attrs = click_attr_section_setting(value);

        // attrs = normal_attr_section_setting(value);
        sectionsCopy[value].animate(attrs, 500);

        $.each(matched_sections_reverse[bare_section(value)], function (msrId, dataSection) {
            // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-section='" + dataSection + "']").show();

        });
    });
}


function uniqueArray(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) === -1)
            result.push(e);
    });
    return result;
}

function zoom_seeker_change(change) {
    //zoom seeker change
    if (change == '+') {
        $("#slider-vertical").slider("value", $("#slider-vertical").slider("value") + 1);
    } else if (change == '-') {
        $("#slider-vertical").slider("value", $("#slider-vertical").slider("value") - 1);
    } else if (change == '0') {
        $("#slider-vertical").slider("value", '0');
    }
}
//------------------------------------------------------------------function-----------------------------

function section_zon(ticketId) {
    //var ticketId = thisTicket.attr('id');
    //section
    es = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('section'));
    er = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('row'));
    if (matched_sections_rows[es] && matched_sections_rows[es][er]) {
        var section = matched_sections_rows[es][er];
    } else if (matched_sections[es]) {
        var section = matched_sections[es];
    } else {
        is_mapped = false;
        hide_tooltip_section(false);
        return false;
    }
    if (section && section !== 'undefined') {
        var section_id = get_section_id(section);
    }
    //row
    if (section && section !== 'undefined' && row && row !== 'undefined') {
        var row = matched_rows[section][er];
        var row_id = get_row_id(row);
    }
    //alert(section);
    //return section;
}
//--------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------
//some buttons functions
$(document).ready(function () {
    setInterval(function() { 
        $('#smallimg').show();
     },1000);
    $('#' + DVM_map_params['tickets_container']).on('mouseenter', '.rowTicket', function (event) {

        //section_zon('134663424');
      //  console.log("-------"+$(this).attr('data-ticketid')+'---------');
        event.preventDefault();
         // if(!scrolling){
         //                   var $this = $(this).find(".tickets_checkout_btn"); 
         //                   $(".tickets_checkout_btn").not($this).hide();
         //                $(this).find('.tickets_checkout_btn').toggle();
         //                }
        var thisTicket = $(this); //.css("cursor","pointer")
        //ticket ID
        var ticketId = thisTicket.attr('data-ticketid');


        es = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('section'));
        er = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('row'));
        if (matched_sections_rows[es] && matched_sections_rows[es][er]) {
            var section = matched_sections_rows[es][er];
        } else if (matched_sections[es]) {
            var section = matched_sections[es];
        } else {
            is_mapped = false;
            hide_tooltip_section(false);
            return false;
        }
        if (section && section !== 'undefined') {
            var section_id = get_section_id(section);
        }
        //row
        if (section && section !== 'undefined' && row && row !== 'undefined') {
            var row = matched_rows[section][er];
            var row_id = get_row_id(row);
            
            // click_attr_section_setting('s-' + section);
        }
        //--------------------------------------km------------------------------
        //alert(section);
       // click_attr_section_setting('s-' + section);
        //-----------------------------------------------------------------------
        //show section tooltip
        is_mapped = true;
        if (section_as_row(section) || (this_map_params['rows_display'] === false)) {
            //display tooltip
            if (section_id && section_id !== 'undefined' && $sections[section_id]) {
                //section coordinates
//                    x = $('#'+section_id).offset().left+($sections[section_id].getBBox().width/2);
//                    y = $('#'+section_id).offset().top+($sections[section_id].getBBox().height/2);
//                var center_point = get_center_point($sections[section_id], $('#' + section_id));
//                x = center_point['x'];
//                y = center_point['y'];
                var decalage = $('#' + section_id).offset();

                x = decalage.left;
                y = decalage.top;
                if (map_args['displaySection']!='0' ) {
                   //--------------------------------------km------------------------------
              //alert(section);
                  click_attr_section_setting('s-' + section);      
                    display_tooltip_section(section_id, x, y);
                    //console.log("----section---"+section_id);
                     //------------------------------------2-2-2015---km--------------------------------
                    $sections[section_id][0].onmouseover(event);
                   //------------------------------------2-2-2015------km-----------------------------
               }
               if (map_args['displaySection']=='0' ) {

                   click_attr_section_setting(section_id);
                    hide_tooltip_section(true);
                   //display_tooltip_section(section_id, x, y);
                   attrs = click_attr_section_setting(section_id);
                  // $sections[section_id][0].animate(attrs, 500);
                  // console.log("----section---"+section_id);
                   $sections[section_id].animate(attrs, 500);
                   $sections[section_id].state = 1;
                   //$sections[section_id][0].onmouseover(event);
                   hide_tooltip_section(true);
                   
                 
                        $.ajax({
                        url:'https://dynamicvenuemaps.com/maps/svg_ajax/ajax_test.php?id='+"../maps_setting/"+ venue_folder +"/seatviews/big/" +section + ".jpg",
                     headers: { 
                                 Accept : "application/json; charset=utf-8",
                                  "Content-Type": "text/plain; charset=utf-8"
                                },
                         dataType: 'jsonp',
                         
                         jsonpCallback: 'mycallback',
                          success: function(data, textStatus, jqXHR){
                        if(data.val == 1){
                  var map = $('#map').html();
                                          // $("#draggable").html(map); 
                                          // $("#draggable").show(); 
                                          //  if ($('#draggable').find('svg').length > 0) {
                                          //       $("#map").html($("#draggable").html());
                                          //  }else{
                                          //   console.log('NON');
                                          //  }
                             
         
                                           $("#map-hide").html("<img src='https://dynamicvenuemaps.com/maps/maps_setting/"+ venue_folder +"/seatviews/big/" +section + ".jpg' >");
                                           
                                          
                                          // $("#draggable").show(); 

                                       }else{
                                         $("#map-hide").hide();
                                        }
                         }
                                 });
                     

    
                    //http://www.dynamicvenuemaps.com/maps/maps_setting/1480_5207/seatviews/small/upper-level-315.jpg
 //attrs = click_attr_section_setting(section);
                  // sts.animate(attrs, 500);
                   //click_attr_section_setting(section_id);
                  //hide_tooltip_section(true);
                  //display_tooltip_section(section_id, x, y);
                  //$sections[section_id][0].onmouseover(event);
                  //click_attr_section_setting(section_id);
                 //clickSection(sts, 's-' + section_id, zone_has_tix);
              // console.log('volder------>'+venue_folder+'section---'+section_id);
                  //clickSection(sts, 's-' + dvm_section_name, zone_has_tix);
               }
                
            }
            //not mapped
            else {
                is_mapped = false;
//                    x = $("#"+map_name+"").offset().left+map_width;
//                    y = $("#"+map_name+"").offset().top;
//                    display_tooltip_section(section_id,x,y);
                hide_tooltip_section(false);
            }
        }
        //show row tooltip
        else {
            //display tooltip
            if (section_id && section_id !== 'undefined' && row_id && row_id !== 'undefined' && $map_pins[section_id] && $map_pins[section_id][row_id]) {
                //row coordinates
                complete_row_id = get_row_complete_id(section_id, row_id);
                x = $('#rowPick-' + complete_row_id).offset().left + ($map_pins[section_id][row_id].getBBox().width / 2);
                y = $('#rowPick-' + complete_row_id).offset().top + ($map_pins[section_id][row_id].getBBox().height / 2);
                display_tooltip_row(section_id, row_id, x, y);
                $('#rowPick-' + complete_row_id).mouseenter();
            }
            //not mapped
            else {
                is_mapped = false;
//                    x = $("#"+map_name+"").offset().left+map_width;
//                    y = $("#"+map_name+"").offset().top;
//                    display_tooltip_row(section_id,row_id,x,y);
                hide_tooltip_row(false);
            }
        }
    }
    );
    $('#' + DVM_map_params['tickets_container']).on('click', '.rowTicket', function (event) {
        //console.log('---1'+map_args['client_id']);
    if(map_args['client_id'] != 50 && map_args['client_id'] != 96 ){
    
        //section_zon('134663424');
        // console.log("-------"+map_args['client_id']+'---------');
        event.preventDefault();
         // if(!scrolling){
         //                   var $this = $(this).find(".tickets_checkout_btn"); 
         //                   $(".tickets_checkout_btn").not($this).hide();
         //                $(this).find('.tickets_checkout_btn').toggle();
         //                }
        var thisTicket = $(this); //.css("cursor","pointer")
        //ticket ID
        var ticketId = thisTicket.attr('id');


        es = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('section'));
        er = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('row'));
        if (matched_sections_rows[es] && matched_sections_rows[es][er]) {
            var section = matched_sections_rows[es][er];
        } else if (matched_sections[es]) {
            var section = matched_sections[es];
        } else {
            is_mapped = false;
            hide_tooltip_section(false);
            return false;
        }
        if (section && section !== 'undefined') {
            var section_id = get_section_id(section);
        }
        //row
        if (section && section !== 'undefined' && row && row !== 'undefined') {
            var row = matched_rows[section][er];
            var row_id = get_row_id(row);
            
            // click_attr_section_setting('s-' + section);
        }
        //--------------------------------------km------------------------------
        //alert(section);
       // click_attr_section_setting('s-' + section);
        //-----------------------------------------------------------------------
        //show section tooltip
        is_mapped = true;
        if (section_as_row(section) || (this_map_params['rows_display'] === false)) {
            //display tooltip
            if (section_id && section_id !== 'undefined' && $sections[section_id]) {
                //section coordinates
//                    x = $('#'+section_id).offset().left+($sections[section_id].getBBox().width/2);
//                    y = $('#'+section_id).offset().top+($sections[section_id].getBBox().height/2);
//                var center_point = get_center_point($sections[section_id], $('#' + section_id));
//                x = center_point['x'];
//                y = center_point['y'];
                var decalage = $('#' + section_id).offset();

                x = decalage.left;
                y = decalage.top;
                if (map_args['displaySection']!='0' ) {
                   //--------------------------------------km------------------------------
              //alert(section);
                  click_attr_section_setting('s-' + section);      
                    display_tooltip_section(section_id, x, y);
                    //console.log("----section---"+section_id);
                     //------------------------------------2-2-2015---km--------------------------------
                    $sections[section_id][0].onmouseover(event);
                   //------------------------------------2-2-2015------km-----------------------------
               }
               if (map_args['displaySection']=='0' ) {

                   click_attr_section_setting(section_id);
                    hide_tooltip_section(true);
                   //display_tooltip_section(section_id, x, y);
                   attrs = click_attr_section_setting(section_id);
                  // $sections[section_id][0].animate(attrs, 500);
                  // console.log("----section---"+section_id);
                   $sections[section_id].animate(attrs, 500);
                   $sections[section_id].state = 1;
                   //$sections[section_id][0].onmouseover(event);
                   hide_tooltip_section(true);
                   
                 
                        $.ajax({
                        url:'https://dynamicvenuemaps.com/maps/svg_ajax/ajax_test.php?id='+"../maps_setting/"+ venue_folder +"/seatviews/big/" +section + ".jpg",
                     headers: { 
                                 Accept : "application/json; charset=utf-8",
                                  "Content-Type": "text/plain; charset=utf-8"
                                },
                         dataType: 'jsonp',
                         
                         jsonpCallback: 'mycallback',
                          success: function(data, textStatus, jqXHR){
                        if(data.val == 1){
                  var map = $('#map').html();
                                          // $("#draggable").html(map); 
                                          // $("#draggable").show(); 
                                          //  if ($('#draggable').find('svg').length > 0) {
                                          //       $("#map").html($("#draggable").html());
                                          //  }else{
                                          //   console.log('NON');
                                          //  }
                             
         
                                           $("#map-hide").html("<img src='https://dynamicvenuemaps.com/maps/maps_setting/"+ venue_folder +"/seatviews/big/" +section + ".jpg' >");
                                           
                                          
                                          // $("#draggable").show(); 

                                       }else{
                                         $("#map-hide").hide();
                                        }
                         }
                                 });
                     

    
                    //http://www.dynamicvenuemaps.com/maps/maps_setting/1480_5207/seatviews/small/upper-level-315.jpg
 //attrs = click_attr_section_setting(section);
                  // sts.animate(attrs, 500);
                   //click_attr_section_setting(section_id);
                  //hide_tooltip_section(true);
                  //display_tooltip_section(section_id, x, y);
                  //$sections[section_id][0].onmouseover(event);
                  //click_attr_section_setting(section_id);
                 //clickSection(sts, 's-' + section_id, zone_has_tix);
              // console.log('volder------>'+venue_folder+'section---'+section_id);
                  //clickSection(sts, 's-' + dvm_section_name, zone_has_tix);
               }
                
            }
            //not mapped
            else {
                is_mapped = false;
//                    x = $("#"+map_name+"").offset().left+map_width;
//                    y = $("#"+map_name+"").offset().top;
//                    display_tooltip_section(section_id,x,y);
                hide_tooltip_section(false);
            }
        }
        //show row tooltip
        else {
            //display tooltip
            if (section_id && section_id !== 'undefined' && row_id && row_id !== 'undefined' && $map_pins[section_id] && $map_pins[section_id][row_id]) {
                //row coordinates
                complete_row_id = get_row_complete_id(section_id, row_id);
                x = $('#rowPick-' + complete_row_id).offset().left + ($map_pins[section_id][row_id].getBBox().width / 2);
                y = $('#rowPick-' + complete_row_id).offset().top + ($map_pins[section_id][row_id].getBBox().height / 2);
                display_tooltip_row(section_id, row_id, x, y);
                $('#rowPick-' + complete_row_id).mouseenter();
            }
            //not mapped
            else {
                is_mapped = false;
//                    x = $("#"+map_name+"").offset().left+map_width;
//                    y = $("#"+map_name+"").offset().top;
//                    display_tooltip_row(section_id,row_id,x,y);
                hide_tooltip_row(false);
            }
        }
    }
    }
    );
    $('#' + DVM_map_params['tickets_container']).on('mouseleave', '.rowTicket', function (event) {

        event.preventDefault();
        var thisTicket = $(this);
        //ticket ID
        var ticketId = thisTicket.attr('data-ticketid');
        //section id
        //alert(ticketId);
        es = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('section'));
        er = $.trim($('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-ticketid=" + ticketId + "]").data('row'));
        if (matched_sections_rows[es] && matched_sections_rows[es][er]) {
            var section = matched_sections_rows[es][er];
        } else if (matched_sections[es]) {
            var section = matched_sections[es];
        } else {
            is_mapped = false;
            hide_tooltip_section(false);
            return false;
        }
        // alert(section);
        if (section && section !== 'undefined') {
            var section_id = get_section_id(section);
        }
        //row id
        if (section && section !== 'undefined') {
            var row = matched_rows[section][er];
            var row_id = get_row_id(row);
        }

        if (section_as_row(section) || (this_map_params['rows_display'] === false) || (this_map_params['rows_display'] && panZoom.getCurrentZoom() < 1)) {
            if (section_id && section_id !== 'undefined' && $sections[section_id]) {
                $sections[section_id][0].onmouseout(event);
                hide_tooltip_section(true);
            } else {
                is_mapped = false;
                hide_tooltip_section(false);
            }
        } else {
            if (section_id && section_id !== 'undefined' && row_id && row_id !== 'undefined' && $map_pins[section_id] && $map_pins[section_id][row_id]) {
                complete_row_id = get_row_complete_id(section_id, row_id);
                $('#rowPick-' + complete_row_id).mouseleave();
                hide_tooltip_row(true);
            } else {
                is_mapped = false;
                hide_tooltip_row(false);
            }
        }
    }
    );
});


//to detect mobile browsers
function detectmob() {
    //alert(navigator.userAgent+'--');
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    return isMobile.any();
}
//test if the key is for a section
function is_section(keyElement) {
    if (keyElement && keyElement != '' && keyElement.substr(0, 2) === 's-') {
        return true;
    }
    return false;
}
//test if the key is for a row
function is_row(keyElement) {
    if (keyElement && keyElement != '' && keyElement.substr(0, 2) === 'r-') {
        return true;
    }
    return false;
}
//test if the key is for a trace
function is_trace(keyElement) {
    if (keyElement && keyElement != '' && keyElement.substr(0, 7) === 'traces-') {
        return true;
    }
    return false;
}
//test if the text is for a row
function is_text_row(keyElement) {
    if (keyElement && keyElement != '' && keyElement.indexOf('num-r-') != -1 && keyElement.indexOf('s-') != -1) {
        return true;
    }
    return false;
}
//test if the key is for the stage
function is_stage(keyElement) {
    if (keyElement.substr(0, 13) == 'traces-stage-') {
        return true;
    }
    return false;
}
//clone javascript object
function cloneObject(obj) {
    if (null == obj || "object" != typeof obj)
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr))
            copy[attr] = obj[attr];
    }
    return copy;
}
//shows sections when the map is normal, when it's zoomed it shows rows and row rowPicks
function rows_or_sections_display() {
    //selon zoomLevel on affiche ou non les rows
    panZoomLevel = parseInt(panZoom.getCurrentZoom());
    //if (panZoomLevel>0) {
    if (this_map_params['rows_display']) {
        //ne pas montrer les numeros des rows au dÃƒÂ©but
        if (this_map_params['text_row_use_bg']) {
            if (panZoomLevel <= 1) {
                $("#bg_numbers_rows").hide();
            } else {
                $("#bg_numbers_rows").show();
            }
        } else {
            //show rows nums
            for (k in $texts_rows) {
                $texts_rows[k].show();
            }
        }
        //view just rows and hide sections
        hide_tooltip_section(false);
        for (s in $rows_sections) {
            for (r in $rows_sections[s]) {
                //show rows
                $rows_sections[s][r].show();
                //show row rowPick
                if ($map_pins[s] && $map_pins[s][r]) {
                    if ($map_pins[s] && $map_pins[s][r]) {
                        $map_pins[s][r].show();
                        $map_pins[s][r].toFront();
                    }
                    if ($map_pins_center[s] && $map_pins_center[s][r]) {
                        $map_pins_center[s][r].show();
                        $map_pins_center[s][r].toFront();
                    }
                }
                if (is_row_clicked(s, r)) {
                    attrs = {
                        'fill-opacity': rowSettings['click']['withTix']['opacity']
                    };
                    $rows_sections[s][r].animate(attrs, 500);
                } else {
                    if ($("#" + hiddenClickedRows).val() == '') {
                        attrs = normal_attr_row_setting(s, r);
                        $rows_sections[s][r].animate(attrs, 500);
                    } else {
                        attrs = {
                            'fill-opacity': map_params['reducedRowOpacity']
                        };
                        $rows_sections[s][r].animate(attrs, 500);
                    }
                }
            }
        }

        //to reduce opacity of the sections with tix
        for (bare_section_id in sections_tickets_list) {
            if (!section_as_row(bare_section_id) && $sections[get_section_id(bare_section_id)]) {
                //$sections[get_section_id(bare_section_id)].hide();
                if (is_section_clicked(get_section_id(bare_section_id))) {
                    attrs = {
                        //'fill-opacity':sectionSettings['normal']['noTix']['opacity']
                        'fill-opacity': 0
                    };
                    $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                } else {
                    attrs = normal_attr_section_setting(get_section_id(bare_section_id));
                    $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                    attrs = {
                        //'fill-opacity':sectionSettings['normal']['noTix']['opacity']
                        'fill-opacity': 0
                    };
                    $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                }
            }
        }
    } else {
        //ne pas montrer les numeros des rows au debut
        if (this_map_params['text_row_use_bg']) {
            $("#bg_numbers_rows").hide();
        } else {
            //hide rows nums
            for (k in $texts_rows) {
                $texts_rows[k].hide();
            }
        }
        //view just sections and hide rows
        hide_tooltip_row(false);
        for (s in $rows_sections) {
            for (r in $rows_sections[s]) {
                //hide row
                $rows_sections[s][r].hide();
                //hide row rowPick
                if ($map_pins[s] && $map_pins[s][r])
                    $map_pins[s][r].hide();
                if ($map_pins_center[s] && $map_pins_center[s][r])
                    $map_pins_center[s][r].hide();
            }
        }

        //section with tix
        for (bare_section_id in sections_tickets_list) {
            if ($sections[get_section_id(bare_section_id)]) {
                //change color according to section status (clicked or not)
                if (is_section_clicked(get_section_id(bare_section_id))) {
                    attrs = {
                        'fill-opacity': sectionSettings['normal']['withTix']['opacity']
                    };
                    $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                } else {
                    if ($("#" + hiddenClickedSections).val() == '') {
                        attrs = normal_attr_section_setting(get_section_id(bare_section_id));
                        $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                    } else {
                        attrs = {
                            'fill-opacity': map_params['reducedSectionOpacity']
                        };
                        $sections[get_section_id(bare_section_id)].animate(attrs, 500);
                    }
                }
            }
        }
    }
}
//initialiser le map
function dvm_map_init() {
    //new init
    while (panZoom.getCurrentZoom() > 0) {
        panZoom.zoomOut(1);
    }
    zoom_seeker_change('0');
    rows_or_sections_display();
}
//show sections or rows by ticket_id
function dvm_show_sections_in_map_by_ticket_ids(arrray_of_tickets) {
    if (arrray_of_tickets.length > 0) {
        //zoomLevel shows what we'll show, rows or sections
        var panZoomLevel = parseInt(panZoom.getCurrentZoom());
        $("#" + hiddenClickedSections).val("");
        for (var key in arrray_of_tickets) {
            ticket_id = arrray_of_tickets[key];
            //ticket
            var ticket = tickets_list['list'][ticket_id];
            var s = ticket['section'];
            var r = ticket['row'];
            //rows
            if (this_map_params['rows_display'] || (this_map_params['rows_display'] === false && panZoomLevel > 0)) {
                complete_row_id = get_row_complete_id(s, r);
                $('#rowPick-' + complete_row_id).click();
            } else {    //sections
                //$('#'+get_section_id(s)).click();
                //add sections added to hiddens
                dvm_add_section_to_display_list(s, r);
                //if matched, change section opacity in the map
                if ($sections[get_section_id(s)]) {
                    //change sections color and stroke
                    attrs = click_attr_section_setting(get_section_id(s));
                    $sections[get_section_id(s)].animate(attrs, 500);
                    $sections[get_section_id(s)][0].state = 1;
                }
            }
        }
        rows_or_sections_display();
    } else {
        //no tickets to compare
    }
}

function dvm_ticket_ids_by_filters(args_to_filter) {
    //new filtre
  
    array_ids_by_qty = [];
    array_ids_by_price = [];
    //qty filtre
    if (!isNaN(args_to_filter['filter_qty'])) {
        for (var q in tickets_qty_filtre) {
            if (parseFloat(args_to_filter['filter_qty']) === parseFloat(q)) {
                for (var key in tickets_qty_filtre[q]) {
                    id = tickets_qty_filtre[q][key];
                    array_ids_by_qty.push(id);
                }
            }
        }
    }
    //price filtre
    if ((!isNaN(args_to_filter['filter_min_price']) || !isNaN(args_to_filter['filter_max_price']))) {
        for (var p in tickets_price_filtre) {
            if (
                    (isNaN(args_to_filter['filter_min_price']) || (parseFloat(p) >= parseFloat(args_to_filter['filter_min_price'])))
                    &&
                    (isNaN(args_to_filter['filter_max_price']) || (parseFloat(p) <= parseFloat(args_to_filter['filter_max_price'])))
                    ) {
                for (var key in tickets_price_filtre[p]) {
                    id = tickets_price_filtre[p][key];
                    array_ids_by_price.push(id);
                }
            }
        }
    }
    //filter arrays intersection
    filter_result = [];
    if (array_ids_by_qty.length > 0) {
        if (array_ids_by_price.length > 0) {
            for (var i in array_ids_by_qty) {
                //if ( array_ids_by_price.indexOf(array_ids_by_qty[i])) {
                if ($.inArray(array_ids_by_qty[i], array_ids_by_price) != -1) {
                    filter_result.push(array_ids_by_qty[i]);
                }
            }
        } else {
            filter_result = array_ids_by_qty;
        }
    } else {
        filter_result = array_ids_by_price;
    }

    return filter_result;
}
/**
 * add section to the hidden containing sections to display
 * @param {string} section_to_add
 * @param {string} row_to_add
 * @returns 
 */
function dvm_add_section_to_display_list(section_to_add, row_to_add) {
    if ($("#" + hiddenClickedSections).val() && $("#" + hiddenClickedSections).val() != '')
        $("#" + hiddenClickedSections).val($("#" + hiddenClickedSections).val() + ',' + section_to_add);
    else
        $("#" + hiddenClickedSections).val(section_to_add);
}
/**
 * add row to the hidden containing rows to display
 * @param {string} section_to_add
 * @param {string} row_to_add
 * @returns 
 */
function dvm_add_row_to_display_list(section_to_add, row_to_add) {
    if ($("#" + hiddenClickedRows).val() && $("#" + hiddenClickedRows).val() != '')
        $("#" + hiddenClickedRows).val($("#" + hiddenClickedRows).val() + ',' + section_to_add + '|' + row_to_add);
    else
        $("#" + hiddenClickedRows).val(section_to_add + '|' + row_to_add);
}
//show rows by price range
function dvm_map_filter(filter_vals) {
    //to get filter values
    filter_qty = parseFloat(filter_vals['filter_qty']);
    filter_min_price = parseFloat(filter_vals['filter_min_price']);
    filter_max_price = parseFloat(filter_vals['filter_max_price']);
    //best value
    filter_best_value = false;
    if (filter_vals['filter_best_value']) {
        filter_best_value = filter_vals['filter_best_value'];
    }
    //etickets
    filter_etickets = false;
    if (filter_vals['filter_etickets']) {
        filter_etickets = filter_vals['filter_etickets'];
    }

    //unclick the others
    //initialiser la liste des clicked rows/sections
    $("#" + hiddenClickedSections).val('');
    $("#" + hiddenClickedRows).val('');
    //new filtre
    array_ids_by_qty = [];
    array_ids_by_price = [];
    //qty filtre
    if (!isNaN(filter_qty)) {
        for (q in tickets_qty_filtre) {
            if (parseFloat(filter_qty) === parseFloat(q)) {
                for (key in tickets_qty_filtre[q]) {
                    id = tickets_qty_filtre[q][key];
                    array_ids_by_qty.push(id);
                }
            }
        }
    }
    //price filtre
    if ((!isNaN(filter_min_price) || !isNaN(filter_max_price))) {
        for (p in tickets_price_filtre) {
            if (
                    (isNaN(filter_min_price) || (parseFloat(p) >= parseFloat(filter_min_price)))
                    &&
                    (isNaN(filter_max_price) || (parseFloat(p) <= parseFloat(filter_max_price)))
                    ) {
                for (key in tickets_price_filtre[p]) {
                    id = tickets_price_filtre[p][key];
                    array_ids_by_price.push(id);
                }
            }
        }
    }
    //filter arrays intersection
    filter_result = [];
    if (array_ids_by_qty.length > 0) {
        if (array_ids_by_price.length > 0) {
            for (i in array_ids_by_qty) {
                //if ( array_ids_by_price.indexOf(array_ids_by_qty[i])) {
                if ($.inArray(array_ids_by_qty[i], array_ids_by_price) !== -1) {
                    filter_result.push(array_ids_by_qty[i]);
                }
            }
        } else {
            filter_result = array_ids_by_qty;
        }
    } else {
        filter_result = array_ids_by_price;
    }

    if (filter_result.length > 0) {
        for (key in filter_result) {
            id = filter_result[key];
            filter_sid = tickets_list['list'][id]['section'];
            filter_rid = tickets_list['list'][id]['row'];
            //color the rows
            if (this_map_params['rows_display']) {
                dvm_add_row_to_display_list(filter_sid, filter_rid);
            }
            //to color sections
            else {
                dvm_add_section_to_display_list(filter_sid, filter_rid);
            }
        }
    }
    if (!is_static_map) {
        reduceNotClickedSectionsOpacity();
    }
}
//reset filters
function dvm_reset_maps(init_filtre_vals) {
    setTimeout(function() {
        if(window.outerWidth < 991){
            var x = $('#mapkey').height()/$('#mapkey').width();
            var y = 10 - (10 * x);
            // console.log("zommed");
            // console.log(Number(y.toFixed(0)));
            //panZoom.zoomIn(y,true);
            rows_or_sections_display();
            //zoom seeker change
            zoom_seeker_change('+');
        }
    }, 10);
    
    init_filtre_vals = typeof init_filtre_vals !== 'undefined' ? init_filtre_vals : true;
    if (!is_static_map) {
        //real size of the map
        while (panZoom.getCurrentZoom() > 0) {
            panZoom.zoomOut(1);
        }
        zoom_seeker_change('0');
        //initial section & rows colors

        //Uncheck selected zone if any
        if (hasZone === true)
        {
            $("#zone").multipleSelect("uncheckAll");
        }
        //browse all sections
        for (s in sections_tickets_list) {
            sid = get_section_id(s);
            if (this_map_params['rows_display'] === false || section_as_row(sid)) {
                if ($sections[sid]) {
                    att = normal_attr_section_setting(s);
                    $sections[sid].animate(att, 200);
                } else {
                    //unmapped
                    //console.log(sid+' unmapped');
                }
            }
            //browse all rows for each section
            if (this_map_params['rows_display']) {
                for (r in sections_tickets_list[s]) {
                    if (is_row_clicked(s, r)) {
                        rid = get_row_id(r);
                        if ($rows_sections[sid][rid]) {
                            att = normal_attr_row_setting(s, r);
                            $rows_sections[sid][rid].animate(att, 200);
                        } else {
                            //unmapped
                            //console.log(sid+' * '+rid+' unmapped');
                        }
                    }
                }
            }
        }
        //initialiser la liste des tickets
        $("#" + hiddenClickedSections).val('');
        $("#" + hiddenClickedRows).val('');
    }
}
//compare tickets
function dvm_compare_tickets(arrray_of_tickets) {
    if (!is_static_map && arrray_of_tickets.length > 0) {
        dvm_show_sections_in_map_by_ticket_ids(arrray_of_tickets);
    }
}

function dvm_show_map_by_ticket_id(tickets_to_compare) {
    for (var i in tickets_to_compare) {
        ticket_id = tickets_to_compare[i];
        //ticket
        var ticket = tickets_list['list'][ticket_id];
        var s = ticket['section'];
        var r = ticket['row'];
        //rows
        //if (panZoomLevel>0) {
//        if ( this_map_params['rows_display'] || (this_map_params['rows_display'] === false && panZoomLevel>0) ) {
//            complete_row_id = get_row_complete_id(s,r);
//            //$('#rowPick-'+complete_row_id).click();
//        }
//        //sections
//        else{
//            //$('#'+get_section_id(s)).click();
//            $("#"+map_name+" #"+get_section_id(s)).show();
//        }
    }
    rows_or_sections_display();
}
//##################  SECTIONS
//gets a bare section value from section map id
function bare_section(section) {
    if (/^s-/.test(section)) {
        section = $.trim(section.replace('s-', ''));
    }
    return section;
}
//returns a section map id
function get_section_id(section) {
    return 's-' + format_section_to_id(section);
}
//detects if section have tickets
function is_section_has_tix(section) {
    bs = bare_section(section);
    mbs = matched_sections_reverse[bs];
    //console.log("sections_tickets_list"+sections_tickets_list);
  // console.log(bs+'--'+mbs);
   // console.log(sections_tickets_list[bs]);
   // console.log(sections_tickets_list[mbs]);
    if (sections_tickets_list[bs] || sections_tickets_list[mbs]) {
        return true;
    }
    return false;
}
function is_section_has_tix_zone(section) {
    
    var sectionList = $.map(seatingChart, function (element, index) {
                            return index;
                        });
                          
                        //select only section
                        sectionList = $.grep(sectionList, function (value, key) {
                            return new RegExp("^s-").test(value);
                        });
       is_zone = [];
   // console.log('sectionList <--- :'+sectionList+' ---->'+section);
        is_zone = $.grep(sectionList, function (value, key) {
                                        //Filter by zone only
                                        //ex: top deck != top deck vip
                                     // console.log('value <--- :'+value+' ---->');
                                        return new RegExp(section).test(value);
                                    });
      var count = 0;
       //console.log('is_zone <--- :'+is_zone+' ---->');
      $.each(is_zone, function (i, value) {
          
                     zone_has_tix = is_section_has_tix(bare_section(value));
                    
                    if(zone_has_tix){
                        count ++;
                    }
              }); 
              
//       if(count > 0) { 
           //console.log('is_zone normal <--- :'+section+' ---->');
           return count;
       
//      }  else if(this_map_params['group']){
//                            $.each(this_map_params['group'], function (i, value) {
//                            var reg = new RegExp(',s-'+section );
//                            if (value.match(reg)) {
//                                count  ++;
//                               //console.log('reg :'+reg + " value :"+value);
//                            }
//                           });
//                           console.log('is_zone pas normal <--- :'+section+' ---->');
//           return count;
//           
//       }    
                 

   
}
//not clicked section : reduce opacity
function reduceNotClickedSectionsOpacity() {
    var nb_clicked = 0;
    for (section_id in $sections) {
        if (section_id && is_section(section_id)) {
            clicked = is_section_clicked(section_id);
            if (clicked) {
                if (is_section_has_tix(section_id)) {
                    $sections[section_id].animate({
                        'fill-opacity': sectionSettings['normal']['withTix']['opacity']
                    }, 500);
                } else {
                    $sections[section_id].animate({
                        'fill-opacity': sectionSettings['normal']['noTix']['opacity']
                    }, 500);
                }
                nb_clicked++;
            } else {
                $sections[section_id].animate({
                    'fill-opacity': sectionSettings['normal']['noTix']['opacity']
                }, 500);
            }
        }
    }
    //si aucune section n'est selectionnÃƒÂ©e, on rends l'opacity normal pour tt
    if (nb_clicked === 0) {
        for (section_id in $sections) {
            if (section_id && is_section(section_id)) {
                if (is_section_has_tix(section_id)) {
                    $sections[section_id].animate({
                        'fill-opacity': sectionSettings['normal']['withTix']['opacity']
                    }, 500);
                } else {
                    $sections[section_id].animate({
                        'fill-opacity': sectionSettings['normal']['noTix']['opacity']
                    }, 500);
                }
            }
        }
    }
}
//is section clicked
function is_section_clicked(section) {
    var a = 0;
    bs = bare_section(section);
    if ($("#" + hiddenClickedSections).val() && $("#" + hiddenClickedSections).val() != '') {
        var sectionsIdsSplit = $("#" + hiddenClickedSections).val().split(",");
        if ($("#" + hiddenClickedSections).val() == '' || $.inArray(bs, sectionsIdsSplit) !== -1) {
            a++;
        }
    }
    if (a === 0)
        return false;
    else
        return true;
}
//match unmatched sections by num
function match_section_by_num(msn_es) {
    if (/\d+/.test(msn_es)) {
        //catch first number in the chain
        var results = msn_es.match(/\d+/);
        msn_es = results[0];
        for (var key in tickets_first_list['list']) {
            t = tickets_first_list['list'][key];
            if (/\d+/.test(t['section'])) {
                var results = t['section'].match(/\d+/);
                msn_rs = results[0];
                if (msn_rs == msn_es) {
                    msn_es = t['section'];
                }
            }
        }
    }

    return msn_es;
}


//##################  section Attributes
////InternetExplorerVersion 29-10-2015
function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
//section normal settings
function normal_attr_section_setting(section, dontColorTix) {
    //paramettres
    var normal_color_section = '';
    var tix_status = 'noTix';
    if (!dontColorTix && is_section_has_tix(section)) {
        tix_status = 'withTix';
         
        if (intervals.length > 0 && sections_tickets_list[bare_section(section)]) {
            normal_color_section = get_color_by_section(bare_section(section));
//             console.log('**********normal_attr_section_setting interval****************');
//             console.log("normal_color_section interval"+normal_color_section);
//             console.log(section) ;
        }
        
       // console.log('-------hm_11-12-------');
        //if (zone_intervals.length > 0 && sections_tickets_list[bare_section(section)]) {
        if (map_type === 'zone' && this_map_params['color_zone']){
            normal_color_section = get_color_by_zone(bare_section(section));
//            console.log('**********normal_attr_section_setting****************');
//            console.log("normal_color_section  zone "+normal_color_section);
//            console.log(section) ; 
           
        }
    }
    if (normal_color_section == '')
        normal_color_section = sectionSettings['normal'][tix_status]['color'];
    var normal_fill_opacity = sectionSettings['normal'][tix_status]['opacity'];
    var normal_color_border = sectionSettings['normal'][tix_status]['strokeColor'];
    var normal_width_border = sectionSettings['normal'][tix_status]['strokeWidth'];
    var normal_opacity_border = sectionSettings['normal'][tix_status]['strokeOpacity'];
    var attrs = {'id': section};
    if (normal_color_section && normal_color_section != '' && normal_color_section !== 'undefined') {
        attrs['fill'] = normal_color_section;
    }
    if (normal_color_border && normal_color_border != '' && normal_color_border !== 'undefined') {
        attrs['stroke'] = normal_color_border;
    }
    if (normal_fill_opacity && normal_fill_opacity != '' && normal_fill_opacity !== 'undefined') {
        attrs['fill-opacity'] = normal_fill_opacity;
    }
    if (normal_width_border && normal_width_border != '' && normal_width_border !== 'undefined') {
        attrs['stroke-width'] = normal_width_border;
    }
    if (normal_opacity_border && normal_opacity_border != '' && normal_opacity_border !== 'undefined') {
        attrs['stroke-opacity'] = normal_opacity_border;
    }

//    attrs = {
//        'id': section,
//        'fill': normal_color_section,
//        'stroke':normal_color_border,
//        'fill-opacity':normal_fill_opacity,
//        'stroke-width': normal_width_border,
//        'stroke-opacity':normal_opacity_border
//    };
    return attrs;
}
//on hover settings
function hover_attr_section_setting(section) {
    //paramettres

    var tix_status = 'noTix';
    if (is_section_has_tix(section)) {
        tix_status = 'withTix';
    }
    var hover_color_section = sectionSettings['hover'][tix_status]['color'];
    var hover_fill_opacity = sectionSettings['hover'][tix_status]['opacity'];
    // var hover_width_border = 1;
    // var hover_opacity_border = 1;
    var hover_color_border = "black";//sectionSettings['hover'][tix_status]['strokeColor'];
    var hover_width_border = sectionSettings['hover'][tix_status]['strokeWidth'];
    var hover_opacity_border = sectionSettings['hover'][tix_status]['strokeOpacity'];
    var attrs = {'id': section};
    if (hover_color_section && hover_color_section != '' && hover_color_section !== 'undefined') {
        attrs['fill'] = hover_color_section;
    }
    if (hover_color_border && hover_color_border != '' && hover_color_border !== 'undefined') {
          if (getInternetExplorerVersion() === -1)
        {
        attrs['stroke'] = hover_color_border;
       }
    }
    if (hover_fill_opacity && hover_fill_opacity != '' && hover_fill_opacity !== 'undefined') {
        attrs['fill-opacity'] = hover_fill_opacity;
    }
    if (hover_width_border && hover_width_border != '' && hover_width_border !== 'undefined') {
        attrs['stroke-width'] = hover_width_border;
    }
    if (hover_opacity_border && hover_opacity_border != '' && hover_opacity_border !== 'undefined') {
        attrs['stroke-opacity'] = hover_opacity_border;
    }
    var sec_id_temp = attrs['id'];
//         console.log("sec_id_temp:"+sec_id_temp);
    if (getInternetExplorerVersion() === -1)
        {
    $sections[sec_id_temp].toFront();
        }
    $.each($texts, function (i, value) {
//            console.log(value);
        value.toFront();
    });

    var textList = $.map(seatingChart, function (element, index) {
        if (seatingChart[index]['type'] === 'path')
            return index;
    });

    textList = $.grep(textList, function (value, key) {
        return new RegExp("^text-").test(value);
    });

    $.each(textList, function (i, value) {
        $sections[value].toFront();
    });
//    attrs = {
//        'id': section,
//        'fill': hover_color_section,
//        'stroke':hover_color_border,
//        'fill-opacity':hover_fill_opacity,
//        'stroke-width': hover_width_border,
//        'stroke-opacity':hover_opacity_border
//    };

    return attrs;
}
//on click settings
function click_attr_section_setting(section) {
    //paramettres
//    console.log("*****"+section+"*********");
    //alert("---"+section);
    var click_color_section = '';
    var tix_status = 'noTix';
    if (is_section_has_tix(section)) {
        tix_status = 'withTix';
          if (map_type === 'zone' && this_map_params['color_zone'])
        {
            click_color_section = get_color_by_zone(bare_section(section));
        }else
        if (intervals.length > 0 && sections_tickets_list[bare_section(section)]) {
            click_color_section = get_color_by_section(bare_section(section));
        }
        
    }
    if (click_color_section == '')
        click_color_section = sectionSettings['click'][tix_status]['color'];
    //var click_color_section = sectionSettings['click'][tix_status]['color'];
    var click_fill_opacity = sectionSettings['click'][tix_status]['opacity'];
    var click_color_border = "black";
    var click_width_border = 2;
    var click_opacity_border = 1;
    // var click_color_border = sectionSettings['click'][tix_status]['strokeColor'];
    // var click_width_border = sectionSettings['click'][tix_status]['strokeWidth'];
    //var click_opacity_border = sectionSettings['click'][tix_status]['strokeOpacity'];

    var attrs = {'id': section};
    if (click_color_section && click_color_section != '' && click_color_section !== 'undefined') {
        attrs['fill'] = click_color_section;
    }
    if (click_color_border && click_color_border != '' && click_color_border !== 'undefined') {
        if (getInternetExplorerVersion() === -1)
        {
        attrs['stroke'] = click_color_border;
    }
    }
    if (click_fill_opacity && click_fill_opacity != '' && click_fill_opacity !== 'undefined') {
        attrs['fill-opacity'] = click_fill_opacity;
    }
    if (click_width_border && click_width_border != '' && click_width_border !== 'undefined') {
        attrs['stroke-width'] = click_width_border;
    }
    if (click_opacity_border && click_opacity_border != '' && click_opacity_border !== 'undefined') {
        attrs['stroke-opacity'] = click_opacity_border;
    }
    var sec_id_temp = attrs['id'];
    //console.log("sec_id_temp:"+sec_id_temp);
    $sections[sec_id_temp].toFront();
    $.each($texts, function (i, value) {
        // console.log("value:"+value);
        value.toFront();
    });

//    attrs = {
//        'id': section,
//        'fill': click_color_section,
//        'stroke':click_color_border,
//        'fill-opacity':click_fill_opacity,
//        'stroke-width': click_width_border,
//        'stroke-opacity':click_opacity_border
//    };
    return attrs;
}
//--------------------------------------------------km--------------------------------------
function zone_section_setting(section) {
    //paramettres
    // console.log("*****"+section+"*********");
    //alert("---"+section);
    var click_color_section = '';
    var tix_status = 'noTix';
    if (is_section_has_tix(section)) {
        tix_status = 'withTix';
          if (map_type === 'zone' && this_map_params['color_zone']){
            click_color_section = get_color_by_zone(bare_section(section));
        }else
        if (intervals.length > 0 && sections_tickets_list[bare_section(section)]) {
            click_color_section = get_color_by_section(bare_section(section));
        }
    }
    if (click_color_section == '')
        click_color_section = sectionSettings['click'][tix_status]['color'];
    //var click_color_section = sectionSettings['click'][tix_status]['color'];
    var click_fill_opacity = sectionSettings['click'][tix_status]['opacity'];
    var click_color_border = "black";
    var click_width_border = 2;
    var click_opacity_border = 1;
    // var click_color_border = sectionSettings['click'][tix_status]['strokeColor'];
    // var click_width_border = sectionSettings['click'][tix_status]['strokeWidth'];
    //var click_opacity_border = sectionSettings['click'][tix_status]['strokeOpacity'];

    var attrs = {'id': section};
    if (click_color_section && click_color_section != '' && click_color_section !== 'undefined') {
        attrs['fill'] = click_color_section;
    }
    if (click_color_border && click_color_border != '' && click_color_border !== 'undefined') {
        attrs['stroke'] = click_color_border;
    }
    if (click_fill_opacity && click_fill_opacity != '' && click_fill_opacity !== 'undefined') {
        attrs['fill-opacity'] = click_fill_opacity;
    }
    if (click_width_border && click_width_border != '' && click_width_border !== 'undefined') {
        attrs['stroke-width'] = click_width_border;
    }
    if (click_opacity_border && click_opacity_border != '' && click_opacity_border !== 'undefined') {
        attrs['stroke-opacity'] = click_opacity_border;
    }
    var sec_id_temp = attrs['id'];
    //console.log("sec_id_temp:"+sec_id_temp);
    $sections[sec_id_temp].toFront();
    $.each($texts, function (i, value) {
        // console.log("value:"+value);
        value.toFront();
    });

//    attrs = {
//        'id': section,
//        'fill': click_color_section,
//        'stroke':click_color_border,
//        'fill-opacity':click_fill_opacity,
//        'stroke-width': click_width_border,
//        'stroke-opacity':click_opacity_border
//    };
    return attrs;
}
//------------------------------------------------------------------------------------------

//##################  ROWS
//gets a bare row value from row map id
function bare_row(row) {
    row = $.trim(row.replace('r-', ''));
    return row;
}
//returns a row map id
function get_row_id(row) {
    if (row)
        return 'r-' + format_row_to_id(row);
    else
        return false;
}
//returns a row map id
function get_row_complete_id(s, r) {
    s = bare_section(s);
    r = bare_row(r);
    return 'r-' + r + '-s-' + s;
}
//detects if row have tickets
function is_row_has_tix(section, row) {
    bs = bare_section(section);
    br = bare_row(row);
    if (sections_tickets_list[bs] && sections_tickets_list[bs][br]) {
        return true;
    }
    return false;
}
//not clicked section : reduce opacity
function reduceNotClickedRowsOpacity() {
    //change opacity to rows not clicked
    var nb_clicked = 0;
    for (section_id in $rows_sections) {
        for (row_id in $rows_sections[section_id]) {
            clicked = is_row_clicked(section_id, row_id);
            if (clicked) {
                $rows_sections[section_id][row_id].animate({
                    'fill-opacity': rowSettings['normal']['withTix']['opacity']
                }, 500);
                nb_clicked++;
            } else {
                $rows_sections[section_id][row_id].animate({
                    'fill-opacity': map_params['reducedRowOpacity']
                }, 500);
            }
        }
    }
    //si aucune section n'est selectionnÃ¯Â¿Â½e, on rends l'opacity normal pour tt
    if (nb_clicked == 0) {
        for (section_id in $rows_sections) {
            for (row_id in $rows_sections[section_id]) {
                if (is_row_has_tix(section_id, row_id)) {
                    $rows_sections[section_id][row_id].animate({
                        'fill-opacity': rowSettings['normal']['withTix']['opacity']
                    }, 500);
                } else {
                    $rows_sections[section_id][row_id].animate({
                        'fill-opacity': rowSettings['normal']['noTix']['opacity']
                    }, 500);
                }
            }
        }
    }
}
//sort alphanumeric
function sortAlphaNum(a, b) {
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}
//sort numbers
function sortNumber(a, b) {
    return parseFloat(a) - parseFloat(b);
}
function cmp(a, b) {
    if (parseInt(a) === parseInt(b)) {
        return 0;
    }
    return (parseInt(a) < parseInt(b)) ? -1 : 1;
}
function cmpByPrice(a, b) {
    if (parseInt(a['price']) === parseInt(b['price'])) {
        return 0;
    }
    return (parseInt(a['price']) < parseInt(b['price'])) ? -1 : 1;
}

function set_intervals() {
    sortedTickets = tickets_first_list['list'];
    sortedTickets.sort(cmpByPrice);
    nbr = Math.floor(total_tickets_qty / 4);
    var inter = [], intervals2 = [], found = false, isborne = true, colorIndex = 1, max = 0, preced = 0, t = 0;
    for (var i in tickets_first_list['list']) {
        if (isborne) {
            preced = parseFloat(tickets_first_list['list'][i]['price']);
            max = parseFloat(tickets_first_list['list'][i]['price']);
            isborne = false;
        }
        if (t >= nbr && parseFloat(tickets_first_list['list'][i]['price']) !== parseFloat(preced)) {
            found = true;
        }
        if (found) {
            inter.push(max);
            t = 0;
            colorIndex++;
            found = false;
            max = parseFloat(tickets_first_list['list'][i]['price']);
        }
        t += parseFloat(tickets_first_list['list'][i]['qty']);
        preced = parseFloat(tickets_first_list['list'][i]['price']);
    }
    if (t > 0 && inter.length <= 3) {
        inter.push(max);
    }
    for (var i in inter) {
        i = parseInt(i);
        if (inter[(i + 1)])
            intervals2[i] = inter[i] + '-' + (inter[i + 1] - 1);
        else
            intervals2[i] = inter[i] + '+';
    }

    return(intervals2);
}
function get_price_interval(price) {
    if (intervals.length > 0) {
        for (var k in intervals) {
            if (intervals[k].indexOf('-') !== -1) {
                parts = intervals[k].split('-');
                if (price >= parseInt(parts[0]) && price <= parseInt(parts[1])) {
                    return k;
                }
            } else {
                parts = intervals[k].split('+');
                if (price >= parseInt(parts[0])) {
                    return k;
                }
            }
        }
    }

    return false;
}
function get_color_by_price(price) {
    interv = get_price_interval(price);
    color = color_price_ranges[parseInt(interv)];
    return color;
}
function get_color_by_section(s) {
    if (sections_tickets_list[s]) {
        //browse sections to get all rows intervals
        var i = [];
        for (r in sections_tickets_list[s]) {
            //rows price
            price = sections_tickets_list[s][r]['price'];
            //get row's interval
            interv = get_price_interval(price);
            i.push(interv);
        }
        //sort intervals
        i.sort();
        //we take the cheapest price and we give its color interval to the section
        color = color_price_ranges[parseInt(i[0])];
        return color;
    }
    return false;
}
function get_color_by_zone(s) {
    //---------------------------------------test color zone problem----------------------
  //console.log("get_color_by_zone ::"+s) ;
    s=s.replace(/\-[0-9]+|[0-9]+/, '');
//    var section_zonne ;
////var chaine="Jean-Paul, Arthur ; LÃ©on, Marcel ; Paul";
//var reg=new RegExp("[-]+", "g");
//document.write("ChaÃ®ne d'origine : " + chaine + "<BR>");
//var tableau=s.split(reg);
//for (var i=0; i<tableau.length-1; i++) {
//    section_zonne+=section_zonne+'-'
// //document.write("tableau[" + i + "] = " + tableau[i] + "<BR>");
//}
    //console.log("get_color_by_zone :23:"+s) ;
    // // console.log('-------hm_11-12-------'); if(window.console){console.log(zone_intervals);console.log("section : "+s);}
//console.log('groub :'+this_map_params['groub'])  ;
 var color_group = '';
 if(this_map_params['group']){
  $.each(this_map_params['group'], function (i, value) {
   var reg = new RegExp(s + ",");
   if (value.match(reg)) {
       color_group = i;
      // console.log('groub :'+i);
   }
  });
 }
 //------------------------------------------------------------------
 if(color_group === ''){
  $.each(this_map_params['color'], function (i, value) {
   var reg = new RegExp(i);
   
   if (s.match(reg)) {
       color_group = i;
      // console.log('groub :'+i);
   }
  });
 }
 //----------------------------------------------------------
 
  //zone_intervals=this_map_params['groub']; 
    if(s in zone_intervals){
        //if()
        color = zone_intervals[s];
        //console.log("get_color_by_zone :ok:"+s+'-- color:'+color) ;
        return color;
    }else{
        color = zone_intervals[color_group];
       // console.log("get_color_by_zone :problem:"+s+'-- color:'+color) ;
        return color;
       
    }
    return false;
}
//get center point
function get_center_point(rf_element, j_element) {
//    //array x & y
    var center_x_y = [];
    if (rf_element && j_element) {
        var rowPath = rf_element.attr('path').toString();
        if (/M(.+?)z(\s*)M(.+?)z/i.test(rowPath)) {
            var results = rowPath.match(/M(.+?)z(\s*)M(.+?)z/i);
            halfRow = rMap.path('M' + results[1] + 'z');
            halfRow.node.id = 'tmp_' + j_element.attr('id');
            //        center_x_y['x'] = (halfRow.getBBox().x+halfRow.getBBox().x2)/2;
            //        center_x_y['y'] = (halfRow.getBBox().y+halfRow.getBBox().y2)/2;
            center_x_y['x'] = $("#" + 'tmp_' + j_element.attr('id')).offset().left + (halfRow.getBBox().width / 2);
            center_x_y['y'] = $("#" + 'tmp_' + j_element.attr('id')).offset().top + (halfRow.getBBox().height / 2);
            halfRow.remove();
        } else {
            center_x_y['x'] = j_element.offset().left + (rf_element.getBBox().width / 2);
            center_x_y['y'] = j_element.offset().top + (rf_element.getBBox().height / 2);
            //        center_x_y['x'] = (rf_element.getBBox().x+rf_element.getBBox().x2)/2-7;
            //        center_x_y['y'] = (rf_element.getBBox().y+rf_element.getBBox().y2)/2-22;
        }

        //    center_x_y['x'] = j_element.offset().left+(rf_element.getBBox().width/2);
        //    center_x_y['y'] = j_element.offset().top+(rf_element.getBBox().height/2);
    }

    return center_x_y;
}
//draw a rowPick with x and y of the row
function set_rowPick_4_row(row, section_id, row_id) {
    //get row coordonates
    var rowPath = row.attr('path').toString();
    if (/M(.+)z(.*)M(.+)z/i.test(rowPath)) {
        var results = rowPath.match(/M(.+)z(.*)M(.+)z/i);
        halfRow = rMap.path('M' + results[1] + 'z');
        var rowPick_x = (halfRow.getBBox().x + halfRow.getBBox().x2) / 2 - 7;
        var rowPick_y = (halfRow.getBBox().y + halfRow.getBBox().y2) / 2 - 22;
        halfRow.remove();
    } else {
        var rowPick_x = (row.getBBox().x + row.getBBox().x2) / 2 - 7;
        var rowPick_y = (row.getBBox().y + row.getBBox().y2) / 2 - 22;
    }

//    var rowPick_x = $("#"+map_name+" #"+row.node.id).offset().left;
//    var rowPick_y = $("#"+map_name+" #"+row.node.id).offset().top;
    //##### circle pin
    //    var rowPick_radius = 4*zoom;
    //    var rowPick = rMap.rowPick(rowPick_x,rowPick_y,rowPick_radius);
    //##### first row pick
    //var path = 'M11.999,6.25c0-3.176-2.574-5.75-5.749-5.75 C3.074,0.5,0.5,3.074,0.5,6.25c0,2.721,1.891,4.993,4.428,5.592l1.357,5.872l1.362-5.893C10.146,11.196,11.999,8.942,11.999,6.25z';
    //##### second pin
    //var path = 'M16.721,8.359C16.721,3.742,12.977,0,8.36,0C3.743,0,0,3.742,0,8.359c0,3.892,2.66,7.163,6.261,8.095 l2.099,7.617l2.099-7.617C14.06,15.522,16.721,12.251,16.721,8.359z';
    var path = 'M7.071,0.5c0,0-6.52,0.101-6.571,6.263 c-0.024,3.008,3.611,7.688,3.611,7.688S7.282,19.699,7,22.206l0.07,0.205l0.07-0.205c-0.178-2.313,2.954-7.733,2.954-7.733 s3.57-4.702,3.545-7.71C13.59,0.601,7.071,0.5,7.071,0.5z';
    var transformedPath = Raphael.transformPath(path, 't' + rowPick_x + ',' + rowPick_y).toString();
    var rowPick = rMap.path(transformedPath);
    rowPick.node.id = 'rowPick-' + get_row_complete_id(section_id, row_id);
    var rowPick_params = map_params['rowPickParams']['normal'];
    var fill_color = rowPick_params['color'];
    if (intervals.length > 0) {
        fill_color = get_color_by_price(sections_tickets_list[bare_section(section_id)][bare_row(row_id)]['price']);
    }
    var rowPick_attrs = {
        'fill': fill_color,
        'stroke': rowPick_params['strokeColor'],
        'fill-opacity': rowPick_params['opacity'],
        'stroke-width': rowPick_params['strokeWidth'],
        'stroke-opacity': rowPick_params['strokeOpacity'],
        'title': 'Row : ' + bare_row(row_id)
    };
    //ne pas afficher dÃ¯Â¿Â½s le dÃ¯Â¿Â½but
    //if (panZoom.getCurrentZoom()<1) {
    if (this_map_params['rows_display'] && panZoom.getCurrentZoom() < 1) {
        rowPick.hide();
    }
    rowPick.attr(rowPick_attrs);
    //#### Circle inside the map_pin
    radius = 3;
    circle_pin_x = rowPick_x + (rowPick.getBBox().width / 2);
    circle_pin_y = rowPick_y + (rowPick.getBBox().height / 3);
    circle_pin = rMap.circle(circle_pin_x, circle_pin_y, radius);
    circle_pin.attr({'fill': fill_color, 'stroke': rowPick_params['strokeColor']});
    return [rowPick, circle_pin];
}
//is row clicked
function is_row_clicked(section, row) {
    var a = 0;
    bs = bare_section(section);
    br = bare_row(row);
    if ($("#" + hiddenClickedRows).val() && $("#" + hiddenClickedRows).val() != '') {
        var rowsIdsSplit = $("#" + hiddenClickedRows).val().split(",");
        if ($("#" + hiddenClickedRows).val() == '' || $.inArray(bs + '|' + br, rowsIdsSplit) != -1) {
            a++;
        }
    }
    if (a == 0)
        return false;
    else
        return true;
}


//##################  row Attributes
//section normal settings
function normal_attr_row_setting(section, row, dontColorTix) {
    //paramettres
    var normal_color_row;
    var tix_status = 'noTix';
    if (!dontColorTix && is_row_has_tix(section, row)) {
        tix_status = 'withTix';
        if (intervals.length > 0 && sections_tickets_list[bare_section(section)] && sections_tickets_list[bare_section(section)][bare_row(row)]) {
            normal_color_row = get_color_by_price(sections_tickets_list[bare_section(section)][bare_row(row)]['price']);
        }
    }
    if (!normal_color_row)
        normal_color_row = rowSettings['normal'][tix_status]['color'];
    var normal_fill_opacity = rowSettings['normal'][tix_status]['opacity'];
    var normal_color_border = rowSettings['normal'][tix_status]['strokeColor'];
    var normal_width_border = rowSettings['normal'][tix_status]['strokeWidth'];
    var normal_opacity_border = rowSettings['normal'][tix_status]['strokeOpacity'];
    var attrs = {'id': row};
    if (normal_color_row && normal_color_row != '' && normal_color_row !== 'undefined') {
        attrs['fill'] = normal_color_row;
    }
    if (normal_color_border && normal_color_border != '' && normal_color_border !== 'undefined') {
        attrs['stroke'] = normal_color_border;
    }
    if (normal_fill_opacity && normal_fill_opacity != '' && normal_fill_opacity !== 'undefined') {
        attrs['fill-opacity'] = normal_fill_opacity;
    }
    if (normal_width_border && normal_width_border != '' && normal_width_border !== 'undefined') {
        attrs['stroke-width'] = normal_width_border;
    }
    if (normal_opacity_border && normal_opacity_border != '' && normal_opacity_border !== 'undefined') {
        attrs['stroke-opacity'] = normal_opacity_border;
    }
//    attrs = {
//        'fill': normal_color_row,
//        'stroke':normal_color_border,
//        'fill-opacity':normal_fill_opacity,
//        'stroke-width': normal_width_border,
//        'stroke-opacity':normal_opacity_border
//    };
    return attrs;
}
//on hover settings
function hover_attr_row_setting(section, row) {
    //paramettres

    var hover_color_row;
    var tix_status = 'noTix';
    if (is_row_has_tix(section, row)) {
        tix_status = 'withTix';
    }
    if (!hover_color_row)
        hover_color_row = rowSettings['hover'][tix_status]['color'];
    var hover_fill_opacity = rowSettings['hover'][tix_status]['opacity'];
    var hover_color_border = "black";//rowSettings['hover'][tix_status]['strokeColor'];
    var hover_width_border = rowSettings['hover'][tix_status]['strokeWidth'];
    var hover_opacity_border = rowSettings['hover'][tix_status]['strokeOpacity'];
    attrs = {
        'id': row,
        'fill': hover_color_row,
        'stroke': hover_color_border,
        'fill-opacity': hover_fill_opacity,
        'stroke-width': hover_width_border,
        'stroke-opacity': hover_opacity_border
    };
    return attrs;
}
//on click settings
function click_attr_row_setting(section, row) {
    //paramettres
    var click_color_row;
    var tix_status = 'noTix';
    if (is_row_has_tix(section, row)) {
        tix_status = 'withTix';
        if (intervals.length > 0 && sections_tickets_list[bare_section(section)] && sections_tickets_list[bare_section(section)][bare_row(row)]) {
            click_color_row = get_color_by_price(sections_tickets_list[bare_section(section)][bare_row(row)]['price']);
        }
    }
    if (!click_color_row)
        click_color_row = rowSettings['click'][tix_status]['color'];
    var click_fill_opacity = rowSettings['click'][tix_status]['opacity'];
    var click_color_border = rowSettings['click'][tix_status]['strokeColor'];
    var click_width_border = rowSettings['click'][tix_status]['strokeWidth'];
    var click_opacity_border = rowSettings['click'][tix_status]['strokeOpacity'];
    attrs = {
        'id': row,
        'fill': click_color_row,
        'stroke': click_color_border,
        'fill-opacity': click_fill_opacity,
        'stroke-width': click_width_border,
        'stroke-opacity': click_opacity_border
    };
    return attrs;
}


//##################  Tickets
//display section tickets
function display_section_tickets(section, unset) {
    if (section && is_section_has_tix(section)) {
        section_id = bare_section(section);
        //remove section from hidden SectionPass list
        if (unset) {
            //remove from the ticket listing
            var sectionsIdsSplit = $("#" + hiddenClickedSections).val().split(",");
            var allSectionsToShow = [];
            for (var i = 0; i < sectionsIdsSplit.length; i++) {
                if (sectionsIdsSplit[i] != '' && sectionsIdsSplit[i] != section_id) {
                    allSectionsToShow.push(sectionsIdsSplit[i]);
                }
            }
            $("#" + hiddenClickedSections).val(allSectionsToShow.join(','));
        }
        //add section to hidden SectionPass list
        else {
            dvm_add_section_to_display_list(section_id, false);
        }
    }
    if (map_args['self_display_tickets_by_client']===true){
        // console.log("****"+matched_sections_reverse[section_id]+"***");
        display_tickets_by_client(matched_sections_reverse[section_id]);
       
    }else{
        display_all_selected_tickets();
    }
    
    return true;
}
//display row tickets
function display_row_tickets(section, row, unset) {
    if (section && row && is_row_has_tix(section, row)) {
        section_id = bare_section(section);
        row_id = bare_row(row);
        //add section to hidden RowPass list
        if (unset) {
            //remove from the ticket listing
            var rowsIdsSplit = $("#" + hiddenClickedRows).val().split(",");
            var allRowsToShow = [];
            for (var i = 0; i < rowsIdsSplit.length; i++) {
                if (rowsIdsSplit[i] != '' && rowsIdsSplit[i] != section_id + '|' + row_id) {
                    allRowsToShow.push(rowsIdsSplit[i]);
                }
            }
            $("#" + hiddenClickedRows).val(allRowsToShow.join(','));
        }
        //remove section from hidden RowPass list
        else {
            dvm_add_row_to_display_list(section_id, row_id);
        }
    }
    display_all_selected_tickets();
    return true;
}
function display_all_selected_tickets() {
    //############### ROWS
    //get section Ids from the hidden RowPass and split it
    var rowsIdsSplit = $("#" + hiddenClickedRows).val().split(",");
    //get section Ids from the hidden SectionPass and split it
    var sectionsIdsSplit = $("#" + hiddenClickedSections).val().split(",");
    if (this_map_params['rows_display'] === false) {
        if ($("#" + hiddenClickedSections).val() == '') {
            // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').show();
        } else {
            //hide all tickets
            // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').hide();
            //show 
            for (kid in sectionsIdsSplit) {
                sid = sectionsIdsSplit[kid];
                for (rid in sections_tickets_list[sid]) {
                    reversed_sid_list = matched_sections_reverse[sid];
                    for (krsid in reversed_sid_list) {
                        var reversed_sid = reversed_sid_list[krsid];
                        // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-section='" + reversed_sid + "'][data-row='" + rid + "']").show();
                    }
                }
            }
        }
    } else {
        if ($("#" + hiddenClickedRows).val() == '') {
            // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').show();
        } else {
            //hide all tickets
            // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').hide();
            //show 
            for (ksid in rowsIdsSplit) {
                pars = rowsIdsSplit[ksid].split('|');
                sid = pars[0];
                rid = pars[1];
                // $('#' + DVM_map_params['tickets_container'] + ' .rowTicket').filter("[data-section='" + sid + "'][data-row='" + rid + "']").show();
            }
        }
    }
}


//##################  Tooltip Section
//format sections
String.prototype.capitalize = function () {
    return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};
//format to display section
function format_section_to_display(section) {
    fs_es = section;
    if (/-/g.test(section)) {
        fs_es = section.replace(/-/g, ' ');
    }
    fs_es = fs_es.capitalize();
    return fs_es;
}
//format to section id
function format_section_to_id(section) {
    if (!section || section === 'undefined') {
        return false;
    }
    fs_es = section;
    if (/ /g.test(section)) {
        fs_es = section.replace(/ /g, '-');
        //fs_es = fs_es.toLowerCase();
    }
    return fs_es;
}
//fill tooltip by section details and image
function jsonp_display_tooltip_section(data) {
    //data = JSON && JSON.parse(data) || $.parseJSON(data);
    //console.log('data tooltip'+data);
   data = $.parseJSON(data);
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if (data.status === 1){
            $("#dialog_img").attr('src',data.bimg);
            var name= $("#sectionTooltip #fdsection").text();
            $("#ticket_sec").html(name);
            $("#ticket_sec2").html(name);
            var width = $(window).width(), height = $(window).height();
            $( "#dialog1" ).dialog({});
            
/*            
            $( "#dialog1" ).dialog({
                open: function(){
                    alert('2');
                    $('.ui-dialog-titlebar-close').bind('click',function(){
                        alert('1');
                        $('#dialog1').dialog('close');

                    })
                }
            });
  */          


            // $('#dialog1').css({'height':height,'width':width});
            //$('#dialog1').css({'top':0,'bottom':0,'left':0,'right':0,'height':height+(height*10)/100});
            $('#dialog_img').css({'width':width});


            $('.ui-icon-closethick').click(function(){
                //$("#ticket_details").hide();
                $('#dialog1').dialog('close');
            })
            

            


        }   
    }else{
        if (data.status === 1)
        {
            bimg = data.bimg;
            simg = data.simg;
            is_tooltip_big = data.iszoom;
            if (is_tooltip_big === 1)
            {
                $("#sectionTooltip #smallimg").attr("class", "fancybox");
                //$("#sectionTooltip #smallimg").attr("href", bimg);
                $("#sectionTooltip #imgsmall").attr("src", simg);
                $("#sectionTooltip #imgsmall").attr("class", "lb_img");
                //tooltip in big size
                $("#sectionTooltip .lti").attr("class", "lti"); //big container
                $("#sectionTooltip .tpit").attr("class", "tpit"); //small container


                // $("#sectionTooltip #fdqty").text(pars[2]);
                // rw = pars[1].split('-');
                // rw.sort(sortAlphaNum);
                // $("#sectionTooltip #fdrow").text(rw.join(', ').toUpperCase());
                // $("#sectionTooltip #fdprice").text(pars[3]);
                var bqty = $("#sectionTooltip #fdqty").text();
                var brow = $("#sectionTooltip #fdrow").text();
                var bprice = $("#sectionTooltip #fdprice").text();
                //console.log('======'+Bqty);

                $(".fancybox").fancybox({
                   openEffect  : 'none',
                   closeEffect : 'none',
                   content : '<img src='+bimg+' height="500" width="500" alt="" />'
                });

            } else {
                $("#sectionTooltip #smallimg").attr("class", "fancybox_no");
                //$("#sectionTooltip #smallimg").attr("href", bimg);
                $("#sectionTooltip #imgsmall").attr("src", simg);
                $("#sectionTooltip #imgsmall").attr("class", "lb_img_no");
                //tooltip in small size
                $("#sectionTooltip .lti").attr("class", "lti lti_no_img"); //big container
                $("#sectionTooltip .tpit").attr("class", "tpit tpit_no_img"); //small container
            }
            //######right or LEfT , top or bottom Display
            //
            //Get section position
            var bbox = $sections['s-' + matchedSecId].getBBox();
            //alert(data.x+'***'+data.y);
          //console.log(matchedSecId);
            //Note : data.x and data.y are the exact postion where the tooltip appears

            //make the tooltip appear next to the section

            //tooltip section color and name on the left
            $('#sectionTooltip .colr').css('float', 'left');
            $('#sectionTooltip #fdsection').css('float', 'left');
            //left or right
            half_width_map = map_width / 2;
            if (bbox.x > half_width_map) {
                //deduce tooltip width
                //data.x = parseFloat(data.x) - $('#sectionTooltip').width();
            }
            else
            {
                //add section width
                //data.x = parseFloat(data.x) + bbox.width;
            }
            //top or bottom
            var half_height_map = map_height / 2;
            if (bbox.y > half_height_map) {
                //deduce tooltip height if the section is on the bottom
                // data.y = parseFloat(data.y) - $('#sectionTooltip').height();

            }

            data.y = parseFloat(data.y) + bbox.height / 2;
            if (is_mapped === false) {
                //hide arrow
                //hide_tooltip_arrows('sectionTooltip');
            }
            data.x = data.x;
            data.y = data.y + 28;
            //$('#dialog1').show();
            // $( "#dialog1" ).dialog({});
            $("#dialog_img" ).attr('src', data.bimg); 
            //var name1= $("#sectionTooltip #fdsection").text(format_section_to_display(matchedSecId));
            //var bqty = $("#sectionTooltip #fdqty").text();
            //var brow = $("#sectionTooltip #fdrow").text();
            //var bprice = $("#sectionTooltip #fdprice").text();
            var name= $("#sectionTooltip #fdsection").text();
            $("#ticket_sec").html(name);
            $("#ticket_sec2").html(name);
            $("#sectionTooltip").css({
                "border": "3px solid black",
                "borderRadius": "10px"
            }
            );

            $("#sectionTooltip").css({
                "left": 650 + "px",
                "top": 300 + "px"
            }).delay(500).queue(function (next) {
                $(this).show();
                next();
            });
        }    
    }  
}

function hide_tooltip_arrows(tooltipId)
{
    $('#' + tooltipId + ' .arrow_right').css('display', 'none');
    $('#' + tooltipId + ' .arrow_left').css('display', 'none');
    $('#' + tooltipId + ' .arrow_right_bottom').css('display', 'none');
    $('#' + tooltipId + ' .arrow_left_bottom').css('display', 'none');
}

function fill_tooltip_section(parts, x, y) {
    var pars = parts.split(';');
    matchedSecId = pars[0];
    if (matchedSecId != "") {
        $("#sectionTooltip").clearQueue();
        var ext = 'jpg';
//        3d seating charts (4 staples center)
//        if (venue_id == "105234") { //staples center
//            ext = "swf";
//        }
        var limg = "https://dynamicvenuemaps.com/maps/seatviews/loadimg.gif";
        //loading img and class (small if tooltip is small and vice versa)
        if ($("#sectionTooltip #imgsmall").attr("src").indexOf('noimg_') !== -1) {
            $("#sectionTooltip #imgsmall").attr("class", "lb_img_loading");
        } else {
            $("#sectionTooltip #imgsmall").attr("class", "lb_img");
        }

        $("#sectionTooltip #fdsection").text(format_section_to_display(matchedSecId));
        $("#sectionTooltip #fdqty").text(pars[2]);
        rw = pars[1].split('-');
        rw.sort(sortAlphaNum);
        $("#sectionTooltip #fdrow").text(rw.join(', ').toUpperCase());
        $("#sectionTooltip #fdprice").text(pars[3]);
        
          if (map_type === 'zone' && this_map_params['color_zone']){
            color = get_color_by_zone(matchedSecId);
        }else{
          color = get_color_by_section(matchedSecId);  
        }
        //color = get_color_by_zone(matchedSecId);
        $("#sectionTooltip .colr").css("background-color", color);
        $("#sectionTooltip #smallimg").attr("class", "fancybox_no");
        $("#sectionTooltip #imgsmall").attr("src", limg);
        section_id = pars[4];
        $.ajax({
            url: 'https://dynamicvenuemaps.com/maps/svg_ajax/tooltip_infos.php',
            data: {'type': 'section', 'vid': venue_folder, 'matchedSecId': matchedSecId, 'section_id': section_id, 'x': x, 'y': y},
            type: 'GET',
            contentType: 'jsonp',
            dataType: 'jsonp'
        });
        imgSectionHidden = false;
    } else {
        hide_tooltip_section(false);
    }
}
function inTooltip() {
    imgSectionHidden = false;
    ifInsideTooltipSection = true;
}
function outTooltip() {
    ifInsideTooltipSection = false;
    if (imgSectionHidden === false)
    {
        imgSectionHidden = true;
        hide_tooltip_section(false);
    }
}
//display tooltip section
function display_tooltip_section(section, x, y) {
    hide_tooltip_row(false);
    //hide_tooltip_section(false);
    //new display
    //section_id
    section_id = bare_section(section);
    //all rows for the givven section separated by a dash (-)
    asr = [];
    for (r in sections_tickets_list[section_id]) {
        asr.push(r);
    }
    all_section_rows = asr.join("-");
    //quantity
    var qty = 0;
    var min_price = 0;
    var max_price = 0;
    for (t in tickets_list['list']) {
        if (tickets_list['list'][t]['section'] == section_id) {
            qty += parseFloat(tickets_list['list'][t]['qty']);
            //min_price
            if (parseFloat(tickets_list['list'][t]['price']) < min_price || min_price === 0) {
                min_price = parseFloat(tickets_list['list'][t]['price']);
            }
            //max_price
            if (parseFloat(tickets_list['list'][t]['price']) > max_price) {
                max_price = parseFloat(tickets_list['list'][t]['price']);
            }
        }
    }
    if (min_price != max_price) {
        section_max_min_price = '$' + min_price + ' - $' + max_price;
    } else {
        section_max_min_price = '$' + min_price;
    }
    //section details
    section_details = section_id + ';' + all_section_rows + ';' + qty + ';' + section_max_min_price + ';' + matched_sections_reverse[section_id][0];
    fill_tooltip_section(section_details, x, y);
}
//hide tooltip section
function hide_tooltip_section(delayHide) {
    if (!ifInsideTooltipSection) {
        if (!delayHide) {
            $("#sectionTooltip").clearQueue();
            $("#sectionTooltip").hide();
        } else {
            if (imgSectionHidden === false)
            {
                $("#sectionTooltip").show().delay(3000).queue(function () {
                    if (!ifInsideTooltipSection)
                    {
                        $("#sectionTooltip").hide();
                    }
                });
            }
        }
        imgSectionHidden = true;
    }
}


//##################  Tooltip Row
//format to display row
function format_row_to_display(row) {
    fr_er = row.replace(/-/g, ' ');
    fr_er = fr_er.capitalize();
    return fr_er;
}
//format to row id
function format_row_to_id(row) {
    if (!row || row === 'undefined') {
        return false;
    }

    fr_er = row.replace(/ /g, '-');
    //fr_er = fr_er.toLowerCase();
    return fr_er;
}
//display tooltip row
function display_tooltip_row(section, row, x, y) {
    //hide_tooltip_row(false);
    hide_tooltip_section(false);
    //new display
    //section_id
    section_id = bare_section(section);
    //section_id
    row_id = bare_row(row);
    //quantity
    var qty = 0;
    var price = 0;
    for (t in tickets_list['list']) {
        if (tickets_list['list'][t]['section'] == section_id && tickets_list['list'][t]['row'] == row_id) {
            qty = parseInt(tickets_list['list'][t]['qty']);
            //price
            price = parseInt(tickets_list['list'][t]['price']);
        }
    }
    //section details
    row_details = section_id + ';' + row_id + ';' + qty + ';' + price + ';' + matched_sections_reverse[section_id][0] + ';r' + row_id;
    fill_tooltip_row(row_details, x, y);
}
//hide tooltip row
function hide_tooltip_row(delayHide) {
    //document.getElementById('hswfRow').value=0;
    if (!ifInsideTooltipRow) {
        if (!delayHide) {
            $("#rowTooltip").clearQueue();
            $("#rowTooltip").hide();
        } else {
            //if (document.getElementById('hfdivRow').value === 0) {
            if (imgRowHidden === false) {
                $("#rowTooltip").show().delay(3000).queue(function () {
                    if (!ifInsideTooltipRow)
                    {
                        $(this).hide();
                    }
                });
            }
        }
        imgRowHidden = true;
    }
}
//fill tooltip by section details and image
function jsonp_display_tooltip_row(data) {
    //data = JSON && JSON.parse(data) || $.parseJSON(data);
    data = $.parseJSON(data);
    if (data.status === 1)
    {
        bimg = data.bimg;
        simg = data.simg;
        is_tooltip_big = data.iszoom;
        if (is_tooltip_big === 1)
        {
            $("#rowTooltip #smallimg").attr("class", "fancybox");
            $("#rowTooltip #smallimg").attr("href", bimg);
            $("#rowTooltip #imgsmall").attr("src", simg);
            $("#rowTooltip #imgsmall").attr("class", "lb_img");
            //tooltip in big size
            $("#rowTooltip .lti").attr("class", "lti"); //big container
            $("#rowTooltip .tpit").attr("class", "tpit"); //small container
        } else {
            $("#rowTooltip #smallimg").attr("class", "fancybox_no");
            $("#rowTooltip #smallimg").attr("href", bimg);
            $("#rowTooltip #imgsmall").attr("src", simg);
            $("#rowTooltip #imgsmall").attr("class", "lb_img_no");
            //tooltip in small size
            $("#rowTooltip .lti").attr("class", "lti lti_no_img"); //big container
            $("#rowTooltip .tpit").attr("class", "tpit tpit_no_img"); //small container
        }

        //######right or LEfT , top or bottom Display
        //
        //Get section position
        var bbox = $sections['s-' + matchedSecId].getBBox();
        //Note : data.x and data.y are the exact postion where the tooltip appear

        //make the tooltip appear next to the section

        //tooltip section color and name on the left
        $('#rowTooltip .colr').css('float', 'left');
        $('#rowTooltip .s_r_labels').css('float', 'left');
        //left or right
        half_width_map = map_width / 2;
        if (bbox.x > half_width_map) {
            //deduce tooltip width
            data.x = parseFloat(data.x) - $('#rowTooltip').width();
        }
        else
        {
            //add section width
            data.x = parseFloat(data.x) + bbox.width;
        }
        //top or bottom
        var half_height_map = map_height / 2;
        if (bbox.y > half_height_map) {
            //deduce tooltip height if the section is on the bottom
            data.y = parseFloat(data.y) - $('#rowTooltip').height();
        }

        data.y = parseFloat(data.y) + bbox.height / 2;


        $("#rowTooltip").css({
            "left": data.x + "px",
            "top": data.y + "px"
        }).delay(500).queue(function (next) {
            $(this).show();
            next();
        });
    }
}
//fill tooltip by row details
function fill_tooltip_row(row_details, x, y) {
    pars = row_details.split(';');
    matchedSecId = pars[0];
    row_id = pars[1];
    qty = pars[2];
    price = pars[3];
    section_id = pars[4];
    if (matchedSecId != "" && row_id != "") {
        $("#rowTooltip").clearQueue();
        $("#rowTooltip #fdsection").text(format_section_to_display(matchedSecId));
        $("#rowTooltip #fdrow").text(row_id);
        $("#rowTooltip #fdqty").text(qty);
        $("#rowTooltip #fdprice").text(price);
        color = get_color_by_price(price);
        $("#rowTooltip .colr").css("background-color", color);
//        $("#rowTooltip").css({
//            "left":x+"px",
//            "top":y+"px"
//        }).show();
        $.ajax({
            url: 'https://dynamicvenuemaps.com/maps/svg_ajax/tooltip_infos.php',
            data: {'type': 'row', 'vid': venue_folder, 'matchedSecId': matchedSecId, 'section_id': section_id, 'row_id': row_id, 'x': x, 'y': y},
            type: 'GET',
            contentType: 'jsonp',
            dataType: 'jsonp'
        });
        imgRowHidden = false;
    } else {
        hide_tooltip_row(false);
    }
}
function inTooltipRow() {
    imgRowHidden = false;
    ifInsideTooltipRow = true;
}
function outTooltipRow() {
    ifInsideTooltipRow = false;
    if (imgRowHidden === false)
    {
        imgRowHidden = true;
        hide_tooltip_row(false);
    }
}

//##################  traces
function get_attr_traces_setting(traces) {
    var attrs = {};
    //fill
    if (traces['f'] && traces['f'] != '' && traces['f'] !== 'undefined') {
        attrs['fill'] = traces['f'];
    }
    //stroke
    if (traces['sc'] && traces['sc'] != '' && traces['sc'] !== 'undefined') {
        attrs['stroke'] = traces['sc'];
    }
    //stroke-width
    if (traces['sw'] && traces['sw'] != '' && traces['sw'] !== 'undefined') {
        attrs['stroke-width'] = traces['sw'];
    }
    //stroke-linecap
    if (traces['slc'] && traces['slc'] != '' && traces['slc'] !== 'undefined') {
        attrs['stroke-linecap'] = traces['slc'];
    }
    //stroke-linejoin
    if (traces['slj'] && traces['slj'] != '' && traces['slj'] !== 'undefined') {
        attrs['stroke-linejoin'] = traces['slj'];
    }
    if (attrs['fill'] && !traces['sw'] && !traces['sc']) {
        attrs['stroke-width'] = 'none';
        attrs['stroke'] = 'none';
    }
//    attrs = {
//        'fill':traces['f'],
//        'stroke':traces['sc'],
//        'stroke-width': traces['sw']
//    };
    return attrs;
}

//################## String functions
function trimString(string) {
    if (!string || string === 'undefined')
        return '';
    return string.replace(/^\s+|\s+$/g, '');
}
//---------------------------------------------------------------

