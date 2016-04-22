<?php
use \Firebase\JWT\JWT;

class Resource {
	protected $id;
	protected $verb;
	protected $args;
	protected $method;
	protected $request;

	public function __construct($id, $verb, $args, $method, $request) {
		$this->id      = $id;
		$this->verb    = $verb;
		$this->args    = $args;
		$this->method  = $method;
		$this->request = $request;
	}

	protected function is_owned($obj) {
		return true;
		if(!array_key_exists('token', $this->request) || $this->request['token'] == '') {
			return false;
		} else {
			$token = $this->request['token'];
		}
		$oid = $obj->get_id();
		if(empty($oid)) {
			return false;
		}
		$objData = $obj->get();
		if(!$objData) {
			return false;
		}
		$tokenData = JWT::decode($token, Config::get_signature(), array('HS256'));
		$tokenData = (array) $tokenData;
		if($objData['account_id'] == $tokenData['data']->account_id) {
			return true;
		} else {
			return false;
		}
	}

	protected function validate_token() {
		return true;
		if(!array_key_exists('token', $this->request) || $this->request['token'] == '') {
			return false;
		} else {
			$token = $this->request['token'];
		}
		$tokenData = JWT::decode($token, Config::get_signature(), array('HS256'));
		if(!$tokenData) {
			// Someone tampered with our Token
			return false;
		}
		$tokenData = (array) $tokenData; // Convert from Object to Array
		if($tokenData['exp'] < time()) {
			// Access Token has expired
			return false;
		}
		$accountId = $tokenData['data']->account_id;
		$userId    = $tokenData['data']->user_id;
		$account   = new Account($accountId);
		if(!$accountData = $account->get()) {
			// Unable to get Account
			return false;
		}
		$user = new User($userId);
		if(!$userData = $user->get()) {
			// Unable to get User
			return false;
		}
		$response = array('account'  => $accountData,
                      'user'     => $userData,
                      'is_admin' => $tokenData['data']->is_admin);
		return $response;
	}
}