<?php

use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);

switch($verb) {
    case '':
        $data = (object) array('error' => 'empty parameters');
        break;
    case 'close_events':
        $ipAddress = Utility::get_ip_address();
        //$ipAddress = "38.105.128.254";
        /* free geo ip API */
        $ipurl  = 'http://api.ipinfodb.com/v3/ip-city/?key=e12e8a9321c609d76b8c956020e4dd2d0f8f2961357f41ec6fda74e8905b7547&ip=' . $ipAddress . '&format=json';
        $ipdata = json_decode(file_get_contents($ipurl), true);
        $cs     = $ipdata['cityName'] . ', ' . $ipdata['regionName'];
    
        /*pay geo ip API */
        
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
        
        $e_data = $teClient->listEvents($query);
        $data = $e_data;
        break;
    default:
        $data = (object) array('error' => 'empty parameters');
}

$smarty->assign('myarray', $data);
$smarty->display('external.tpl');

?>