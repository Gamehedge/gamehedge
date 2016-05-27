<?php
/**
 * Handles Performers Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/performer.php';

class Performer extends Base {
	public function __construct($id = null) {
		$this->model = new PerformerModel;
		parent::__construct($id);
	}
	public function te_to_gh($id) {
		return $this->model->get_by_teid($id);
	}
}
