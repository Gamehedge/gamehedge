<?php
switch($verb) {
case 'password_update':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($_POST['current_password']) || empty($_POST['new_password']) || empty($_POST['confirm_password'])) {
		die(json_encode(array('status'  => 0,
                          'message' => 'All fields are required.')));
	}
	if($_POST['current_password'] != $admin->get('password')) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Unable to verify current password.')));
	}
	if($_POST['new_password'] != $_POST['confirm_password']) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Confirmation Password does not match new password.')));
	}
	$admin->set('password', $_POST['new_password']);
	die(json_encode(array('status'  => 1,
                        'message' => 'OK')));
	break;
case '':
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('fullname', $admin->get('firstname') . ' ' . $admin->get('lastname'));
	$smarty->assign('email', $admin->get('email'));
	$smarty->assign('username', $admin->get('username'));
	$smarty->assign('last_date', $_SESSION['last_date']);
	$smarty->assign('last_ip', $_SESSION['last_ip']);
	$smarty->display('admin/profile.tpl');
	break;
}
?>
