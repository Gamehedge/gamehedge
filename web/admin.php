<?php
session_start();
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__) . '/../');
require_once 'vendor/autoload.php';
require_once 'app/libs/smarty/libs/Smarty.class.php';
require_once 'app/libs/Config.php';
require_once 'app/libs/DB.php';
require_once 'app/libs/Utility.php';
require_once 'app/classes/admin.php';
require_once 'app/classes/admin-session.php';

$serverInfo = posix_uname();
if(strpos($serverInfo['nodename'], 'gamehedge.com') > -1) {
	define('MODE', 'live');
} else {
	define('MODE', 'dev');
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
	header('HTTP/1.1 405 Method Not Allowed');
	die();
	break;
}
/**
 * Set Session ID
 *
 * Check if Session ID already exists, otherwise, create a new one
 *
 * @since v0.0.1
 */
$session = new AdminSession;
if(!isset($_COOKIE['admin_sess_id'])) {
	$gbl_sess_id = Utility::create_sess_id('admin');
	$session->add(array('id'   => $gbl_sess_id,
                      'data' => ''));
} else {
	$gbl_sess_id = $_COOKIE['admin_sess_id'];
	if(!$session->validate($gbl_sess_id)) {
		$gbl_sess_id = Utility::create_sess_id('admin');
		$session->add(array('id'   => $gbl_sess_id,
                        'data' => ''));
	}
}
$session = new AdminSession($gbl_sess_id);
if($session->get_data_userid()) {
	$admin = new Admin($session->get_data_userid());
	$smarty->assign('loggedin', 1);
	$smarty->assign('name', $admin->get('firstname'));
} else {
	if($endpoint != 'login') {
		header('Location: /admin/login');
		exit;
	}
	$smarty->assign('loggedin', 0);
}
$smarty->assign('year', date('Y'));
switch($endpoint) {
case 'logout':
	$session->delete();
	session_destroy();
	header('Location: /admin');
	exit;
	break;
case '':
	require_once 'app/classes/order-stat.php';
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$osClass = new OrderStat;
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('stats', $osClass->get_stats());
	$smarty->display('admin/home.tpl');
	break;
default:
	if(file_exists(dirname(__FILE__) . '/../app/controllers/admin/' . $endpoint . '.php')) {
		require_once 'app/controllers/admin/' . $endpoint . '.php';
	} else {
		header('HTTP/1.1 404 File Not Found');
		die('404 Error');
	}
}
?>