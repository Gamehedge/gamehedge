<?php
require_once 'app/classes/order.php';
require_once 'app/classes/order-stat.php';
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);
$smarty->caching = false;
switch($verb) {
case 'ks':	
	// KOUNT
	header("Location: https://ssl.kaptcha.com/logo.htm?m=132228&s=" . $gbl_sess_id);
	exit;
	break;
case 'process':
	if(!isset($client)) {
		// This is a new customer, register them
		$client = new Client;
		if(!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
			die(json_encode(array('status'  => 2,
                            'message' => 'Please enter a valid email address.')));
		}
		if($client->get_by_email($request['email'])) {
			die(json_encode(array('status'  => 2,
                            'message' => 'The email address already exists.')));
		}
		$user_id = $client->add(array('name'      => $request['bfirstname'] . ' ' . $request['blastname'],
                                  'email'     => $request['email'],
                                  'password'  => $request['password'],
                                  'optin'     => $request['optin'],
                                  'last_ip'   => Utility::get_ip_address(),
                                  'last_date' => date('Y-m-d H:i:s')));
		if($user_id) {
			$session->set_data_userid($user_id);
			$client = new Client($user_id);
			$_SESSION['last_ip']   = Utility::get_ip_address();
			$_SESSION['last_date'] = date('Y-m-d H:i:s');
		} else {
			die(json_encode(array('status'  => 2,
                            'message' => 'Failed to create your account. Please contact customer support.')));
		}
	} else {
		$client->set('optin', $request['optin']);
	}
	$order      = $session->get_data_order();
	$tdata      = $teClient->showTicketGroup(['ticket_group_id' => (int)$order['tgroup_id'], 'ticket_list' => false]);
	$event_data = $teClient->showEvent(['event_id' => (int)$tdata['event']['id']]);
	$venue_data = $teClient->showVenue(['venue_id' => (int)$event_data['venue']['id']]);
	foreach($event_data['performances'] AS $performer) {
		if($performer['primary']) {
			$home_team_data = $teClient->showPerformer(['performer_id' => (int)$performer['performer']['id']]);
		} else {
			$away_team_data = $teClient->showPerformer(['performer_id' => (int)$performer['performer']['id']]);
		}
	}
	$signature   = $tdata['signature'];
	$ip_address  = Utility::get_ip_address();
	$office_id   = Config::te_officeid();
	$tgroup_id   = $order['tgroup_id'];
	$price       = $order['price'];
	$num_seats   = $request['qty'];
	$service_fee = round($request['fee'], 2);
	if($request['ticket_format'] == 'Physical') {
		$shipping_data = $teClient->listShippingSettings();
		foreach($shipping_data['settings'] AS $sd) {
			if($sd['id'] == $request['shipping_option']) {
				$shipping_data = $sd;
				break;
			}
		}
	}
	if(isset($shipping_data)) {
		$shipping_fee = $shipping_data['price'];
	} else {
		$shipping_fee = 0.00;
	}
	$total = ($price * $num_seats) + $service_fee + $shipping_fee;
	if($client->get('te_uid')) {
		$client_id   = $client->get('te_uid');
		$client_data = $teClient->showClient(['client_id' => (int)$client_id]);
		$card_id     = $request['card_id'];
		$phone_id    = $request['phone_id'];
		$email_id    = $request['email_id'];
		$billing_id  = $request['billing_address_id'];
		$shipping_id = $request['shipping_address_id'];
	} else {
		$email       = array('label'            => 'Personal',
                         'address'          => $client->get('email'));
		$phone       = array('label'            => 'Mobile',
                         'country_code'     => $request['phone_cc'],
                         'number'           => $request['phone'],
                         'extension'        => isset($request['phone_ext']) ? $request['phone_ext'] : '');
		$client_arr  = array('name'             => $request['bfirstname'] . ' ' . $request['blastname'],
                         'phone_numbers'    => array($phone),
                         'email_addresses'  => array($email));
		$client_data = $teClient->createClients(['clients' => array($client_arr)]);
		$client_data = $client_data['clients'][0];
		$client_id   = $client_data['id'];
		$phone_id    = $client_data['primary_phone_number']['id'];
		$email_id    = $client_data['primary_email_address']['id'];
		$client->set('te_uid', $client_id);
		$baddress = array('label'            => 'Billing Address',
                      'name'             => $request['bfirstname'] . ' ' . $request['blastname'],
                      'street_address'   => $request['baddress1'],
                      'extended_address' => $request['baddress2'],
                      'locality'         => $request['bcity'],
                      'region'           => $request['bstate'],
                      'postal_code'      => $request['bzipcode'],
                      'country_code'     => $request['bcountry'],
                      'primary'          => true);
		if($request['ticket_format'] == 'Physical') {
			$saddress = array('label'            => 'Shipping Address',
                        'name'             => $request['sfirstname'] . ' ' . $request['slastname'],
                        'street_address'   => $request['saddress1'],
                        'extended_address' => $request['saddress2'],
                        'locality'         => $request['scity'],
                        'region'           => $request['sstate'],
                        'postal_code'      => $request['szipcode'],
                        'country_code'     => $request['scountry'],
                        'primary'          => false);
		}
		$addresses = array($baddress);
		if($request['ticket_format'] == 'Physical')
			array_push($addresses, $saddress);
		$address    = $teClient->createClientAddresses(['client_id' => (int)$client_id, 'addresses' => $addresses]);
		$address    = $address['addresses'][0];
		$billing_id = $address['id'];
		if($request['ticket_format'] == 'Physical') {
			$shipping_id = $address['id'];
		} else {
			$shipping_id = $address['addresses'][1]['id'];
		}
		$cc = array('address_id'        => (int)$billing_id,
                'number'            => $request['card_number'],
                'expiration_month'  => $request['card_exp_month'],
                'expiration_year'   => $request['card_exp_year'],
                'ip_address'        => $ip_address,
                'phone_number_id'   => (int)$phone_id,
                'verification_code' => $request['card_cvv2']);
		if(isset($request['store_card']) && $request['store_card'] == 1) {
			$cc_data = $teClient->createClientCreditCards(['client_id' => (int)$client_id, 'credit_cards' => array($cc)]);
			$card_id = $cc_data['credit_cards'][0]['id'];
		}
	}
	if(isset($card_id)) {
		$payments = array('amount'         => number_format($total, 2),
                      'type'           => 'credit_card',
                      'credit_card_id' => $card_id);
	} else {
		unset($cc['address_id']);
		unset($cc['phone_number_id']);
		$payments = array('amount'      => number_format($total, 2),
                      'type'        => 'credit_card',
                      'credit_card' => $cc);
	}
	$ship_item = array('ticket_group_id'        => (int)$tgroup_id,
                     'price'                  => (float)$price,
                     'quantity'               => (int)$num_seats,
                     'ticket_group_signature' => $signature,
                     'seat_order'             => 'consecutive');
	if(isset($shipping_data)) {
		$shipment = array('items'            => array($ship_item),
                      'service_type'     => $shipping_data['shipping_option']['service_type'],
                      'type'             => $shipping_data['shipping_option']['type'],
                      'address_id'       => $shipping_id,
                      'ship_to_name'     => $request['sfirstname'] . ' ' . $request['slastname']);
	} else {
		$shipment = array('items'            => array($ship_item),
                      'type'             => 'Eticket',
                      'email_address_id' => (int)$email_id);
	}
	$oData = array('shipped_items'         => array($shipment),
                 'payments'              => array($payments),
                 'billing_address_id'    => (int)$billing_id,
                 'seller_id'             => (int)$office_id,
                 'client_id'             => (int)$client_id,
                 'session_id'            => $gbl_sess_id,
                 'user_agent'            => $_SERVER['HTTP_USER_AGENT'],
                 'created_by_ip_address' => $ip_address,
                 'shipping'              => (float)$shipping_fee,
                 'service_fee'           => (float)$service_fee,
                 'additional_expense'    => 0.00,
                 'tax'                   => 0.00);
	try {
		$order_data = $teClient->createOrders(['orders' => array($oData)]);
		$order_data = $order_data['orders'][0];
	} catch(Exception $e) {
		echo '<pre>';
		print_r(array($oData));
		echo $e->getMessage();
		echo '</pre>';
		die();
	}
	$cost = $num_seats * $tdata['ticket_list'][0]['cost'];
	foreach($event_data['performances'] AS $teams) {
		if($teams['primary']) {
			$home_team = $teams['performer']['name'];
		} else {
			$away_team = $teams['performer']['name'];
		}
	}
	$order   = new Order;
	$dborder = array('client_id'   => $client_id,
                   'client_name' => $client_data['name'],
                   'order_id'    => $order_data['id'],
                   'name'        => $event_data['name'],
                   'home'        => $home_team,
                   'away'        => $away_team,
                   'date'        => $event_data['occurs_at'],
                   'location'    => $event_data['venue']['name'] . '|' . $event_data['venue']['location'],
                   'section'     => $tdata['section'],
                   'row'         => $tdata['row'],
                   'seats'       => $num_seats,
                   'format'      => $tdata['format'],
                   'total'       => $order_data['total'],
                   'cost'        => $cost,
                   'order_data'  => serialize($order_data),
                   'ticket_data' => serialize($tdata),
                   'event_data'  => serialize($event_data),
                   'home_data'   => serialize($home_team_data),
                   'away_data'   => serialize($away_team_data));
	$orderid = $order->add($dborder);
	$osClass = new OrderStat;
	$osClass->add();
	$session->clear_data_order();
	$_SESSION['order'] = $orderid;
	header('HTTP/1.1 200 OK');
	header('Content-type: application/json');
	echo json_encode(array('status'  => 1,
                         'message' => 'OK'));
	die();
	break;
case 'confirm':
	if(!isset($_SESSION['order'])) {
		header('Location: /');
		exit;
	}
	$order_id    = $_SESSION['order'];
	$order       = new Order($order_id);
	$order_data  = $teClient->showOrder(['order_id' => (int)$order->get('order_id')]);
	$event_data  = $order->get('event_data');
	$event_data  = unserialize($event_data);
	$ticket_data = $order->get('ticket_data');
	$ticket_data = unserialize($ticket_data);
	$date        = new DateTime($event_data['occurs_at'], new DateTimeZone($event_data['venue']['time_zone']));
	$smarty->assign('event_name', $order_data['items'][0]['ticket_group']['event']['name']);
	$smarty->assign('event_date', $date->format('D, M j, Y h:i A'));
	$smarty->assign('venue_name', $event_data['venue']['name']);
	$smarty->assign('venue_location', $event_data['venue']['location']);
	$smarty->assign('ticket_section', $order->get('section'));
	$smarty->assign('ticket_row', $order->get('row'));
	$smarty->assign('ticket_seats', $order->get('seats'));
	$smarty->assign('ticket_price', number_format($ticket_data['retail_price'], 2));
	$smarty->assign('num_tickets', $order_data['items'][0]['quantity']);
	$smarty->assign('order_id', $order_data['oid']);
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->display('order_confirm.tpl');
	break;
case 'cancel':
	$order = $session->get_data_order();
	$session->clear_data_order();
	header('Location: /ticket/' . $order['event_id']);
	exit;
	break;
case 'add':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	$tickets    = $teClient->showTicketGroup(['ticket_group_id' => (int)$_POST['tgroup_id'], 'ticket_list' => true]);
	$order_data = array('event_id'    => $_POST['event_id'],
                      'tgroup_id'   => $_POST['tgroup_id'],
                      'price'       => $_POST['price'],
                      'qty'         => $_POST['qty'],
                      'splits'      => $tickets['splits'],
                      'service_fee' => 0.00);
	$session->set_data_order($order_data);
	die(json_encode(array('status'  => 1,
                        'message' => 'OK')));
	break;
case '';
	if(!$session->get_data_userid()) {
		$_SESSION['login_redirect'] = '/order';
	}
	$order = $session->get_data_order();
	$event = $teClient->showEvent(['event_id' => (int)$order['event_id']]);
	foreach($event['performances'] AS $p) {
		if($p['primary']) {
			$performer = $p['performer'];
			break;
		}
	}
	$performer = $teClient->showPerformer(['performer_id' => (int)$performer['id']]);
	$tgroup    = $teClient->showTicketGroup(['ticket_group_id' => (int)$order['tgroup_id'], 'ticket_list' => false]);
	$date      = new DateTime($event['occurs_at'], new DateTimeZone($event['venue']['time_zone']));
	$t_format  = $tgroup['format']; // Eticket or Physical
	if($t_format == 'Physical') {
		$shipping      = $teClient->listShippingSettings();
		$shipping_data = array();
		foreach($shipping['settings'] AS $sd) {
			$shipping_data[$sd['id']] = $sd;
		}
		$shipping_id = $shipping['settings'][0]['id'];
	} else {
		$shipping_data = array('0' => array('id'    => 0,
                                        'name'  => 'Email Delivery',
                                        'price' => 0.00));
		$shipping_id   = 0;
	}
	$service_fee = $teClient->listServiceFeesSettings();
	if(isset($client) && !empty($client->get('te_uid'))) {
		$client_data = $teClient->showClient(['client_id' => (int)$client->get('te_uid')]);
		$addresses   = array();
		foreach($client_data['addresses'] AS $address) {
			$addresses[$address['id']] = $address;
		}
		$cc_data     = $teClient->listClientCreditCards(['client_id' => (int)$client->get('te_uid')]);
		$creditcards = array();
		foreach($cc_data['credit_cards'] AS $cc) {
			$creditcards[$cc['id']] = $cc;
		}
		$hscripts = '
<script type="text/javascript">
	var api_key       = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
	var addresses     = ' . json_encode($addresses) . ';
	var credit_cards  = ' . json_encode($creditcards) . ';
	var customer_data = ' . json_encode($client_data) . ';
	var order_data    = ' . json_encode($order) . ';
	var shipping_data = ' . json_encode($shipping_data) . ';
	var shipping_id   = ' . $shipping_id . ';
	var service_fee   = ' . json_encode($service_fee['settings']) . ';
	var ticket_format = \'' . $t_format . '\';
	var existing      = 1;
</script>';
	} else {
		if(isset($client)) {
			$hscripts = '
<script type="text/javascript">
	var api_key       = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
	var order_data    = ' . json_encode($order) . ';
	var shipping_data = ' . json_encode($shipping_data) . ';
	var shipping_id   = ' . $shipping_id . ';
	var service_fee   = ' . json_encode($service_fee['settings']) . ';
	var ticket_format = \'' . $t_format . '\';
	var client        = 1;
	var existing      = 0;
</script>';
		} else {
			$hscripts = '
<script type="text/javascript">
	var api_key       = \'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuZ2FtZWhlZGdlLmNvbSIsImlhdCI6MTQ1OTU0ODQ5MSwiZXhwIjoxNDkxMDg0NDkxLCJkYXRhIjp7Imhvc3RuYW1lIjoid3d3LmdhbWVoZWRnZS5jb20ifX0.sr5aSFIe9cgbipqIZ2t3yX_jBL1XvYygffneLLRLCOg\';
	var order_data    = ' . json_encode($order) . ';
	var shipping_data = ' . json_encode($shipping_data) . ';
	var shipping_id   = ' . $shipping_id . ';
	var service_fee   = ' . json_encode($service_fee['settings']) . ';
	var ticket_format = \'' . $t_format . '\';
	var client        = 0;
	var existing      = 0;
</script>';
		}
	}
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', 'ng-app="gamehedge"');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', $hscripts);
	$header   = $smarty->fetch('shared/header.tpl');
	$fscripts = '<script src="/assets/js/app/app.js"></script>';
	$smarty->assign('fscripts', $fscripts);
	$footer = $smarty->fetch('shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('event_name', $event['name']);
	$smarty->assign('event_date', $date->format('D, M j, Y h:i A'));
	$smarty->assign('venue_name', $event['venue']['name']);
	$smarty->assign('venue_location', $event['venue']['location']);
	$smarty->assign('ticket_format', $t_format);
	$smarty->assign('ticket_section', $tgroup['section']);
	$smarty->assign('ticket_row', $tgroup['row']);
	$smarty->display('order.tpl');
	break;
}
?>
