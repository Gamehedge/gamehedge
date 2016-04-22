<?php
/**
 * Handles Session Management Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/session.php';

class Session extends Base {
	public function __construct($id = null) {
		$this->model = new SessionModel;
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

	public function get_data_order() {
		if(isset($this->data['data']['order'])) {
			return $this->data['data']['order'];
		} else {
			return false;
		}
	}
	public function set_data_order($order) {
		$this->data['data']['order'] = $order;
		return $this->save();
	}

	public function clear_data_order() {
		unset($this->data['data']['order']);
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