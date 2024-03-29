<?php
require_once 'app/classes/client.php';
require_once 'app/classes/session.php';
require_once 'app/classes/order.php';
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
switch($verb) {
case 'request_refund':
    require_once 'app/classes/order.php';
    $order = new Order($request['oid']);
    $order->set('refund', 'requested');
    
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(!isset($client)) {
		die(json_encode(array('status' => 0, 'message' => 'Must be logged in.')));
	}
	$message = "Customer " . $request['name'] . " has requested a GameHedge Refund.\n\nTicket Evolutions Order ID: " . $request['te_id'] . "\n\nLocal Order ID: " . $request['oid'] . "\n\nCustomer ID: " . $request['cid'] . "\n\nCustomer Name: " . $request['name'] . "\n\nCustomer Email: " . $request['email'];
	$subject = "Refund Request for Order " . $request['te_id'];
	$headers = 'From: GameHedge <support@gamehedge.com>' . PHP_EOL . 'Reply-To: GameHedge <support@gamehedge.com>' . PHP_EOL . 'X-Mailer: PHP/' . phpversion();
	
    require_once 'vendor/autoload.php';
        
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    #$mail->Username = "contact@gamehedge.com";
    #$mail->Password = "Gamehedge$10036";
    $mail->Username = "edgarforerogranados@gmail.com";
    $mail->Password = "Granados1";
    $mail->setFrom('contact@gamehedge.com', 'Gamehedge contact system');
    $mail->addAddress('support@gamehedge.com', 'Gamehedge Support');

    $mail->Subject = $subject;
    $mail->msgHTML($message);
    
    if (!$mail->send()) {
        die(json_encode(array('status' => 0, 'message' => 'Error processing your request. Please try again.'.$mail->ErrorInfo)));
    } else {
        die(json_encode(array('status' => 1, 'message' => 'Your GameHedge request has been submitted.')));
    }
    //mail('support@gamehedge.com', $subject, $message, $headers);
	
	break;
case 'login':
	if(isset($client)) {
		header('Location: /member');
		exit;
	}
	// Handle Header
	$smarty->assign('body_tag', ' id="member"');
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
	// Handle Main
	$smarty->assign('title', 'Login');
	$smarty->display('member_login.tpl');
	break;
case 'login_process':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($request['username']) || empty($request['password'])) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Invalid username or password.')));
	}
	if(!filter_var($request['username'], FILTER_VALIDATE_EMAIL)) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Invalid username or password.')));
	}
	$client = new Client;
	$cdata  = $client->get_by_email($request['username']);
	if(!$cdata) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Invalid username or password.')));
	}
	$client = new Client($cdata['id']);
	if($request['password'] != $client->get('password')) {
		die(json_encode(array('status'  => 0,
                          'message' => 'Invalid username or password.')));
	}
	$session->set_data_userid($client->get('id'));
	$_SESSION['last_ip']   = $client->get('last_ip');
	$_SESSION['last_date'] = $client->get('last_date');
	$client->set('last_ip', Utility::get_ip_address());
	$client->set('last_date', date('Y-m-d H:i:s'));
	if(isset($_SESSION['login_redirect'])) {
		$redir = $_SESSION['login_redirect'];
		unset($_SESSION['login_redirect']);
	} else {
		$redir = '/member';
	}
	die(json_encode(array('status'  => 1,
                        'message' => $redir)));
	break;
case 'forgot_process':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($request['email']) || !filter_var($request['email'], FILTER_VALIDATE_EMAIL))
		die(json_encode(array('status' => 0, 'message' => 'Please enter a valid email address.')));
	$custClass = new Client;
	$cdata     = $custClass->get_by_email($request['email']);
	$email     = $cdata['email'];
	$password  = $cdata['password'];
	$message   = "<p>Your requested log in details are below.</p><br /><strong>Username:</strong> $email<br /><strong>Password:</strong> $password<br /><p>If you did not request your account details, please contact support immediately.</p><p>Thank you,</p><p>GameHedge Support</p>";
	$subject   = "Your GameHedge Login";
    
    require_once 'vendor/autoload.php';
        
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    #$mail->Username = "contact@gamehedge.com";
    #$mail->Password = "Gamehedge10036";
    $mail->Username = "edgarforerogranados@gmail.com";
    $mail->Password = "Granados1";
    $mail->setFrom('contact@gamehedge.com', 'Gamehedge contact system');
    $mail->addAddress($email);

    $mail->Subject = $subject;
    $mail->msgHTML($message);
    
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        die(json_encode(array('status' => 1, 'message' => '/member/login')));
    }
	
	break;
case 'logout':
	$session->delete();
	session_destroy();
	header('Location: /');
	exit;
	break;
case 'profile':
	if(!isset($client)) {
		header('Location: /login');
		exit;
	}
	// Handle Header
	$smarty->assign('body_tag', ' id="member"');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('shared/header.tpl');
    $menu = $smarty->fetch('shared/menu.tpl');
	// Handle Footer
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('shared/footer.tpl');
	$te_id  = $client->get('te_uid');
	if(!empty($te_id)) {
		$te_client = $teClient->showClient(['client_id' => (int)$te_id]);
		$smarty->assign('ordered', 1);
		$smarty->assign('cdata', $te_client);
	} else {
		$smarty->assign('ordered', 0);
	}
	$smarty->assign('header', $header);
    $smarty->assign('menu', $menu);
	$smarty->assign('footer', $footer);
	$smarty->assign('title', 'Your Profile');
	$smarty->assign('name', $client->get('name'));
	$smarty->assign('last_date', $_SESSION['last_date']);
	$smarty->assign('last_ip', $_SESSION['last_ip']);
	$smarty->display('member-profile.tpl');
	break;
case 'change_password':
    header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	if(empty($request['password']) )
		die(json_encode(array('status' => 0, 'message' => 'Please enter a password.')));
    
    if(isset($client)) {
        $client->set("password", $request['password']);
        unset($_SESSION['is_client_new']);
        die(json_encode(array('status' => 1, 'message' => 'Password successfully saved.')));
    }
    else {
        die(json_encode(array('status' => 0, 'message' => 'Must be logged in.')));
    }
    break;
case '';
	if(!isset($client)) {
		header('Location: /login');
		exit;
	}
	// Handle Header
	$smarty->assign('body_tag', ' id="member"');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" />');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('shared/header.tpl');
    $menu = $smarty->fetch('shared/menu.tpl');
	// Handle Footer
	$smarty->assign('fscripts', '<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script><link rel="stylesheet" href="/assets/css/sweetalert.css"><script src="/assets/js/sweetalert.min.js"></script>');
	$footer   = $smarty->fetch('shared/footer.tpl');
	$o_data   = $teClient->listOrders(['buyer_id' => (int)$client->get('te_uid')]);
	$orders   = new Order;
	$dbo_data = $orders->get_list_by_customer($client->get('id'), 1, 1000);
	$dbo_data = $dbo_data['orders'];
	$orders   = array();
	foreach($o_data['orders'] AS $o) {
		foreach($dbo_data AS $dbo) {
			if($dbo['te_order_id'] == $o['id']) {
				$db_order = $dbo;
				break;
			}
		}
		array_push($orders, array('id'             => $o['oid'],
                              'raw_id'         => $o['id'],
                              'type'           => $o['shipments'][0]['type'],
                              'status'         => $o['shipments'][0]['state'],
                              'date'           => $o['created_at'],
                              'subtotal'       => $o['subtotal'],
                              'total'          => $o['total'],
                              'shipping'       => $o['shipping'],
                              'service_fee'    => $o['service_fee'],
                              'event'          => $o['items'][0]['ticket_group']['event']['name'],
                              'event_date'     => $o['items'][0]['ticket_group']['event']['occurs_at'],
                              'event_venue'    => $o['items'][0]['ticket_group']['event']['venue']['name'],
                              'event_location' => $o['items'][0]['ticket_group']['event']['venue']['address']['locality'] . ', ' . $o['items'][0]['ticket_group']['event']['venue']['address']['region'],
                              'event_section'  => $o['items'][0]['ticket_group']['section'],
                              'event_row'      => $o['items'][0]['ticket_group']['row'],
                              'event_seats'    => implode(', ', $o['items'][0]['ticket_group']['seats']),
                              'order_id'       => $db_order['id'],
                              'refund_status'  => $db_order['refund_status'],
                              'refund_text'    => $db_order['refund_text']));
	}
	$smarty->assign('customer_id', $client->get('id'));
	$smarty->assign('customer_name', $client->get('name'));
	$smarty->assign('customer_email', $client->get('email'));
	$smarty->assign('header', $header);
    $smarty->assign('menu', $menu);
	$smarty->assign('footer', $footer);
	$smarty->assign('title', 'My Account');
	$smarty->assign('name', $client->get('name'));
    if(isset($_SESSION['last_date'])){
        $smarty->assign('last_date', $_SESSION['last_date']);
    }
    else {
        $smarty->assign('last_date',"");
    }
    if(isset($_SESSION['last_ip'])){
        $smarty->assign('last_ip', $_SESSION['last_ip']);
    }
    else {
        $smarty->assign('last_ip', "");
    }
	$smarty->assign('balance', $o_data['balance_sum']);
	$smarty->assign('num_orders', $o_data['total_entries']);
	$smarty->assign('num_spent', $o_data['total_sum']);
	$smarty->assign('orders', $orders);
	$smarty->display('member.tpl');
	break;
}
?>
