<?php
$access = $admin->get_access();
if(!isset($access['users']) || $access['users'] == 0) {
	die('You are not Authorized to View this Area');
}
switch($verb) {
case 'add':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	$response = $admin->add($_POST);
	if(is_numeric($response) && $response > 0) {
		die(json_encode(array('status'  => 1,
                          'message' => 'OK')));
	} else {
		die(json_encode(array('status'  => 0,
                          'message' => $response)));
	}
	break;
case 'delete':
	if(!isset($args[0]) || !is_numeric($args[0])) {
		header('Location: /admin/users');
		exit;
	}
	$id = $args[0];
	if($id == $admin->get('id')) {
		// Cant delete yourself
		header('Location: /admin/users');
		exit;
	}
	$tmp_admin = new Admin($id);
	$tmp_admin->delete();
	header('Location: /admin/users');
	exit;
	break;
case '':
	$users = $admin->get_list();
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('users', $users);
	$smarty->display('admin/users.tpl');
	break;
}
?>
