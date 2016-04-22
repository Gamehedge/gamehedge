<?php
require_once 'Resource.php';
require_once 'app/libs/Config.php';
use \TicketEvolution\Client as TEvoClient;

class TicketResource extends Resource {
	public function __construct($id, $verb, $args, $method, $request) {
		parent::__construct($id, $verb, $args, $method, $request);
		$this->teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
                                      'apiVersion' => Config::te_version(),
                                      'apiToken'   => Config::te_api_token(),
                                      'apiSecret'  => Config::te_api_secret()]);
	}

	public function run() {
		if($this->verb != '') {
			if(!method_exists($this, $this->verb)) {
				return array('data' => array('message' => 'Invalid API Call: ' . $this->verb),
                     'code' => 404);
			} else {
				return $this->{$this->verb}();
			}
		}
		switch($this->method) {
		case 'GET':
			$data        = array();
			$num_tickets = 0;
			$tgroups     = $this->teClient->listTicketGroups(['event_id' => (int)$this->request['event_id'], 'order_by' => 'retail_price ASC']);
			foreach($tgroups['ticket_groups'] AS $tgData) {
				$tickets = $this->teClient->showTicketGroup(['ticket_group_id' => $tgData['id'], 'ticket_list' => true]);
				if($tickets['type'] != 'event')
					continue;
				$found_split = false;
				foreach($tgData['splits'] AS $s) {
					if($s == $this->request['qty']) {
						$split       = $s;
						$found_split = true;
						break;
					}
				}
				if(!$found_split)
					continue;
				$tickets = $tickets['ticket_list'];
				$groups  = array_chunk($tickets, $split);
				foreach($groups AS $tGroup) {
					if(count($tGroup) == $split) {
						$seats = '';
						$tids  = '';
						foreach($tGroup AS $tData) {
							$seats .= $tData['seat'] . ', ';
							$tids  .= $tData['id'] . ', ';
							$num_tickets++;
						}
						$data[] = array('tgroup_id'   => $tgData['id'],
                            'row'         => $tgData['row'],
                            'section'     => $tgData['section'],
                            'seat'        => rtrim($seats, ', '),
                            'eticket'     => $tgData['eticket'],
                            'price'       => $tgData['retail_price'],
                            'total_price' => $tgData['retail_price'] * $split,
                            'ticket_id'   => rtrim($tids, ', '));
					}
				}
			}
			return array('data' => array('status'      => 1,
                                   'message'     => 'OK',
                                   'tickets'     => $data,
                                   'num_tickets' => $num_tickets),
                   'code' => 200);
			break;
		default:
			return array('data' => array('message' => 'Method Not Supported.'),
                   'code' => 405);
			break;
		}
	}
	public function seats() {
		switch($this->method) {
		case 'GET':
			$seats  = array();
			$tickets = $this->teClient->showTicketGroup(['ticket_group_id' => (int)$this->request['tgroup'], 'ticket_list' => true]);
			$tickets = $tickets['ticket_list'];
			foreach($tickets AS $t) {
				if($t['state'] == 'available')
					array_push($seats, array('id' => $t['id'], 'seat' => $t['seat'], 'selected' => 0));
			}
			return array('data' => array('status'      => 1,
                                   'message'     => 'OK',
                                   'seats'       => $seats,
                                   'num_seats'   => count($seats)),
                   'code' => 200);
			break;
		default:
			return array('data' => array('message' => 'Method Not Supported.'),
                   'code' => 405);
			break;
		}
	}
}