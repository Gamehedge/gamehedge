<?php
require_once 'app/classes/client.php';
require_once 'app/classes/session.php';

if(isset($client)) {
	header('Location: /member');
	exit;
}
switch($verb) {
case 'process':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($request['name']) || empty($request['email']) || empty($request['password'])) {
		die(json_encode(array('status'  => 0,
                          'message' => 'All fields are required.')));
	}
	if(!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Please enter a valid email address.')));
	}
	$client = new Client;
	if($client->get_by_email($request['email'])) {
		die(json_encode(array('status'  => 0,
                          'message' => 'The email address already exists.')));
	}
	if($request['password'] != $request['cpassword']) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Your password and confirmation password do not match.')));
	}
	$user_id = $client->add(array('name'      => $request['name'],
                                'email'     => $request['email'],
                                'password'  => $request['password'],
                                'last_ip'   => Utility::get_ip_address(),
                                'last_date' => date('Y-m-d H:i:s')));
	if($user_id) {
		$session->set_data_userid($user_id);
		$_SESSION['last_ip']   = Utility::get_ip_address();
		$_SESSION['last_date'] = date('Y-m-d H:i:s');
		die(json_encode(array('status'  => 1,
                          'message' => '/member')));
	} else {
		die(json_encode(array('status'  => 0,
                          'message' => 'Failed to Register User.')));
	}
	break;
case '':
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
	$smarty->assign('header', $header);
    $smarty->assign('menu', $menu);
	$smarty->assign('footer', $footer);
	$smarty->assign('title', 'Register');
	$smarty->assign('fb_login_url', $gbl_fbli_url);
	$smarty->display('register.tpl');
	break;
}
?>
