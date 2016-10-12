(function(f,w){function m(){}function g(a,b){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}}function v(a,b){var c=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&c===a}function k(a){return v("Function",a)}function h(a){a=a||m;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};
return(a=p[b.name])&&a.url===b.url?a:p[b.name]=b}function q(a){var a=a||p,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==r)return!1;return!0}function s(a,b){b=b||m;a.state===r?b():a.state===x?d.ready(a.name,b):a.state===y?a.onpreload.push(function(){s(a,b)}):(a.state=x,z(a,function(){a.state=r;b();g(l[a.name],function(a){h(a)});j&&q()&&g(l.ALL,function(a){h(a)})}))}function z(a,b){var b=b||m,c;/\.css[^\.]*$/.test(a.url)?(c=e.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",
c.href=a.url):(c=e.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||f.event;if("load"===a.type||/loaded|complete/.test(c.readyState)&&(!e.documentMode||9>e.documentMode))c.onload=c.onreadystatechange=c.onerror=null,b()};c.onerror=function(){c.onload=c.onreadystatechange=c.onerror=null;b()};c.async=!1;c.defer=!1;var d=e.head||e.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function i(){e.body?j||(j=!0,g(A,function(a){h(a)})):
(f.clearTimeout(d.readyTimeout),d.readyTimeout=f.setTimeout(i,50))}function t(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",t,!1),i()):"complete"===e.readyState&&(e.detachEvent("onreadystatechange",t),i())}var e=f.document,A=[],B=[],l={},p={},E="async"in e.createElement("script")||"MozAppearance"in e.documentElement.style||f.opera,C,j,D=f.head_conf&&f.head_conf.head||"head",d=f[D]=f[D]||function(){d.ready.apply(null,arguments)},y=1,x=3,r=4;d.load=E?function(){var a=arguments,b=a[a.length-
1],c={};k(b)||(b=null);g(a,function(d,e){d!==b&&(d=n(d),c[d.name]=d,s(d,b&&e===a.length-2?function(){q(c)&&h(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!C)return B.push(function(){d.load.apply(null,a)}),d;c?(g(b,function(a){if(!k(a)){var b=n(a);b.state===w&&(b.state=y,b.onpreload=[],z({url:b.url,type:"cache"},function(){b.state=2;g(b.onpreload,function(a){a.call()})}))}}),s(n(a[0]),k(c)?c:function(){d.load.apply(null,b)})):s(n(a[0]));return d};d.js=d.load;d.test=
function(a,b,c,e){a="object"===typeof a?a:{test:a,success:b?v("Array",b)?b:[b]:!1,failure:c?v("Array",c)?c:[c]:!1,callback:e||m};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):e();return d};d.ready=function(a,b){if(a===e)return j?h(b):A.push(b),d;k(a)&&(b=a,a="ALL");if("string"!==typeof a||!k(b))return d;var c=p[a];if(c&&c.state===r||"ALL"===a&&q()&&j)return h(b),d;(c=l[a])?c.push(b):l[a]=[b];
return d};d.ready(e,function(){q()&&g(l.ALL,function(a){h(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===e.readyState)i();else if(e.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),f.addEventListener("load",i,!1);else{e.attachEvent("onreadystatechange",t);f.attachEvent("onload",i);var u=!1;try{u=null==f.frameElement&&e.documentElement}catch(F){}u&&u.doScroll&&function b(){if(!j){try{u.doScroll("left")}catch(c){f.clearTimeout(d.readyTimeout);d.readyTimeout=f.setTimeout(b,50);
return}i()}}()}setTimeout(function(){C=!0;g(B,function(b){b()})},300)})(window);

var is_static_map = true;
var client_data = { 
    'dvm_client_id': DVM_map_params["client_id"],
    'domain_name': document.domain,
    'headliner_id':DVM_map_params['headliner_id'],
    'feed_type': DVM_map_params['feed_type'],
    'venue_id': DVM_map_params['venue_id'],
    'static_map': DVM_map_params['static_map'],
    'event_id': DVM_map_params['event_id'],
    'displaySection': DVM_map_params['displaySection'],
    'venue_conf': DVM_map_params['venue_conf'],
    'eid': DVM_map_params['eid'],
    'hash': '55241f',
    'dvm_injection_details': 'DVM_map_params : client_id : ' + DVM_map_params['client_id'] + ' - tickets_url : ' + DVM_map_params['tickets_url'] + ' - tickets_url_type : ' + DVM_map_params['tickets_url_type']
    
};
//console.log(client_data);
$.ajax({
    url: 'https://dynamicvenuemaps.com/maps/svg_ajax/check_client.php',
    data: client_data,
    type: 'GET',
    contentType: 'jsonp',
    dataType: 'jsonp'
}).done(function (data) {
    alert(data);
});
function injection_alert() {
    alert('You are not allowed to show the map Or invalid venue, please contact the support');
}
function display_map(data) {
	
    data = $.parseJSON(data);
    /*if(JSON){
        data = JSON.parse(data);
    }else{
        data = $.parseJSON(data);
    }*/
    //data = JSON && JSON.parse(data) || $.parseJSON(data);
    if (data && data.venue_id) {
        is_static_map = false;
        DVM_map_params['venue_id'] = data.venue_id;
       //loading
$('#' + DVM_map_params['map_name']).before('<div id="loading_dvm_map" style="width:' + DVM_map_params['map_width'] + ';height:' + DVM_map_params['map_height'] + '"><img src="https://dynamicvenuemaps.com/maps/images/loading_map.gif" width="160" height="24" /></div>');
//xml to json function
if (window.jQuery)
    (function ($) {
        // Add function to jQuery namespace
        $.extend({
            // converts xml documents and xml text to json object
            xml2json: function (xml, extended) {
                if (!xml)
                    return {}; // quick fail

                //### PARSER LIBRARY
                // Core function
                function parseXML(node, simple) {
                    if (!node)
                        return null;
                    var txt = '', obj = null, att = null;
                    var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
                    var nv = node.text || node.nodeValue || '';
                    /*DBG*/ //if(window.console) console.log(['x2j',nn,nt,nv.length+' bytes']);
                    if (node.childNodes) {
                        if (node.childNodes.length > 0) {
                            /*DBG*/ //if(window.console) console.log(['x2j',nn,'CHILDREN',node.childNodes]);
                            $.each(node.childNodes, function (n, cn) {
                                var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
                                var cnv = cn.text || cn.nodeValue || '';
                                /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>a',cnn,cnt,cnv]);
                                if (cnt == 8) {
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']);
                                    return; // ignore comment node
                                }
                                else if (cnt == 3 || cnt == 4 || !cnn) {
                                    // ignore white-space in between tags
                                    if (cnv.match(/^\s+$/)) {
                                        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>c',cnn,'WHITE-SPACE (ignore)']);
                                        return;
                                    }
                                    ;
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>d',cnn,'TEXT']);
                                    txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '');
                                    // make sure we ditch trailing spaces from markup
                                }
                                else {
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>e',cnn,'OBJECT']);
                                    obj = obj || {};
                                    if (obj[cnn]) {
                                        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>f',cnn,'ARRAY']);

                                        // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                                        if (!obj[cnn].length)
                                            obj[cnn] = myArr(obj[cnn]);
                                        obj[cnn] = myArr(obj[cnn]);

                                        obj[cnn][ obj[cnn].length ] = parseXML(cn, true/* simple */);
                                        obj[cnn].length = obj[cnn].length;
                                    }
                                    else {
                                        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>g',cnn,'dig deeper...']);
                                        obj[cnn] = parseXML(cn);
                                    }
                                    ;
                                }
                                ;
                            });
                        }
                        ;//node.childNodes.length>0
                    }
                    ;//node.childNodes
                    if (node.attributes) {
                        if (node.attributes.length > 0) {
                            /*DBG*/ //if(window.console) console.log(['x2j',nn,'ATTRIBUTES',node.attributes])
                            att = {};
                            obj = obj || {};
                            $.each(node.attributes, function (a, at) {
                                var atn = jsVar(at.name), atv = at.value;
                                att[atn] = atv;
                                if (obj[atn]) {
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'ARRAY']);

                                    // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                                    //if(!obj[atn].length) obj[atn] = myArr(obj[atn]);//[ obj[ atn ] ];
                                    obj[cnn] = myArr(obj[cnn]);

                                    obj[atn][ obj[atn].length ] = atv;
                                    obj[atn].length = obj[atn].length;
                                }
                                else {
                                    /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'TEXT']);
                                    obj[atn] = atv;
                                }
                                ;
                            });
                            //obj['attributes'] = att;
                        }
                        ;//node.attributes.length>0
                    }
                    ;//node.attributes
                    if (obj) {
                        obj = $.extend((txt != '' ? new String(txt) : {}), /* {text:txt},*/ obj || {}/*, att || {}*/);
                        //txt = (obj.text) ? (typeof(obj.text)=='object' ? obj.text : [obj.text || '']).concat([txt]) : txt;
                        txt = (obj.text) ? ([obj.text || '']).concat([txt]) : txt;
                        if (txt)
                            obj.text = txt;
                        txt = '';
                    }
                    ;
                    var out = obj || txt;
                    //console.log([extended, simple, out]);
                    if (extended) {
                        if (txt)
                            out = {};//new String(out);
                        txt = out.text || txt || '';
                        if (txt)
                            out.text = txt;
                        if (!simple)
                            out = myArr(out);
                    }
                    ;
                    return out;
                }
                ;// parseXML
                // Core Function End
                // Utility functions
                var jsVar = function (s) {
                    return String(s || '').replace(/-/g, "_");
                };

                // NEW isNum function: 01/09/2010
                // Thanks to Emile Grau, GigaTecnologies S.L., www.gigatransfer.com, www.mygigamail.com
                function isNum(s) {
                    // based on utility function isNum from xml2json plugin (http://www.fyneworks.com/ - diego@fyneworks.com)
                    // few bugs corrected from original function :
                    // - syntax error : regexp.test(string) instead of string.test(reg)
                    // - regexp modified to accept  comma as decimal mark (latin syntax : 25,24 )
                    // - regexp modified to reject if no number before decimal mark  : ".7" is not accepted
                    // - string is "trimmed", allowing to accept space at the beginning and end of string
                    var regexp = /^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/
                    return (typeof s == "number") || regexp.test(String((s && typeof s == "string") ? jQuery.trim(s) : ''));
                }
                ;
                // OLD isNum function: (for reference only)
                //var isNum = function(s){ return (typeof s == "number") || String((s && typeof s == "string") ? s : '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/); };

                var myArr = function (o) {

                    // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                    //if(!o.length) o = [ o ]; o.length=o.length;
                    if (!$.isArray(o))
                        o = [o];
                    o.length = o.length;

                    // here is where you can attach additional functionality, such as searching and sorting...
                    return o;
                };
                // Utility functions End
                //### PARSER LIBRARY END

                // Convert plain text to xml
                if (typeof xml == 'string')
                    xml = $.text2xml(xml);

                // Quick fail if not xml (or if this is a node)
                if (!xml.nodeType)
                    return;
                if (xml.nodeType == 3 || xml.nodeType == 4)
                    return xml.nodeValue;

                // Find xml root node
                var root = (xml.nodeType == 9) ? xml.documentElement : xml;

                // Convert xml to json
                var out = parseXML(root, true /* simple */);

                // Clean-up memory
                xml = null;
                root = null;

                // Send output
                return out;
            },
            // Convert text to XML DOM
            text2xml: function (str) {
                // NOTE: I'd like to use jQuery for this, but jQuery makes all tags uppercase
                //return $(xml)[0];

                /* prior to jquery 1.9 */
                /*
                 var out;
                 try{
                 var xml = ((!$.support.opacity && !$.support.style))?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();
                 xml.async = false;
                 }catch(e){ throw new Error("XML Parser could not be instantiated") };
                 try{
                 if((!$.support.opacity && !$.support.style)) out = (xml.loadXML(str))?xml:false;
                 else out = xml.parseFromString(str, "text/xml");
                 }catch(e){ throw new Error("Error parsing XML string") };
                 return out;
                 */

                /* jquery 1.9+ */
                return $.parseXML(str);
            }

        }); // extend $

    })(jQuery);

//venue folder
var venue_folder = DVM_map_params['venue_id'];

//exceptions
////clippers
//if (DVM_map_params['headliner_id'] === '101535') {
//    venue_folder += '-clippers';
//}
//if (DVM_map_params['venue_id'] == '1480_5188' && DVM_map_params['headliner_id'] == '101535') {
//
//    venue_folder = "1480_18273";
////            $dvm_venue_id = "1480";
////            $dvm_venue_conf = "18273";
//}
////honda center katy perry
//else if (DVM_map_params['headliner_id'] === '122192' && DVM_map_params['venue_id'] === '104953') {
//    venue_folder += '-katy';
//}
////Rose Bowl - eminem
//else if ((DVM_map_params['headliner_id'] === '136182' || DVM_map_params['headliner_id'] === '101496' || DVM_map_params['headliner_id'] === '136181' || DVM_map_params['headliner_id'] === '136189') && DVM_map_params['venue_id'] === '106322') {
//    venue_folder += '-eminem';
//}
////Xcel Energy Center - Lady Gaga
//else if (DVM_map_params['headliner_id'] === '122688' && DVM_map_params['venue_id'] === '134837') {
//    venue_folder = '123703';
//    //changer meme le nom de fichier
//    DVM_map_params['venue_id'] = '123703';
//}
//
//
//
////staples center - sparks
//else if (is_map_test && DVM_map_params['venue_id'] === '105234' && DVM_map_params['headliner_id'] === '103733') {
//    venue_folder += '-gr';
//}
//
////Circus Vargas
//else if (DVM_map_params['headliner_id'] === '136521')
//{
//    // Ventura County Fair
//    venue_folder = '110198';
//    DVM_map_params['venue_id'] = venue_folder;
//}
//
////The Forum CA (End Stage)
//
//else if (DVM_map_params['headliner_id'] === '136089' && DVM_map_params['venue_id'] === '103329')
//{
//
//    // Queen with Adam Lambert
//    venue_folder += '-queen';
//}
////The Forum CA (End Stage)
//
//else if (DVM_map_params['headliner_id'] === '117560' && DVM_map_params['venue_id'] === '103329')
//{
//
//    // Ramon Ayala
//    venue_folder += '-ramon';
//}
////The Forum CA (End Stage)
//
//else if (DVM_map_params['headliner_id'] === '102076' && DVM_map_params['venue_id'] === '103329')
//{
//
//    // Aerosmith
//    venue_folder += '-aerosmith';
//}
////The Forum CA (End Stage)
//
//else if (DVM_map_params['headliner_id'] === '105814' && DVM_map_params['venue_id'] === '103329')
//{
//
//    //  Justin Timberlake
//    venue_folder += '-justin';
//}
////Hollywood Bowl
//
//else if (DVM_map_params['venue_id'] === '103406')
//{
//    var events = ['1478075', '1429286', '1427247', '1454165', '1454109', '1427237', '1427238', '1427239', '1454110', '1454111', '1454112', '1454113', '1454114', '1427242', '1454115', '1454116', '1454117', '1454118', '1454119', '1454120', '1454121', '1454122', '1454123', '1454124', '1454125', '1454126', '1454127', '1454128', '1454129', '1454130', '1454131', '1454132', '1454133', '1454134', '1454135', '1454136', '1454137', '1454138', '1454139', '1454140', '1454141', '1454142', '1427240', '1454143', '1454144', '1454145', '1454146', '1454147', '1454148', '1454149', '1454150', '1454151', '1454152', '1454153', '1427241', '1454154', '1454155', '1454156', '1454157', '1454158', '1454159', '1454160', '1454161', '1454162', '1454163', '1427243', '1454164', '1453886', '1454108'];
//    if ($.inArray(DVM_map_params['event_id'], events) !== -1)
//        // secondaire
//        venue_folder += '-sub';
//}

//console.log(venue_folder);

//dodgers parking test
//else if(is_map_test && DVM_map_params['venue_id']==='104272' && DVM_map_params['headliner_id']==='101258'){
//    venue_folder+='-parking';
//}

//functions file
var functions_file_name = 'DVM_functions.js';
if (is_map_test) {
    functions_file_name = 'DVM_functions_test.js';
    if (is_pointer_test && is_pointer_test == 'pointer') {
        functions_file_name = 'DVM_functions_test_pointer.js';
    }
    else if (is_pointer_test && is_pointer_test == 'no_pointer') {
        functions_file_name = 'DVM_functions_test_no_pointer.js';
    }
}
head.js(
        //"https://dynamicvenuemaps.com/maps/js/jquery.mousewheel.min.js",
        "https://dynamicvenuemaps.com/maps/js/jquery-ui.js?v=201310031607",
//        "https://dynamicvenuemaps.com/maps/js/rapha.js",
//        "https://dynamicvenuemaps.com/maps/js/raphael.pan-zoom.js",
//        "https://dynamicvenuemaps.com/maps/js/maps_general_settings.js",
        ///
        // "https://dynamicvenuemaps.com/maps/js/essentiels.min.js?v=201310031607",
        "/essentiels.js?v=91",
        ///

        "https://dynamicvenuemaps.com/maps/js/jquery.fancybox.js?v=2.1.4",
        "https://dynamicvenuemaps.com/maps/maps_setting/" + venue_folder + "/map_settings.js",
        "https://dynamicvenuemaps.com/maps/maps_setting/" + venue_folder + "/map_shapes.js",
        "https://dynamicvenuemaps.com/maps/maps_setting/" + venue_folder + "/section_matching.js?v=201401071606",
        "https://dynamicvenuemaps.com/maps/maps_setting/" + venue_folder + "/synonyms.js?v=201403071228",
        "/DVM_functions.js?v=91",
        function () {
             if(DVM_map_params['tickets_url']){
            var tickets_url = DVM_map_params['tickets_url'];
            if (!window.location.origin)
                window.location.origin = window.location.protocol + "//" + window.location.host;
            root_url = tickets_url.toString().replace(/^(.*\/\/[^\/?#]*).*$/, "$1");
            new_ticket_url = tickets_url.toString().replace(root_url, document.location.origin);
            if (DVM_map_params['tickets_url_type'] === 'xml') {
                $.get(new_ticket_url, function (xml) {
                    var jsonResult = $.xml2json(xml);
                    DVM_map_params['tickets_data_object'] = jsonResult;
                    set_map(DVM_map_params);
                    $("#loading_dvm_map").hide();
                });
            } else if (DVM_map_params['tickets_url_type'] === 'json') {
                $.getJSON(new_ticket_url, function (data) {
                    DVM_map_params['tickets_data_object'] = data;
                    set_map(DVM_map_params);
                    $("#loading_dvm_map").hide();
                });
            }
            }else if(DVM_map_params['tickets_data_object']){
                       //DVM_map_params['tickets_data_object'] = data;
                    //console.log("----------DVM_map_params------------"+  +'***'+JSON.stringify(data)+"----------DVM_map_params------------");
                    set_map(DVM_map_params);
                    $("#loading_dvm_map").hide();
            
        }
        });
        
           
    } else if(DVM_map_params['static_map'] && DVM_map_params['static_map']!='') {
        display_static_map(DVM_map_params['static_map']);
    } else {
        alert('You are not allowed to show the map Or invalid venue');
    }
}
function display_static_map(static_map) {
    $('#'+DVM_map_params["map_name"]).html('<img src="' + static_map + '" border="0" width="' + DVM_map_params["map_width"]+'" height="' + DVM_map_params["map_height"] + '" />');
}
 var is_map_test = false;

 var is_pointer_test = false;