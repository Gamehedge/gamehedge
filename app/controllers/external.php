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
        $ipurl  = 'http://api.ipinfodb.com/v3/ip-city/?key=e12e8a9321c609d76b8c956020e4dd2d0f8f2961357f41ec6fda74e8905b7547&ip=' . $ipAddress . '&format=json';
        $ipdata = json_decode(file_get_contents($ipurl), true);
        $cs     = $ipdata['cityName'] . ', ' . $ipdata['regionName'];
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
        $query  = array('performer_id'      => $_GET["id"],
                'category_id'       => Config::te_categoryid(),
                'page'              => 1,
                'per_page'          => 10,
                'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
        $e_data = $teClient->listEvents($query);
        $data = $e_data['events'];
        break;
    default:
        $data = (object) array('error' => 'empty parameters');
}

$smarty->assign('myarray', $data);
$smarty->display('external.tpl');

?>