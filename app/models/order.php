<?php
/**
 * This Model handles Order Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class OrderModel extends Model {
	protected $table      = 'orders';
	protected $pk         = 'id';
	protected $pk_auto    = true;
	public $fields        = array('id'          => null,
                                'client_id'   => null,
                                'client_name' => null,
                                'order_id'    => null,
                                'name'        => null,
                                'home'        => null,
                                'away'        => null,
                                'date'        => null,
                                'location'    => null,
                                'section'     => null,
                                'row'         => null,
                                'seats'       => null,
                                'format'      => null,
                                'total'       => null,
                                'cost'        => null,
                                'order_data'  => null,
                                'ticket_data' => null,
                                'event_data'  => null,
                                'home_data'   => null,
                                'away_data'   => null,
                                'refund'      => null,
                                'created'     => null,
                                'modified'    => null);
	protected $field_map  = array('id'              => array('name' => 'id',
                                                           'type' => 'int'),
                                'client_id'       => array('name' => 'client_id',
                                                           'type' => 'int'),
                                'client_name'     => array('name' => 'client_name',
                                                           'type' => 'string'),
                                'te_order_id'     => array('name' => 'order_id',
                                                           'type' => 'int'),
                                'event_name'      => array('name' => 'name',
                                                           'type' => 'string'),
                                'event_home_team' => array('name' => 'home',
                                                           'type' => 'string'),
                                'event_away_team' => array('name' => 'away',
                                                           'type' => 'string'),
                                'event_date'      => array('name' => 'date',
                                                           'type' => 'string'),
                                'event_location'  => array('name' => 'location',
                                                           'type' => 'string'),
                                'ticket_section'  => array('name' => 'section',
                                                           'type' => 'string'),
                                'ticket_row'      => array('name' => 'row',
                                                           'type' => 'string'),
                                'ticket_seats'    => array('name' => 'seats',
                                                           'type' => 'string'),
                                'ticket_format'   => array('name' => 'format',
                                                           'type' => 'string'),
                                'total'           => array('name' => 'total',
                                                           'type' => 'int'),
                                'cost'            => array('name' => 'cost',
                                                           'type' => 'int'),
                                'order_data'      => array('name' => 'order_data',
                                                           'type' => 'string'),
                                'ticket_data'     => array('name' => 'ticket_data',
                                                           'type' => 'string'),
                                'event_data'      => array('name' => 'event_data',
                                                           'type' => 'string'),
                                'home_team_data'  => array('name' => 'home_data',
                                                           'type' => 'string'),
                                'away_team_data'  => array('name' => 'away_data',
                                                           'type' => 'string'),
                                'refund_status'   => array('name' => 'refund',
                                                           'type' => 'string'),
                                'create_date'     => array('name' => 'created',
                                                           'type' => 'datetime'),
                                'modified_date'   => array('name' => 'modified',
                                                           'type' => 'timestamp'));
	protected $refund_map = array('none' => 'Not Available', 'available' => 'Refund Available', 'requested' => 'Refund Requested','pending' => 'Refund Pending', 'sent' => 'Refunded');
	public function __construct() {
		parent::__construct();
	}

	public function get_list($page, $per_page) {
        $low_limit = 0;
		$llimit = $per_page * ($page - 1);
		$hlimit = $low_limit + $per_page;
		$stmt   = $this->db->prepare('SELECT SQL_CALC_FOUND_ROWS c.id, c.name, c.email, o.* FROM clients c, orders o WHERE o.client_id = c.te_uid ORDER BY o.id DESC LIMIT :llimit, :hlimit');
		$stmt->bindValue(':llimit', $llimit, PDO::PARAM_INT);
		$stmt->bindValue(':hlimit', $hlimit, PDO::PARAM_INT);
		$stmt->execute();
		$total_records = $this->db->query('SELECT FOUND_ROWS();')->fetch(PDO::FETCH_COLUMN);
		if($stmt->rowCount() > 0) {
			$orders = array();
			while($order = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if(isset($order['refund_status'])){
                    $order['refund_text'] = $this->refund_map[$order['refund_status']];
                }
				array_push($orders, $order);
			}
			return array('orders' => $orders,
                   'total'  => $total_records);
		} else {
			return false;
		}
	}

	public function get_list_by_customer($id, $page, $per_page) {
        $low_limit = 0;
		$llimit = $per_page * ($page - 1);
		$hlimit = $low_limit + $per_page;
		$stmt   = $this->db->prepare('SELECT SQL_CALC_FOUND_ROWS c.id, c.name, c.email, o.* FROM clients c, orders o WHERE o.client_id = c.te_uid AND c.id = :id ORDER BY o.id DESC LIMIT :llimit, :hlimit');
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		$stmt->bindValue(':llimit', $llimit, PDO::PARAM_INT);
		$stmt->bindValue(':hlimit', $hlimit, PDO::PARAM_INT);
		$stmt->execute();
		$total_records = $this->db->query('SELECT FOUND_ROWS();')->fetch(PDO::FETCH_COLUMN);
		if($stmt->rowCount() > 0) {
			$orders = array();
			while($order = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$order['refund_text'] = $this->refund_map[$order['refund_status']];
				array_push($orders, $order);
			}
			return array('orders' => $orders,
                   'total'  => $total_records);
		} else {
			return false;
		}
	}

	public function get($id) {
		$data = parent::get($id);
		if($data) {
            if($data['refund']){
                $data['refund_txt'] = $this->refund_map[$data['refund']];
            }
			$data['total']      = round($data['total'] / 100, 2);
			$data['cost']       = round($data['cost'] / 100, 2);
			return $data;
		} else {
			return false;
		}
	}

	public function save($data) {
		$data['total'] = $data['total'] * 100;
		$data['cost']  = $data['cost'] * 100;
		return parent::save($data);
	}
}
