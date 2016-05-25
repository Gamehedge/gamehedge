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
}
