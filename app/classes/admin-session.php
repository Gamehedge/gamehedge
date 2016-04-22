<?php
/**
 * Handles Admin Session Management Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/admin-session.php';

class AdminSession extends Base {
	public function __construct($id = null) {
		$this->model = new AdminSessionModel;
		parent::__construct($id);
	}

	public function load($id) {
		parent::load($id);
		$this->data['data'] = unserialize($this->data['data']);
	}

	public function get_data_userid() {
		if(!empty($this->data['data']['user_id']) && $this->data['data']['user_id'] > 0) {
			return $this->data['data']['user_id'];
		} else {
			return false;
		}
	}
	public function set_data_userid($uid) {
		$this->data['data']['user_id'] = $uid;
		return $this->save();
	}

	public function validate($sess_id) {
		if($this->model->get($sess_id)) {
			return true;
		} else {
			return false;
		}
	}

	protected function save() {
		$data         = $this->data;
		$data['data'] = serialize($data['data']);
		return $this->model->save($data);
	}
}