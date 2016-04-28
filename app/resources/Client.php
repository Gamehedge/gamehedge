<?php
require_once 'Resource.php';
require_once 'app/libs/Config.php';
require_once 'app/libs/Utility.php';
use \TicketEvolution\Client as TEvoClient;
use \Firebase\JWT\JWT;
use \GuzzleHttp\Exception\RequestException;
use \GuzzleHttp\Exception\ClientException;

class ClientResource extends Resource {
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
                     'code' => 400);
			} else {
				return $this->{$this->verb}();
			}
		}
		switch($this->method) {
		case 'GET':
			break;
		case 'POST':
			break;
		case 'PUT':
			break;
		case 'DELETE':
			break;
		}
	}

	public function shipping() {
		$response = array('data' => array('status'  => 0,
                                      'message' => 'Invalid Method.'),
                      'code' => 405);
		switch($this->method) {
		case 'POST':
			$address  = array('label'            => 'Shipping Address',
                        'name'             => $this->request['firstname'] . ' ' . $this->request['lastname'],
                        'street_address'   => $this->request['address1'],
                        'extended_address' => $this->request['address2'],
                        'locality'         => $this->request['city'],
                        'region'           => $this->request['state'],
                        'postal_code'      => $this->request['zipcode'],
                        'country_code'     => 'US');
			try {
                $te_data  = $this->add_address($address);
                return array('data' => array('status'  => 1,
                                       'message' => 'Success',
                                       'payload' => $te_data['addresses'][0]),
                       'code' => 200);
            } catch (RequestException $e) {
                $responseCatchString = $e->getResponse()->getBody()->getContents();
                return array('data' => array('status'  => 0,
                                         'message' => $responseCatchString),
                         'code' => 200);
            }
            
			break;
		case 'PUT':
			break;
		}
	}

	public function billing() {
		$response = array('data' => array('status'  => 0,
                                      'message' => 'Invalid Method.'),
                      'code' => 405);
		switch($this->method) {
		case 'POST':
			$address  = array('label'            => 'Billing Address',
                        'name'             => $this->request['firstname'] . ' ' . $this->request['lastname'],
                        'street_address'   => $this->request['address1'],
                        'extended_address' => $this->request['address2'],
                        'locality'         => $this->request['city'],
                        'region'           => $this->request['state'],
                        'postal_code'      => $this->request['zipcode'],
                        'country_code'     => 'US');
			try {
                $te_data  = $this->add_address($address);
                return array('data' => array('status'  => 1,
                                       'message' => 'Success',
                                       'payload' => $te_data['addresses'][0]),
                       'code' => 200);
            } catch (RequestException $e) {
                $responseCatchString = $e->getResponse()->getBody()->getContents();
                return array('data' => array('status'  => 0,
                                         'message' => $responseCatchString),
                         'code' => 200);
            }
            
			break;
		case 'PUT':
			break;
		}
	}

	public function creditcard() {
		$response = array('data' => array('status'  => 0,
                                      'message' => 'Invalid Method.'),
                      'code' => 405);
		switch($this->method) {
		case 'POST':
			$ip_address = Utility::get_ip_address();
			$creditcard = array('address_id'        => (int)$this->request['address_id'],
                          'number'            => $this->request['card_number'],
                          'expiration_month'  => $this->request['card_exp_month'],
                          'expiration_year'   => $this->request['card_exp_year'],
                          'ip_address'        => $ip_address,
                          'phone_number_id'   => (int)$this->request['phone_id'],
                          'verification_code' => $this->request['card_cvv2']);
			try {
                $te_data    = $this->teClient->createClientCreditCards(['client_id' => (int)$this->request['client_id'], 'credit_cards' => array($creditcard)]);
                if(isset($te_data['status']) && $te_data['status'] == 0) {
                    return array('data' => array('status'  => 0,
                                         'message' => $te_data['error']),
                         'code' => 200);
                } else {
                    return array('data' => array('status'  => 1,
                                         'message' => 'Success',
                                         'payload' => $te_data['credit_cards'][0]),
                         'code' => 200);
                }
            } catch (RequestException $e) {
                $responseCatchString = $e->getResponse()->getBody()->getContents();
                $responseCatchArray = json_decode($responseCatchString, true );
                return array('data' => array('status'  => 0,
                                         'message' => $responseCatchArray["error"]),
                         'code' => 200);
            }
            
			break;
		case 'PUT':
			break;
		}
	}

	private function add_address($address) {
		return $this->teClient->createClientAddresses(['client_id' => (int)$this->request['client_id'], 'addresses' => array($address)]);
	}
}