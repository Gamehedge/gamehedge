<?php
/**
 * Handles Client Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/event.php';

class Event extends Base {
	public function __construct($id = null) {
		$this->model = new EventModel;
		parent::__construct($id);
	}
	public function te_to_gh($id) {
		return $this->model->get_by_teid($id);
	}
	public function get_list($query) {
		return $this->model->get_list($query);
	}
}
