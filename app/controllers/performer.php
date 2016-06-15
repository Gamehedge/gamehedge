<?php

require_once 'app/classes/performer.php';

/*use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
*/
if(!isset($id) || $id < 1) {
	header('Location: /');
	exit;
}
$page     = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
$per_page = 10;
// Handle Header
$smarty->assign('body_tag', '');
$smarty->assign('head_tags', '');
$smarty->assign('css', '');
$smarty->assign('hscripts', '');
$header = $smarty->fetch('shared/header.tpl');
$menu = $smarty->fetch('shared/menu2.tpl');
// Handle Footer
$smarty->assign('fscripts', '<script src="/assets/js/moment.js"></script><script src="/assets/js/performer.js?v119"></script>');
$footer = $smarty->fetch('shared/footer.tpl');
//$p_data = $teClient->showPerformer(['performer_id' => (int)$id]);
$performer = new Performer;
$p_data = $performer->te_to_gh((int)$id);
$p_name = $p_data['name'];
$s_data = Utility::get_team_data($p_name);
$p_slug = $p_data['slug'];
/*
$query  = array('performer_id'      => $id,
                'category_id'       => Config::te_categoryid(),
                'within'            => 25,
                'only_with_tickets' => 'all',
                'page'              => (int)$page,
                'per_page'          => (int)$per_page,
                'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
if(isset($_GET['home_only']) && $_GET['home_only'] == 1) {
	$query['primary_performer'] = true;
}
$e_data = $teClient->listEvents($query);

$e_data = array();

$opps   = array();
if(isset($_GET['home_only']) && $_GET['home_only'] == 1) {
	$smarty->assign('only_home', 'checked="checked"');
} else {
	$smarty->assign('only_home', '');
}
foreach($e_data['events'] AS $i => $d) {
	$p_list = array();
	foreach($d['performances'] AS $p) {
		if($p['performer']['id'] != $id && !isset($opps[$p['performer']['id']]))
			$opps[$p['performer']['id']] = $p['performer']['name'];
		array_push($p_list, '<a href="/performer/' . $p['performer']['id'] . '/' . $p['performer']['slug'] . '" title="' . $p['performer']['name'] . '">' . $p['performer']['name'] . '</a>');
	}
	$e_data['events'][$i]['name'] = implode(' at ', $p_list);
	$date = new DateTime($d['occurs_at']);
	$e_data['events'][$i]['occurs_at'] = $date->format('D, M j, Y h:i A');
	$tgdata = $teClient->listTicketGroups(['event_id' => (int)$d['id'], 'order_by' => 'retail_price']);
	foreach($tgdata['ticket_groups'] AS $tg) {
		if($tg['type'] != 'event')
			continue;
		$e_data['events'][$i]['low_price'] = ceil($tg['retail_price']);
		break;
	}
}
asort($opps);
$pages  = ceil($e_data['total_entries'] / $per_page);
$events = $e_data['events'];
*/
$events = array();
$pages = 0;

$smarty->assign('header', $header);
$smarty->assign('menu', $menu);
$smarty->assign('footer', $footer);
$smarty->assign('title', $p_name);
$smarty->assign('division', str_replace('American League', 'AL', str_replace('National League', 'NL', $s_data['division'])));
$smarty->assign('name', Utility::strip_team_city($p_name));
$smarty->assign('team', $s_data);
$smarty->assign('events', $events);
$smarty->assign('url', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$smarty->assign('page', $page);
$smarty->assign('pages', $pages);
$smarty->assign('performer_id', $id);
$smarty->assign('p_slug', $p_slug);
$smarty->display('performer.tpl');
?>
