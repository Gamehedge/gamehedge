<?php
/**
 * Our Base Class
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/client.php';

class Base {
	protected $model;
	protected $data = array();

	public function __construct($id = null) {
		if(!is_null($id)) {
			$this->load($id);
		}
	}

	public function load($id) {
		$this->data = $this->model->get($id);
	}

	public function add($data) {
		$this->data = $data;
		if($id = $this->save()) {
			return $id;
		} else {
			return false;
		}
	}

	public function delete() {
		return $this->model->delete($this->data['id']);
	}

	public function get($key) {
		if(in_array($key, array_keys($this->data))) {
			return $this->data[$key];
		} else {
			return -1;
		}
	}

	public function set($key, $value) {
		if(in_array($key, array_keys($this->data))) {
			$this->data[$key] = $value;
		}
		return $this->save();
	}

	protected function save() {
		return $this->model->save($this->data);
	}
}