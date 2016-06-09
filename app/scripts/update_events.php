<?php 
	require_once 'app/classes/event.php';
	require_once 'app/libs/Config.php';

	use TicketEvolution\Client as TEvoClient;

	// Require Composer’s autoloader
	require 'vendor/autoload.php';

	$teClient = new TEvoClient(['baseUrl'    => Config::te_url(),
	                            'apiVersion' => Config::te_version(),
	                            'apiToken'   => Config::te_api_token(),
	                            'apiSecret'  => Config::te_api_secret()]);

	$query  = array(//'performer_id'      => 16425,//$_GET["id"],
        'min_and_max_price' => "true",
        'category_id'       => Config::te_categoryid(),
        'page'              => 1,//(int)$_GET["page"],
        'per_page'          => 100000,//(int)$_GET["per_page"],
        //'occurs_at.gte'     => $_GET["actual_date"],
        //'order_by'          => 'events.occurs_at ASC, events.popularity_score DESC');
        );
    $e_data = $teClient->listEvents($query);
    $data = [];
    $index = 0;
    foreach($e_data['events'] AS $tevo_event) {
        $event = new Event;
        $test = $event->te_to_gh($tevo_event["id"]);
        if($test == false){
            $date = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $tevo_event["occurs_at"])));
            if(count($tevo_event["performances"]) == 2){
                if($tevo_event["performances"][0]["primary"] == true){
                    $eventData = array('te_uid' => $tevo_event["id"],
                    'te_performer_home_id' => $tevo_event["performances"][0]["performer"]["id"],
                    'te_performer_visit_id' => $tevo_event["performances"][1]["performer"]["id"],
                    'data_event' => json_encode($tevo_event),
                    'te_date' => $date,
                    );
                }
                else{
                    $eventData = array('te_uid' => $tevo_event["id"],
                    'te_performer_home_id' => $tevo_event["performances"][1]["performer"]["id"],
                    'te_performer_visit_id' => $tevo_event["performances"][0]["performer"]["id"],
                    'data_event' => json_encode($tevo_event),
                    'te_date' => $date,
                    );
                }
            }
            else{
                $eventData = array('te_uid' => $tevo_event["id"],
                'te_performer_home_id' => $tevo_event["performances"][0]["performer"]["id"],
                'data_event' => json_encode($tevo_event),
                'te_date' => $date,
                );
            }
            $eventId = $event->add($eventData);
        }
    }
?>