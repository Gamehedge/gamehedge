<?php
/**
 * Handles Client Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/client.php';

class Client extends Base {
	public function __construct($id = null) {
		$this->model = new ClientModel;
		parent::__construct($id);
	}

	public function get_list($page, $per_page) {
		return $this->model->get_list($page, $per_page);
	}

	public function get_by_email($email) {
		$cryptClass = new Crypt;
		$data       = $this->model->get_by_email($email);
		if($data)
			$data['password'] = $cryptClass->decrypt($data['password']);
		return $data;
	}

	public function find($q, $page, $per_page) {
		return $this->model->find($q, $page, $per_page);
	}

	public function load($id) {
		parent::load($id);
		$cryptClass = new Crypt;
		$this->data['password'] = $cryptClass->decrypt($this->data['password']);
		$this->data['last_ip']  = !empty($this->data['last_ip']) ? long2ip($this->data['last_ip']) : '';
	}

	public function add($data) {
		if($id = parent::add($data)) {
			// Send Welcome Email
			return $id;
		} else {
			return false;
		}
	}

	public function te_to_gh($id) {
		return $this->model->get_by_teid($id);
	}

	protected function save() {
		$cryptClass       = new Crypt;
		$data             = $this->data;
		$data['password'] = $cryptClass->encrypt($data['password']);
		$data['last_ip']  = ip2long($data['last_ip']);
		return $this->model->save($data);
	}
}
