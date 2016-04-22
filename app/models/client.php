<?php
/**
 * This Model handles Client Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class ClientModel extends Model {
	protected $table     = 'clients';
	protected $pk        = 'id';
	public $fields       = array('id'        => null,
                               'name'      => null,
                               'email'     => null,
                               'password'  => null,
                               'te_uid'    => null,
                               'optin'     => null,
                               'last_ip'   => null,
                               'last_date' => null,
                               'created'   => null,
                               'modified'  => null);
	protected $field_map = array('id'              => array('name' => 'id',
                                                          'type' => 'int'),
                               'name'            => array('name' => 'name',
                                                          'type' => 'string'),
                               'email'           => array('name' => 'email',
                                                          'type' => 'string'),
                               'password'        => array('name' => 'password',
                                                          'type' => 'string'),
                               'te_uid'          => array('name' => 'te_uid',
                                                          'type' => 'int'),
                               'optin'           => array('name' => 'optin',
                                                          'type' => 'int'),
                               'last_login_ip'   => array('name' => 'last_ip',
                                                          'type' => 'string'),
                               'last_login_date' => array('name' => 'last_date',
                                                          'type' => 'datetime'),
                               'create_date'     => array('name' => 'created',
                                                          'type' => 'datetime'),
                               'modified_date'   => array('name' => 'modified',
                                                          'type' => 'timestamp'));
	public function __construct() {
		parent::__construct();
	}

	public function get_list($page, $per_page) {
		$llimit = $per_page * ($page - 1);
		$hlimit = $llimit + $per_page;
		$stmt   = $this->db->prepare('SELECT SQL_CALC_FOUND_ROWS id, name, email, te_uid, create_date FROM clients ORDER BY name ASC LIMIT :llimit, :hlimit');
		$stmt->bindValue(':llimit', $llimit);
		$stmt->bindValue(':hlimit', $hlimit);
		$stmt->execute();
		$total_records = $this->db->query('SELECT FOUND_ROWS();')->fetch(PDO::FETCH_COLUMN);
		if($stmt->rowCount() > 0) {
			$clients = array();
			while($client = $stmt->fetch(PDO::FETCH_ASSOC)) {
				array_push($clients, $client);
			}
			return array('clients' => $clients,
                   'total'   => $total_records);
		} else {
			return false;
		}
	}

	public function get_by_email($email) {
		$stmt = $this->db->prepare('SELECT ' . implode(array_keys($this->field_map), ', ') . ' FROM ' . $this->table . ' WHERE email = :un');
		$stmt->bindValue(':un', $email, PDO::PARAM_STR);
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			$data   = array();
			foreach($result AS $k => $v) {
				$data[$this->field_map[$k]['name']] = $v;
			}
			return $data;
		} else {
			return false;
		}
	}

	public function find($q, $page, $per_page) {
		$llimit = $per_page * ($page - 1);
		$hlimit = $llimit + $per_page;
		$stmt   = $this->db->prepare('SELECT SQL_CALC_FOUND_ROWS id, name, email, te_uid, create_date FROM clients WHERE name LIKE :qname OR email LIKE :qemail ORDER BY name ASC LIMIT :llimit, :hlimit');
		$stmt->bindValue(':qname', '%' . $q . '%', PDO::PARAM_STR);
		$stmt->bindValue(':qemail', '%' . $q . '%', PDO::PARAM_STR);
		$stmt->bindValue(':llimit', $llimit, PDO::PARAM_INT);
		$stmt->bindValue(':hlimit', $hlimit, PDO::PARAM_INT);
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$clients = array();
			while($client = $stmt->fetch(PDO::FETCH_ASSOC)) {
				array_push($clients, $client);
			}
			return array('clients' => $clients,
                   'total'   => $total_records);
		} else {
			return false;
		}
	}

	public function get_by_teid($id) {
		$stmt = $this->db->prepare("SELECT " . $this->pk . " FROM " . $this->table . " WHERE te_uid = :teid");
		$stmt->bindValue(':teid', $id, PDO::PARAM_INT);
		$stmt->execute();
		if($stmt->rowCount() < 1) {
			return false;
		} else {
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$uid = $row['id'];
			return $uid;
		}
	}
}
