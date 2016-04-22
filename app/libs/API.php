<?php
require_once 'Config.php';
use \Firebase\JWT\JWT;

class API {
	private $method   = '';
	private $endpoint = '';
	private $args     = Array();
	private $file     = null;
	private $id       = null;
	private $verb     = '';

	/**
	 * Constructor: __construct
	 * Allow for CORS, assemble and pre-process the data
	 */
	public function __construct($request) {
		if(!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
			$_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
		}
		header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
		header("Access-Control-Allow-Headers: Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
		header("Content-Type: application/json");
		$this->args     = explode('/', rtrim($request, '/'));
		$this->endpoint = array_shift($this->args);
		$this->id       = isset($this->args[0]) && is_numeric($this->args[0]) ? array_shift($this->args) : null;
		$this->verb     = count($this->args) > 0 ? array_shift($this->args) : '';
		$this->method   = $_SERVER['REQUEST_METHOD'];
		if($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
			if($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
				$this->method = 'DELETE';
			} else if($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
				$this->method = 'PUT';
			} else {
				throw new Exception("Unexpected Header");
			}
		}
		switch($this->method) {
		case 'POST':
			$this->request = $this->_clean_inputs($_POST);
			break;
		case 'GET':
		case 'DELETE':
			$this->request = $this->_clean_inputs($_GET);
			break;
		case 'PUT':
			$this->file = file_get_contents('php://input');
			if($this->is_json($this->file)) {
				$data = json_decode($this->file, true);
				if(isset($data['data'])) {
					$this->request = $data['data'];
				} else {
					$this->request = $data;
				}
			} else {
				parse_str($this->file, $this->request);
			}
			break;
		case 'OPTIONS':
			die('ok');
			break;
		default:
			$this->_response('Invalid Method', 405);
			break;
		}
	}

	public function process_api() {
		$urlParts = parse_url($_SERVER['HTTP_ORIGIN']);
		if(isset($urlParts['host'])) {
			$origin = $urlParts['host'];
		} else {
			$origin = $_SERVER['HTTP_ORIGIN'];
		}
		if(!array_key_exists('api_key', $this->request) || $this->request['api_key'] == '') {
			return $this->_response('Unable to Authorize Request', 403);
		} else {
			if(!$this->_validate_key($origin, $this->request['api_key'])) {
				return $this->_response('Unable to Authorize Request', 403);
			}
		}
		unset($this->request['api_key']);
		if(!file_exists(dirname(__FILE__) . '/../resources/' . ucwords($this->endpoint) . '.php')) {
			return $this->_response(array('message' => 'Invalid Resource.'), 404);
		}
		require_once 'app/resources/' . ucwords($this->endpoint) . '.php';
		$resourceName   = ucwords($this->endpoint) . 'Resource';
		$resourceClient = new $resourceName($this->id, $this->verb, $this->args, $this->method, $this->request);
		$response       = $resourceClient->run();
		return $this->_response($response['data'], $response['code']);
	}

	private function _validate_key($hostname, $key) {
		/*
		$tokenData = array('iss'  => 'http://' . $_SERVER['SERVER_NAME'], // Issuer
                       'iat'  => time(), // Issued At Time
                       'exp'  => strtotime('+365 day'), // Expires in 2 days
                       'data' => array('hostname' => 'www.gamehedge.com'));
		$token     = JWT::encode($tokenData, Config::get_signature());
		echo $token . "\n";
		*/
		$tokenData = JWT::decode($key, Config::get_signature(), array('HS256'));
		$tokenData = (array) $tokenData;
		if($hostname == $tokenData['data']->hostname) {
			return true;
		} else {
			return false;
		}
	}

	protected function is_json($string) {
		json_decode($string);
		return (json_last_error() == JSON_ERROR_NONE);
	}

	private function _response($data, $status = 200) {
		header("HTTP/1.1 " . $status . " " . $this->_request_status($status));
		return json_encode($data);
	}

	private function _clean_inputs($data) {
		$cleanInput = Array();
		if(is_array($data)) {
			foreach($data as $k => $v) {
				$cleanInput[$k] = $this->_clean_inputs($v);
			}
		} else {
			$cleanInput = trim(strip_tags($data));
		}
		return $cleanInput;
	}

	private function _request_status($code) {
		$status = array(200 => 'OK',
                    201 => 'Content Created',
                    202 => 'Request Has Been Accepted',
                    204 => 'No Content',
                    401 => 'Unauthorized',
                    403 => 'Forbidden',
                    404 => 'Not Found',
                    405 => 'Method Not Allowed',
                    500 => 'Internal Server Error',
                    501 => 'Not Implemented');
		return ($status[$code]) ? $status[$code] : $status[500];
	}
}