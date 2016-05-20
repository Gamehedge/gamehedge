<?php
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
// Handle Header
$smarty->assign('body_tag', ' id="home"');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
// Handle Footer
$smarty->assign('fscripts', '<script src="/assets/js/moment.min.js"></script><script src="/assets/js/home.js"></script>');
$footer = $smarty->fetch('shared/footer.tpl');
switch($verb) {
case '';
    /*
	$ipurl  = 'http://api.ipinfodb.com/v3/ip-city/?key=e12e8a9321c609d76b8c956020e4dd2d0f8f2961357f41ec6fda74e8905b7547&ip=' . Utility::get_ip_address() . '&format=json';
	$ipdata = json_decode(file_get_contents($ipurl), true);
	$cs     = $ipdata['cityName'] . ', ' . $ipdata['regionName'];
	$query  = array('city_state' => $cs,
                  'category_id' => Config::te_categoryid(),
                  'within'      => 25,
                  'page'        => 1,
                  'per_page'    => 8,
                  'occurs_at.gte' => date("Y-m-d H:i:s"),
                  'order_by'    => 'events.occurs_at ASC, events.popularity_score DESC');
	$e_data = $teClient->listEvents($query);
	$events = $e_data['events'];
    */
    $events = array();
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('title', 'Welcome to GameHedge');
	$smarty->assign('events', $events);
	$smarty->display('home.tpl');
	break;
}
?>