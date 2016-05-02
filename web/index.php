<?php
session_start();
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__) . '/../');
require_once 'vendor/autoload.php';
require_once 'app/libs/smarty/libs/Smarty.class.php';
require_once 'app/libs/Config.php';
require_once 'app/libs/Crypt.php';
require_once 'app/libs/DB.php';
require_once 'app/libs/Utility.php';
require_once 'app/classes/client.php';
require_once 'app/classes/session.php';

$serverInfo = posix_uname();
if(strpos($serverInfo['nodename'], 'gamehedge.com') > -1) {
	define('MODE', 'live');
} else {
	define('MODE', 'live');
}
/**
 * Initialize our Template Engine (smarty - http://www.smarty.net)
 *
 * @since v0.0.1
 */
$smarty            = new Smarty;
$smarty->debugging = false;
$smarty->caching   = false;
$smarty->setTemplateDir('../app/views')->setCompileDir('../app/views/compiled')->setCacheDir('../app/views/cache');

/**
 * Set Session ID
 *
 * Check if Session ID already exists, otherwise, create a new one
 *
 * @since v0.0.1
 */
$session = new Session;
if(!isset($_COOKIE['sess_id'])) {
	$gbl_sess_id = Utility::create_sess_id();
	$session->add(array('id'   => $gbl_sess_id,
                      'data' => ''));
} else {
	$gbl_sess_id = $_COOKIE['sess_id'];
	if(!$session->validate($gbl_sess_id)) {
		$gbl_sess_id = Utility::create_sess_id();
		$session->add(array('id'   => $gbl_sess_id,
                        'data' => ''));
	}
}
$session = new Session($gbl_sess_id);
if($session->get_data_userid()) {
	$client       = new Client($session->get_data_userid());
	$client_name  = $client->get('name');
	$client_fname = substr($client_name, 0, strpos($client_name, ' '));
	$smarty->assign('fname', $client_fname);
} else {
	$smarty->assign('fname', '');
}
/**
 * Site Router
 *
 * This file routes all requests for our site
 *
 * @since v0.0.1
 */
if(isset($_GET['request'])) {
	$args = explode('/', rtrim($_GET['request'], '/'));
} else {
	$args = array();
}
$endpoint = array_shift($args);
$id       = isset($args[0]) && is_numeric($args[0]) ? array_shift($args) : null;
$verb     = count($args) > 0 ? array_shift($args) : '';
$method   = $_SERVER['REQUEST_METHOD'];
switch($method) {
case 'POST':
	$request = Utility::clean_inputs($_POST);
	break;
case 'GET':
case 'DELETE':
	$request = Utility::clean_inputs($_GET);
	break;
case 'PUT':
	$file = file_get_contents('php://input');
	if(Utility::is_json($file)) {
		$data = json_decode($file, true);
		if(isset($data['data'])) {
			$request = $data['data'];
		} else {
			$request = $data;
		}
	} else {
		parse_str($file, $request);
	}
	break;
case 'OPTIONS':
	die('ok');
	break;
default:
	header("HTTP/1.1 405 Method Not Allowed");
	die();
	break;
}

$smarty->assign('year', date('Y'));
// Handle our "index" endpoints
if($endpoint == '')
	$endpoint = 'home';
if(in_array($endpoint, array('how-it-works', 'faq', 'contact', 'our-terms', 'american-league', 'national-league', 'sports', 'site-map', 'privacy-policy', 'contact-send'))) {
	$verb     = $endpoint;
	$endpoint = 'static';
}
switch($endpoint) {
default:
	if(file_exists(dirname(__FILE__) . '/../app/controllers/' . $endpoint . '.php')) {
		require_once 'app/controllers/' . $endpoint . '.php';
	} else {
		header("HTTP/1.1 404 File Not Found");
		die('404 Error');
	}
}
?>
