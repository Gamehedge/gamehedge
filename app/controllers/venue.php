<?php
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
if(!isset($id) || $id < 1) {
	header('Location: /');
	exit;
}
$page     = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
$per_page = 15;
// Handle Header
$smarty->assign('body_tag', '');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
$menu = $smarty->fetch('shared/menu.tpl');
// Handle Footer
$smarty->assign('fscripts', '');
$footer = $smarty->fetch('shared/footer.tpl');
// Handle Main
$v_data = $teClient->showVenue(['venue_id' => (int)$id]);
$query  = array('venue_id'    => $id,
                'category_id' => Config::te_categoryid(),
                'within'      => 25,
                'page'        => 1,
                'per_page'    => 10,
                'order_by'    => 'events.occurs_at ASC, events.popularity_score DESC');
$e_data = $teClient->listEvents($query);
foreach($e_data['events'] AS $i => $d) {
	$tgdata = $teClient->listTicketGroups(['event_id' => (int)$d['id'], 'order_by' => 'retail_price']);
	if($tgdata['total_entries'] == 0) {
		unset($e_data['events'][$i]);
		continue;
	}
	foreach($tgdata['ticket_groups'] AS $tg) {
		if($tg['type'] != 'event')
			continue;
		$e_data['events'][$i]['low_price'] = ceil($tg['retail_price']);
		break;
	}
	$p_list = array();
	foreach($d['performances'] AS $p) {
		array_push($p_list, '<a href="/performer/' . $p['performer']['id'] . '/' . $p['performer']['slug'] . '" title="' . $p['performer']['name'] . '">' . $p['performer']['name'] . '</a>');
	}
	$e_data['events'][$i]['name'] = implode(' at ', $p_list);
	$date = new DateTime($d['occurs_at']);
	$e_data['events'][$i]['occurs_at'] = $date->format('D, M j, Y h:i A');
}
$pages  = ceil($e_data['total_entries'] / $per_page);
$events = $e_data['events'];
$smarty->assign('header', $header);
$smarty->assign('menu', $menu);
$smarty->assign('footer', $footer);
$smarty->assign('name', $v_data['name']);
$smarty->assign('location', $v_data['address']['street_address'] . ', ' . $v_data['address']['location'] . ' ' . $v_data['address']['postal_code'] . ' ' . $v_data['address']['country_code']);
$smarty->assign('events', $events);
$smarty->assign('url', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$smarty->assign('page', $page);
$smarty->assign('pages', $pages);
$smarty->display('venue.tpl');
?>