<?php
require_once 'app/classes/admin.php';
require_once 'app/classes/admin-session.php';

if(isset($admin)) {
	header('Location: /admin');
	exit;
}
switch($verb) {
case 'forgot_process':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($request['email']) || !filter_var($request['email'], FILTER_VALIDATE_EMAIL))
		die(json_encode(array('status' => 0, 'message' => 'Please enter a valid email address.')));
	$adminClass = new Admin;
	$adata      = $adminClass->get_by_email($request['email']);
	$email      = $adata['email'];
	$password   = $adata['password'];
	$message    = "Your requested log in details are below.\n\nUsername: $email\nPassword: $password\n\nIf you did not request your account details, please contact support immediately.\n\nThank you,\nGameHedge Support";
	$subject    = "Your GameHedge Admin Login";
	$headers    = 'From: GameHedge <support@gamehedge.com>' . PHP_EOL . 'Reply-To: GameHedge <support@gamehedge.com>' . PHP_EOL . 'X-Mailer: PHP/' . phpversion();
	mail($email, $subject, $message, $headers);
	die(json_encode(array('status' => 1, 'message' => '/admin/login')));
	break;
case 'process':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	$username = !empty($request['username']) ? $request['username'] : '';
	$password = !empty($request['password']) ? $request['password'] : '';
	if(empty($username) || empty($password)) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Missing username or password.')));
	}
	$admin = new Admin;
	$adata = $admin->login($username, $password);
	if($adata) {
		$session->set_data_userid($adata['id']);
		$admin = new Admin($adata['id']);
		$_SESSION['last_ip']   = $admin->get('last_ip');
		$_SESSION['last_date'] = $admin->get('last_date');
		$admin->set('last_ip', Utility::get_ip_address());
		$admin->set('last_date', date('Y-m-d H:i:s'));
		die(json_encode(array('status'  => 1,
                          'message' => 'OK')));
	} else {
		die(json_encode(array('status'  => 0,
                          'message' => 'Invalid Username or Password.')));
	}
	break;
case '':
	// Handle Header
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	// Handle Footer
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->display('admin/login.tpl');
	break;
}
?>
