<?php
require_once 'app/classes/client.php';
require_once 'app/classes/order.php';
require_once 'app/libs/DB.php';
use \TicketEvolution\Client as TEvoClient;

$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                            'apiVersion' => Config::te_version(),
                            'apiToken'   => Config::te_api_token(),
                            'apiSecret'  => Config::te_api_secret()]);

$access = $admin->get_access();
if(!isset($access['reports']) || $access['reports'] == 0) {
	die('You are not Authorized to View this Area');
}
switch($verb) {
case 'sales-summary':
case 'sales-detail':
case 'sales-profit':
case 'customer-report':
	// Validate Form Input
	$error = array();
	switch($verb) {
	case 'sales-summary':
		if(!empty($request['order-date-start']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['order-date-start'])) {
			$error[] = 'Invalid Sales Start Date';
		}
		if(!empty($request['order-date-end']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['order-date-end'])) {
			$error[] = 'Invalid Sales End Date';
		}
		if(!empty($request['event-date-start']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['event-date-start'])) {
			$error[] = 'Invalid Event Start Date';
		}
		if(!empty($request['event-date-start']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['event-date-start'])) {
			$error[] = 'Invalid Event Start Date';
		}
		if(!empty($request['home-team']) && !preg_match('/^[a-zA-Z\s]+$/', $request['home-team'])) {
			$error[] = 'Invalid Characters in Home Team Name (A-Z and Spaces only)';
		}
		if(!empty($request['venue']) && !preg_match('/^[a-zA-Z\s-&]+$/', $request['venue'])) {
			$error[] = 'Invalid Characters in Venue Name (A-Z, &, - only)';
		}
		break;
	case 'sales-detail':
	case 'sales-profit':
		if(!empty($request['event-date']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['event-date'])) {
			$error[] = 'Invalid Event Date';
		}
		break;
	case 'customer-report':
		if(!empty($request['order-date-start']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['order-date-start'])) {
			$error[] = 'Invalid Sales Start Date';
		}
		if(!empty($request['order-date-end']) && !preg_match('/[0-9]{4}-[0-9]{2}-[0-9]{2}/', $request['order-date-end'])) {
			$error[] = 'Invalid Sales End Date';
		}
		if(!empty($request['customer-name']) && !preg_match('/^[a-zA-Z\s]+$/', $request['customer-name'])) {
			$error[] = 'Invalid Characters in Customer Name (A-Z and Spaces only)';
		}
		break;
	}
	if(count($error)) {
		echo implode('<br />', $error);
		die();
	}
	// Create Filters
	$filter = array();
	switch($verb) {
	case 'sales-summary':
		if(!empty($request['order-date-start']) && !empty($request['order-date-end'])) {
			$filter[] = "AND DATE(create_date) BETWEEN '" . $request['order-date-start'] . "' AND '" . $request['order-date-end'] . "'";
		} else if(!empty($request['order-date-start'])) {
			$filter[] = "AND DATE(create_date) >= '" . $request['order-date-start'] . "'";
		} else if(!empty($request['order-date-end'])) {
			$filter[] = "AND DATE(create_date) <= '" . $request['order-date-end'] . "'";
		}
		if(!empty($request['event-date-start']) && !empty($request['event-date-end'])) {
			$filter[] = "AND DATE(event_date) BETWEEN '" . $request['event-date-start'] . "' AND '" . $request['event-date-end'] . "'";
		} else if(!empty($request['event-date-start'])) {
			$filter[] = "AND DATE(event_date) >= '" . $request['event-date-start'] . "'";
		} else if(!empty($request['event-date-end'])) {
			$filter[] = "AND DATE(event_date) <= '" . $request['event-date-end'] . "'";
		}
		if(!empty($request['home-team'])) {
			$filter[] = "AND event_home_team LIKE '%" . $request['home-team'] . "%'";
		}
		if(!empty($request['venue'])) {
			$filter[] = "AND event_location LIKE '%" . $request['venue'] . "%'";
		}
		break;
	case 'sales-detail':
	case 'sales-profit':
		if(!empty($request['event-date'])) {
			$filter[] = "AND DATE(event_date) = '" . $request['event-date'] . "'";
		}
		break;
	case 'customer-report':
		if(!empty($request['order-date-start']) && !empty($request['order-date-end'])) {
			$filter[] = "AND DATE(create_date) BETWEEN '" . $request['order-date-start'] . "' AND '" . $request['order-date-end'] . "'";
		} else if(!empty($request['order-date-start'])) {
			$filter[] = "AND DATE(create_date) >= '" . $request['order-date-start'] . "'";
		} else if(!empty($request['order-date-end'])) {
			$filter[] = "AND DATE(create_date) <= '" . $request['order-date-end'] . "'";
		}
		if(!empty($request['customer-name'])) {
			$filter[] = "AND client_name LIKE '%" . $request['customer-name'] . "%'";
		}
		break;
	}
	$db  = DB::getInstance();
	try {
		$res = $db->query("SELECT * FROM orders WHERE 1=1 " . implode(' ', $filter) . " ORDER BY id ASC");
		if($res->rowCount() > 0) {
			$data = array();
			while($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$ticket_data = unserialize($row['ticket_data']);
				$order_data  = unserialize($row['order_data']);
				$lparts      = explode('|', $row['event_location']);
				$venue       = $lparts[0];
				$seats       = explode(', ', $row['ticket_seats']);
				$qty         = $row['ticket_seats'];
				$low_seat    = min($seats);
				$high_seat   = max($seats);
				$price       = $order_data['items'][0]['ticket_group']['retail_price'];
                $create_date = new DateTime($row['create_date'], new DateTimeZone('UTC'));
                $create_date->setTimezone(new DateTimeZone("America/New_York"));
				$tmp_array   = array($row['te_order_id'], $create_date->format('Y-m-d h:iA'), $row['event_name'], $row['event_home_team'], $row['event_away_team'], date('Y-m-d h:iA', strtotime($row['event_date'])), $venue, $row['ticket_section'], $row['ticket_row']);
				$header_row  = array('Order ID', 'Order Date', 'Event Name', 'Home Team', 'Away Team', 'Event Date', 'Venue', 'Section', 'Row');
				switch($verb) {
				case 'sales-summary':
					$service_fee  = $order_data['service_fee'];
					$shipping_fee = $order_data['shipping'];
					$tmp_array    = array_merge($tmp_array, array($price, $service_fee, $shipping_fee, $order_data['total']));
					$header_row   = array_merge($header_row, array('Sale Price Per', 'Service Fee', 'Shipping Fee', 'Total'));
					array_push($data, $tmp_array);
					break;
				case 'sales-detail':
					$tmp_array  = array_merge($tmp_array, array($order_data['buyer']['name'], $order_data['buyer']['email_addresses'][0]['address'], $qty, $price, $order_data['subtotal']));
					$header_row = array_merge($header_row, array('Customer Name', 'Customer Email', '# of Tickets', 'Sale Price Per', 'Ticket Total'));
					array_push($data, $tmp_array);
					break;
				case 'sales-profit':
					$tmp_array  = array_merge($tmp_array, array($order_data['buyer']['name'], $order_data['buyer']['email_addresses'][0]['address'], $qty, $price, $order_data['subtotal'], $ticket_data['office']['name'], $ticket_data['ticket_list'][0]['cost']));
					$header_row = array_merge($header_row, array('Customer Name', 'Customer Email', '# of Tickets', 'Sale Price Per', 'Ticket Total', 'Broker Name', 'Ticket Cost Per'));
					array_push($data, $tmp_array);
					break;
				case 'customer-report':
					if($ticket_data['format'] == 'Physical') {
						$address = $order_data['shipment_snapshot'][0]['name'] . ', ' . $order_data['shipment_snapshot'][0]['street_address'] . ', ' . $order_data['shipment_snapshot'][0]['locality'] . ', ' . $order_data['shipment_snapshot'][0]['region'] . ' ' . $order_data['shipment_snapshot'][0]['postal_code'];
					} else {
						$address = 'N/A ETicket';
					}
					$shipped    = $order_data['shipments'][0]['state'] == 'pending' ? 'N' : 'Y';
					$tmp_array  = array_merge($tmp_array, array($qty, $price, $order_data['subtotal'], $ticket_data['office']['name'], $ticket_data['ticket_list'][0]['cost'], $order_data['buyer']['name'], $address, $order_data['buyer']['phone_numbers'][0]['number'], $order_data['buyer']['email_addresses'][0]['address'], $order_data['payments'][0]['credit_card']['last_digits'], $shipped));
					$header_row = array_merge($header_row, array('# of Tickets', 'Sale Price Per', 'Ticket Total', 'Broker Name', 'Ticket Cost Per', 'Customer Name', 'Customer Address', 'Customer Phone', 'Customer Email', 'CC Last 4', 'Shipped'));
					array_push($data, $tmp_array);
					break;
				}
			}
			$csv = '"' . implode('","', $header_row) . '"' . "\n";
			foreach($data AS $d) {
				$csv .= '"' . implode('","', $d) . '"' . "\n";
			}
			header('Content-type: text/csv');
			header('Content-Disposition: attachment; filename=' . $verb . '.csv');
			header('Pragma: no-cache');
			header('Expires: 0');
			die($csv);
		} else {
			die('No results found.');
		}
	} catch(Exception $e) {
		echo $e->getMessage();
	}
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
	$smarty->display('admin/reports.tpl');
	break;
}
?>