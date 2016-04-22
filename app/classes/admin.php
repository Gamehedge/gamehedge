<?php
/**
 * Handles Admin Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/admin.php';
require_once 'app/libs/Crypt.php';

class Admin extends Base {
	public function __construct($id = null) {
		$this->model = new AdminModel;
		$this->crypt = new Crypt;
		parent::__construct($id);
	}

	public function get_access() {
		return $this->data['access'];
	}

	public function get_by_email($email) {
		$cryptClass = new Crypt;
		$data       = $this->model->get_by_email($email);
		if($data)
			$data['password'] = $cryptClass->decrypt($data['password']);
		return $data;
	}

	public function get_by_username($username) {
		return $this->model->get_by_username($username);
	}

	public function get_list() {
		return $this->model->get_list();
	}

	public function login($username, $password) {
		$admin_data = $this->model->get_by_username($username);
		if($admin_data) {
			if($this->crypt->decrypt($admin_data['password']) == $password) {
				return $admin_data;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public function load($id) {
		parent::load($id);
		$this->data['password'] = $this->crypt->decrypt($this->data['password']);
		$this->data['last_ip']  = long2ip($this->data['last_ip']);
	}

	public function add($data) {
		if(empty($data['firstname']) || empty($data['lastname']) || empty($data['email']) || empty($data['username']) || empty($data['password']) || empty($data['confirm_password'])) {
			return 'All fields are required.';
		}
		if($data['password'] != $data['confirm_password']) {
			return 'Confirmation Password does not match password.';
		}
		$adata = $this->get_by_username($data['username']);
		if($adata) {
			return 'The username you requested already exists.';
		}
		unset($data['confirm_password']);
		if($id = parent::add($data)) {
			// Send Welcome Email
			return $id;
		} else {
			return false;
		}
	}

	protected function save() {
		$data             = $this->data;
		$data['password'] = $this->crypt->encrypt($data['password']);
		$data['last_ip']  = ip2long($data['last_ip']);
		return $this->model->save($data);
	}
}