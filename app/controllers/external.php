<?php

require_once 'app/classes/event.php';
require_once 'app/classes/performer.php';

use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);

switch($verb) {
    case '':
        $data = (object) array('error' => 'empty parameters');
        break;
    /*
    case 'test':
    
        ///////// THIS SCRIPT IS THE ONE THAT UPDATES THE DATABASE FOR THE EVENTS EVERYNIGHT
        $query  = array(//'performer_id'      => 16425,//$_GET["id"],
            'category_id'       => Config::te_categoryid(),
            'page'              => 1,//(int)$_GET["page"],
            'per_page'          => 10000,//(int)$_GET["per_page"],
            //'occurs_at.gte'     => $_GET["actual_date"],
            //'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
            );
        $e_data = $teClient->listEvents($query);
        $data = [];
        foreach($e_data['events'] AS $tevo_event) {
            $event = new Event;
            $test = $event->te_to_gh($tevo_event["id"]);
            if($test == false){
                $date = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $tevo_event["occurs_at"])));
                if(count($tevo_event["performances"]) == 2){
                    if($tevo_event["performances"][0]["primary"] == true){
                        $eventData = array('te_uid' => $tevo_event["id"],
                        'te_performer_home_id' => $tevo_event["performances"][0]["performer"]["id"],
                        'te_performer_visit_id' => $tevo_event["performances"][1]["performer"]["id"],
                        'data_event' => json_encode($tevo_event),
                        'te_date' => $date,
                        );
                    }
                    else{
                        $eventData = array('te_uid' => $tevo_event["id"],
                        'te_performer_home_id' => $tevo_event["performances"][1]["performer"]["id"],
                        'te_performer_visit_id' => $tevo_event["performances"][0]["performer"]["id"],
                        'data_event' => json_encode($tevo_event),
                        'te_date' => $date,
                        );
                    }
                }
                else{
                    $eventData = array('te_uid' => $tevo_event["id"],
                    'te_performer_home_id' => $tevo_event["performances"][0]["performer"]["id"],
                    'data_event' => json_encode($tevo_event),
                    'te_date' => $date,
                    );
                }
                $eventId = $event->add($eventData);
            }
        }
        ///////// THIS SCRIPT IS TO UPDAT THE DATABASE FOR THE PERFORMERS
        //$data = $e_data;
        $query  = array(16425,
                15532,
                15533,
                15534,
                15535,
                15536,
                15537,
                15538,
                15539,
                15540,
                15552,
                15541,
                15542,
                15543,
                15544,
                15545,
                15546,
                15547,
                15548,
                15549,
                15550,
                15551,
                15553,
                15554,
                15555,
                15556,
                15557,
                15558,
                15559,
                15560);
        foreach($query AS $perf_id) {
            $p_data = $teClient->showPerformer(['performer_id' => $perf_id]);
            $slug = $p_data['slug'];
            $name = $p_data['name'];
            $performer = new Performer;
            $test = $performer->te_to_gh($perf_id);
            if($test == false){
                $eventData = array('te_uid' => $perf_id,
                    'te_name' => $name,
                    'te_slug' => $slug,
                );
                $eventId = $performer->add($eventData);
            }
        }
        $performer = new Performer;
        $p_data = $performer->te_to_gh(15554);
        $data = $p_data;
        break;*/
    case 'close_events':
        $ipAddress = Utility::get_ip_address();
        //$ipAddress = "38.105.128.254";
        /* free geo ip API */
        #$ipurl  = 'http://api.ipinfodb.com/v3/ip-city/?key=e12e8a9321c609d76b8c956020e4dd2d0f8f2961357f41ec6fda74e8905b7547&ip=' . $ipAddress . '&format=json';
        #$ipdata = json_decode(file_get_contents($ipurl), true);
        #$cs     = $ipdata['cityName'] . ', ' . $ipdata['regionName'];
    
        /*pay geo ip API */
        if(isset($_COOKIE["cs"])){
            $cs = $_COOKIE["cs"];
        }
        else {
            if($ipAddress == "::1"){
                $ipAddress = "38.105.128.254";   
            }
            
            $ipurl = "https://geo.pointp.in/c3f08b81-2120-4f7a-8ca4-2378530fcde1/json/". $ipAddress;
            $json = file_get_contents($ipurl);
            $location_data = json_decode($json, true);
            $cs = $location_data['city_name'] . ',' . $location_data['region_code'];  
            setcookie("cs",$cs,time()+43200);
        }    
    
        $query  = array('city_state'    => $cs,
                      'category_id'     => Config::te_categoryid(),
                      'within'          => 25,
                      'page'            => 1,
                      'per_page'        => 8,
                      'occurs_at.gte'   => $_GET["actual_date"],
                      'order_by'        => 'events.occurs_at ASC, events.popularity_score DESC');
        $e_data = $teClient->listEvents($query);
        $data = $e_data['events'];
        break;
    
    case 'close_events1':
        //$ipAddress = Utility::get_ip_address();
        $ipAddress = "38.105.128.254";
        if(isset($_COOKIE["cs"])){
            $cs = $_COOKIE["cs"];
        }
        else {
            $ipurl = "https://geo.pointp.in/c3f08b81-2120-4f7a-8ca4-2378530fcde1/json/". $ipAddress;
            $json = file_get_contents($ipurl);
            $location_data = json_decode($json, true);
            $cs = $location_data['city_name'] . ',' . $location_data['region_code'];  
            setcookie("cs",$cs,time()+43200);
        }
        
        //$ipurl  = 'http://api.ipinfodb.com/v3/ip-city/?key=e12e8a9321c609d76b8c956020e4dd2d0f8f2961357f41ec6fda74e8905b7547&ip=' . $ipAddress . '&format=json';
        //$ipdata = json_decode(file_get_contents($ipurl), true);
        
        //$cs     = $ipdata['cityName'] . ', ' . $ipdata['regionName'];
        $query  = array('city_state'    => $cs,
                      'category_id'     => Config::te_categoryid(),
                      'within'          => 25,
                      'page'            => 1,
                      'per_page'        => 8,
                      'occurs_at.gte'   => $_GET["actual_date"],
                      'order_by'        => 'events.occurs_at ASC, events.popularity_score DESC');
        $e_data = $teClient->listEvents($query);
        $data = $e_data['events'];
        break;
    
    case 'performer_events':
        if($_GET["home_only_games"] == 'true'){
            $query  = array('performer_id'      => $_GET["id"],
                'category_id'       => Config::te_categoryid(),
                'page'              => (int)$_GET["page"],
                'per_page'          => (int)$_GET["per_page"],
                'occurs_at.gte'     => $_GET["actual_date"],
                'primary_performer' => true,
                'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
        }
        else {
            $query  = array('performer_id'      => $_GET["id"],
                'category_id'       => Config::te_categoryid(),
                'page'              => (int)$_GET["page"],
                'per_page'          => (int)$_GET["per_page"],
                'occurs_at.gte'     => $_GET["actual_date"],
                'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
        }
        $event = new Event;
        $e_data = $event->get_list($query);
        //$e_data = $teClient->listEvents($query);
        $data = $e_data;
        break;
    case 'promo_codes':
        $query  = array(
            'code'              => 'edgar',
            'page'              => 1,
            'per_page'          => 10
        );
        $e_data = $teClient->listPromotionCodes($query);
        $data = $e_data;
        break;
    
    default:
        $data = (object) array('error' => 'empty parameters');
}

$smarty->assign('myarray', $data);
$smarty->display('external.tpl');

?>