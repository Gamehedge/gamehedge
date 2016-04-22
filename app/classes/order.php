<?php
/**
 * Handles Order Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/classes/base.php';
require_once 'app/models/order.php';

class Order extends Base {
	public function __construct($id = null) {
		$this->model = new OrderModel;
		parent::__construct($id);
	}

	public function get_list($page = 1, $per_page = 25) {
		return $this->model->get_list($page, $per_page);
	}

	public function get_list_by_customer($id, $page = 1, $per_page = 25) {
		$data = $this->model->get_list_by_customer($id, $page, $per_page);
		if(isset($data['orders']) && is_array($data['orders'])) {
			foreach($data['orders'] AS $i => $o) {
				$lparts                               = explode('|', $o['event_location']);
				$data['orders'][$i]['event_venue']    = $lparts[0];
				$data['orders'][$i]['event_location'] = $lparts[1];
				$data['orders'][$i]['total']          = $o['total'] / 100;
			}
		}
		return $data;
	}
}