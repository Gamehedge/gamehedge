<?php
require_once 'app/classes/client.php';
require_once 'app/classes/order.php';
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);

$access = $admin->get_access();
if(!isset($access['customers']) || $access['customers'] == 0) {
	die('You are not Authorized to View this Area');
}
$page     = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
$per_page = 25;
switch($verb) {
case 'reset':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($_POST['password']) || empty($_POST['cpassword']))
		die(json_encode(array('status' => 0, 'error' => 'All fields are required.')));
	if($_POST['password'] != $_POST['cpassword'])
		die(json_encode(array('status' => 0, 'error' => 'Passwords do not match.')));
	$password  = $_POST['password'];
	$custClass = new Client($_POST['cid']);
	$custClass->set('password', $password);
	die(json_encode(array('status' => 1, 'message' => 'OK')));
	break;
case 'view':
	if(!isset($args[0]) || !is_numeric($args[0])) {
		header('Location: /admin/customers');
		exit;
	}
	$orderClass = new Order;
	$custClass  = new Client($args[0]);
	$teid       = $custClass->get('te_uid');
	if($teid) {
		$cdata = $teClient->showClient(['client_id' => (int)$teid]);
		$smarty->assign('customer', $cdata);
		$smarty->assign('ordered', 1);
	} else {
		$smarty->assign('customer', array('name'  => $custClass->get('name'),
                                      'email' => $custClass->get('email')));
		$smarty->assign('ordered', 0);
	}
	$smarty->assign('optin', $custClass->get('optin'));
	$smarty->assign('cid', $args[0]);
	$orders = $orderClass->get_list_by_customer($args[0], $page, $per_page);
	$pages  = ceil($orders['total'] / $per_page);
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('orders', $orders['orders']);
	$smarty->assign('url', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
	$smarty->assign('page', $page);
	$smarty->assign('pages', $pages);
	$smarty->display('admin/customers_view.tpl');
	break;
case 'search':
case '':
	$custClass = new Client;
	if(!empty($request['q'])) {
		$query = $request['q'];
	}
	if($verb == 'search' && !empty($query)) {
		$custs = $custClass->find($query, $page, $per_page);
	} else {
		$custs = $custClass->get_list($page, $per_page);
	}
    
	$pages = ceil($custs['total'] / $per_page);
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
    if(isset($custs['customers'])){
        $smarty->assign('customers', $custs['customers']);
    }
	$smarty->assign('url', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
	$smarty->assign('clients', $custs['clients']);
	$smarty->assign('page', $page);
	$smarty->assign('pages', $pages);
	$smarty->display('admin/customers.tpl');
	break;
}
?>
