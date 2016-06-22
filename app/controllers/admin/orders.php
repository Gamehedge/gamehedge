<?php
require_once 'app/classes/order.php';
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);

$access = $admin->get_access();
if(!isset($access['orders']) || $access['orders'] == 0) {
	die('You are not Authorized to View this Area');
}
switch($verb) {
case 'refund_status':
	header('HTTP/1.1 200 OK');
	header('Content-Type: application/json');
	$order = new Order($request['id']);
	//echo json_encode($order->set('refund', $request['status']));
	if($order->set('refund', $request['status'])) {
	 	die(json_encode(array('status' => 1, 'message' => 'OK')));
	} else {
	 	die(json_encode(array('status' => 0, 'message' => 'There was an error setting order Refund Status.')));
	}
	break;
case 'refund':
	if(count($args) < 1) {
		header('Location: /admin/orders');
		exit;
	}
	if(!is_numeric($args[0])) {
		header('Location: /admin/orders');
		exit;
	}
	if(!in_array($args[1], array('half', 'full'))) {
		header('Location: /admin/orders');
		exit;
	}
	$paymentid = $args[0];
	$type      = $args[1];
	try {
		if($type == 'full') {
			$res      = $teClient->refundPayment(['payment_id' => (int)$paymentid]);
			$order_id = (int)$res['order_link_id'];
		} else {
			$pay_data   = $teClient->showPayment(['payment_id' => (int)$paymentid]);
			$order_id   = (int)$pay_data['order_link_id'];
			$order_data = $teClient->showOrder(['order_id' => $order_id]);
			$refund_amt = $order_data['subtotal'] / 2;
			$res        = $teClient->refundPayment(['payment_id' => (int)$paymentid, 'amount' => (float)$refund_amt]);
		}
		$order   = new Order($order_id);
		$order->set('refund', 'sent');
		header('Location: /admin/orders/view/' . $order_id);
		exit;
	} catch(Exception $e) {
		echo $e->getMessage();
	}
	break;
case 'view':
	if(!isset($args[0]) || !is_numeric($args[0])) {
		header('Location: /admin/orders');
		exit;
	}
	$orderid    = $args[0];
	$order      = new Order($orderid);
	$location   = $order->get('location');
	$lparts     = explode('|', $location);
	$venue      = $lparts[0];
	$location   = $lparts[1];
	$order_data = $teClient->showOrder(['order_id' => (int)$order->get('order_id')]);
	$has_refund = false;
	foreach($order_data['payments'] AS $payment) {
		if($payment['is_refund'] == 1) {
			$has_refund = true;
		}
	}
	$order->set('order_data', serialize($order_data));
	$smarty->assign('body_tag', '');
	$smarty->assign('head_tags', '');
	$smarty->assign('css', '');
	$smarty->assign('hscripts', '');
	$header = $smarty->fetch('admin/shared/header.tpl');
	$smarty->assign('fscripts', '');
	$footer = $smarty->fetch('admin/shared/footer.tpl');
	$smarty->assign('header', $header);
	$smarty->assign('footer', $footer);
	$smarty->assign('te_orderid', $order->get('order_id'));
	$smarty->assign('client_name', $order_data['buyer']['name']);
	$smarty->assign('client_email', $order_data['buyer']['email_addresses'][0]['address']);
	$smarty->assign('client_phone', $order_data['buyer']['phone_numbers'][0]['number']);
	$smarty->assign('event_name', $order->get('name'));
	$smarty->assign('event_date', $order->get('date'));
	$smarty->assign('event_venue', $venue);
	$smarty->assign('event_location', $location);
	$smarty->assign('ticket_section', $order->get('section'));
	$smarty->assign('ticket_row', $order->get('row'));
	$smarty->assign('ticket_seats', $order->get('seats'));
	$smarty->assign('ticket_type', $order->get('format'));
	$smarty->assign('order_status', $order_data['state']);
	$smarty->assign('order_subtotal', $order_data['subtotal']);
	$smarty->assign('order_shipping', $order_data['shipping']);
	$smarty->assign('order_service', $order_data['service_fee']);
	$smarty->assign('order_total', $order->get('total'));
	$smarty->assign('transactions', $order_data['payments']);
	if($order->get('format') == 'Eticket') {
		$smarty->assign('ship_email', $order_data['shipment_snapshot'][0]['email_address']);
	} else {
		$smarty->assign('ship_method', $order_data['shipments'][0]['service_type_display']);
		$smarty->assign('ship_name', $order_data['shipments'][0]['shipment_snapshot']['name']);
		$smarty->assign('ship_address', $order_data['shipments'][0]['shipment_snapshot']['street_address']);
		$smarty->assign('ship_city', $order_data['shipments'][0]['shipment_snapshot']['locality']);
		$smarty->assign('ship_state', $order_data['shipments'][0]['shipment_snapshot']['region']);
		$smarty->assign('ship_zipcode', $order_data['shipments'][0]['shipment_snapshot']['postal_code']);
	}
	if(!$has_refund) {
		// Show GameHedge Refund Link
	}
	$smarty->display('admin/orders_view.tpl');
	break;
case '':
	$page       = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
	$per_page   = 25;
	$orderClass = new Order;
	$orders     = $orderClass->get_list($page, $per_page);
	$pages      = ceil($orders['total'] / $per_page);
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
	$smarty->assign('refund', array('none' => 'Not Available', 'available' => 'Refund Available', 'requested' => 'Refund Requested', 'pending' => 'Refund Pending', 'sent' => 'Refunded'));
	$smarty->assign('url', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
	$smarty->assign('page', $page);
	$smarty->assign('pages', $pages);
	$smarty->display('admin/orders.tpl');
	break;
}
?>