<?php
require_once 'Resource.php';
require_once 'app/libs/Config.php';
use \TicketEvolution\Client as TEvoClient;

class SearchResource extends Resource {
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
			$type  = empty($this->request['t']) ? 'f' : $this->request['t'];
			$error = array();
			if($type == 't') { // Team Search
				if(empty($this->request['q'])) {
					$error[] = 'Missing search Terms.';
				}
				if(count($error) > 0) {
					return array('data' => array('message' => implode('<br />', $error),
                                       'status'  => 0),
                       'code' => 406);
				}
				$events_data = $this->teClient->searchEvents(['q' => $this->request['q']]);
				$events      = array();
				foreach($events_data['events'] AS $i => $event) {
					if($event['category']['id'] != Config::te_categoryid()) {
						unset($events_data['events'][$i]);
					}
				}
			} else if($type == 'f') {
				ini_set('max_execution_time', 300);
				ini_set('memory_limit', '1024M');
				// Search for the Team
				$query       = array('q'           => $this->request['q'],
                             'category_id' => Config::te_categoryid(),
                             'page'        => 1,
                             'per_page'    => 100,
                             'order_by'    => 'events.occurs_at ASC, events.popularity_score DESC');
				$events_data = $this->teClient->listEvents($query);
				$events      = $events_data['events'];
				$num_events  = $events_data['total_entries'];
				if($num_events < 1) {
					// Search for Venue
					$venues_data = $this->teClient->searchVenues(['q' => $this->request['q']]);
					foreach($venues_data['venues'] AS $venue) {
						$query       = array('venue_id'    => (int)$venue['id'],
                                 'category_id' => Config::te_categoryid(),
                                 'page'        => 1,
                                 'per_page'    => 100,
                                 'order_by'    => 'events.occurs_at ASC, events.popularity_score DESC');
						$events_data = $this->teClient->listEvents($query);
						foreach($events_data['events'] AS $i => $event) {
							if($event['category']['id'] != Config::te_categoryid()) {
								unset($events_data['events'][$i]);
							}
						}
						$events      = array_merge($events, $events_data['events']);
						$num_events += $events_data['total_entries'];
					}
				}
				foreach($events AS $i => $e) {
					if($e.available_count < 1)
						continue;
					/*
					$tgdata = $this->teClient->listTicketGroups(['event_id' => (int)$e['id'], 'order_by' => 'retail_price']);
					if($tgdata['total_entries'] == 0) {
						unset($events[$i]);
						continue;
					}
					foreach($tgdata['ticket_groups'] AS $tg) {
						if($tg['type'] != 'event')
							continue;
						$events[$i]['low_price'] = ceil($tg['retail_price']);
						break;
					}
					*/
					$p_list = array();
					foreach($e['performances'] AS $p) {
						array_push($p_list, '<a href="/performer/' . $p['performer']['id'] . '/' . $p['performer']['slug'] . '" title="' . $p['performer']['name'] . '">' . $p['performer']['name'] . '</a>');
					}
					$events[$i]['name']      = implode(' at ', $p_list);
					$events[$i]['occurs_at'] = strtotime($e['occurs_at']) * 1000;
				}
				return array('data' => array('status'       => 1,
                                     'message'      => 'OK',
                                     'events'       => json_encode($events),
                                     'current_page' => $events_data['current_page'],
                                     'per_page'     => $events_data['per_page'],
                                     'num_events'   => $num_events),
                     'code' => 200);
			} else {
				if(empty($this->request['city'])) {
					$error[] = 'Missing a city.';
				}
				if(empty($this->request['state'])) {
					$error[] = 'Missing a state.';
				}
				if(empty($this->request['category']) || !is_numeric($this->request['category'])) {
					$error[] = 'Missing or invalid category.';
				}
				if(count($error) > 0) {
					return array('data' => array('message' => implode('<br />', $error),
                                       'status'  => 0),
                       'code' => 406);
				}
				$city        = $this->request['city'];
				$state       = $this->request['state'];
				$category    = $this->request['category'];
				$sc          = $city . ', ' . $state;
				$date        = new DateTime('2016-01-20', new DateTimeZone('America/New_York'));
				$dateSearch  = $date->format(DateTime::ISO8601);
				$query       = array('city_state'  => $sc,
                             'category_id' => $category,
                             'within'      => 50,
                             'page'        => 1,
                             'per_page'    => 25,
                             'order_by'    => 'events.occurs_at ASC, events.popularity_score DESC');
				$events_data = $this->teClient->listEvents($query);
			}
			$events       = json_encode($events_data['events']);
			$current_page = $events_data['current_page'];
			$per_page     = $events_data['per_page'];
			$num_events   = $events_data['total_entries'];
			return array('data' => array('status'       => 1,
                                   'message'      => 'OK',
                                   'events'       => $events,
                                   'current_page' => $current_page,
                                   'per_page'     => $per_page,
                                   'num_events'   => $num_events),
                   'code' => 200);
			break;
		default:
			return array('data' => array('status'  => 0,
                                   'message' => 'Method Not Supported.'),
                   'code' => 405);
			break;
		}
	}
}
