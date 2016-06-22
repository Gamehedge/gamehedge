<?php
/**
 * This Model handles Admin Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class AdminModel extends Model {
	protected $table     = 'admin';
	protected $pk        = 'id';
	protected $sequence  = 'admin_sequence2';
	public $fields       = array('id'        => null,
                               'username'  => null,
                               'password'  => null,
                               'firstname' => null,
                               'lastname'  => null,
                               'email'     => null,
                               'last_ip'   => null,
                               'last_date' => null,
                               'created'   => null,
                               'modified'  => null);
	protected $unique = array('email');
	protected $field_map = array('id'              => array('name' => 'id',
                                                          'type' => 'int'),
                               'username'        => array('name' => 'username',
                                                          'type' => 'string'),
                               'password'        => array('name' => 'password',
                                                          'type' => 'string'),
                               'firstname'       => array('name' => 'firstname',
                                                          'type' => 'string'),
                               'lastname'        => array('name' => 'lastname',
                                                          'type' => 'string'),
                               'email'           => array('name' => 'email',
                                                          'type' => 'string'),
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

	public function get($id) {
		$data = parent::get($id);
		if($data) {
			$stmt = $this->db->prepare('SELECT module, access_id FROM admin_access WHERE admin_id = :id');
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
			$stmt->execute();
			$data['access'] = array('customers' => 0,
                              'orders'    => 0,
                              'reports'   => 0,
                              'users'     => 0);
			if($stmt->rowCount() > 0) {
				while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
					if(isset($data['access'][$result['module']]) && $result['access_id'] == 1) {
						$data['access'][$result['module']] = 1;
					}
				}
			}
			return $data;
		} else {
			return false;
		}
	}

	public function get_list() {
		$stmt = $this->db->prepare('SELECT * FROM admin');
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$users = array();
			while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$data  = $result;
				$stmt2 = $this->db->prepare('SELECT module, access_id FROM admin_access WHERE admin_id = :id');
				$stmt2->bindValue(':id', $data['id'], PDO::PARAM_INT);
				$stmt2->execute();
				$data['access'] = array('customers' => 0,
                                'orders'    => 0,
                                'reports'   => 0,
                                'users'     => 0);
				if($stmt2->rowCount() > 0) {
					while($result2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
						if(isset($data['access'][$result2['module']]) && $result2['access_id'] == 1) {
							$data['access'][$result2['module']] = 1;
						}
					}
				}
				$data['last_login_ip'] = long2ip($data['last_login_ip']);
				array_push($users, $data);
			}
			return $users;
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

	public function save($data) {
		$id = parent::save($data);
		if(isset($data['id']) && $data['id'] == $id) {
			// This is an UPDATE case. When we allow editing users, need to update this to perform an update on Access
			return $id;
		}
		if($id && $data) {
			$stmt = $this->db->prepare('INSERT INTO admin_access (admin_id, module, access_id, create_date) VALUES (:id, :module, :access_id, NOW())');
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
			$stmt->bindValue(':module', 'customers', PDO::PARAM_STR);
			if(isset($data['access-customers']) && $data['access-customers'] == 1) {
				$stmt->bindValue(':access_id', 1, PDO::PARAM_INT);
			} else {
				$stmt->bindValue(':access_id', 0, PDO::PARAM_INT);
			}
			$stmt->execute();
			$stmt = $this->db->prepare('INSERT INTO admin_access (admin_id, module, access_id, create_date) VALUES (:id, :module, :access_id, NOW())');
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
			$stmt->bindValue(':module', 'orders', PDO::PARAM_STR);
			if(isset($data['access-orders']) && $data['access-orders'] == 1) {
				$stmt->bindValue(':access_id', 1, PDO::PARAM_INT);
			} else {
				$stmt->bindValue(':access_id', 0, PDO::PARAM_INT);
			}
			$stmt->execute();
			$stmt = $this->db->prepare('INSERT INTO admin_access (admin_id, module, access_id, create_date) VALUES (:id, :module, :access_id, NOW())');
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
			$stmt->bindValue(':module', 'reports', PDO::PARAM_STR);
			if(isset($data['access-reports']) && $data['access-reports'] == 1) {
				$stmt->bindValue(':access_id', 1, PDO::PARAM_INT);
			} else {
				$stmt->bindValue(':access_id', 0, PDO::PARAM_INT);
			}
			$stmt->execute();
			$stmt = $this->db->prepare('INSERT INTO admin_access (admin_id, module, access_id, create_date) VALUES (:id, :module, :access_id, NOW())');
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
			$stmt->bindValue(':module', 'users', PDO::PARAM_STR);
			if(isset($data['access-users']) && $data['access-users'] == 1) {
				$stmt->bindValue(':access_id', 1, PDO::PARAM_INT);
			} else {
				$stmt->bindValue(':access_id', 0, PDO::PARAM_INT);
			}
			$stmt->execute();
			return $id;
		}
		return false;
	}

	public function delete($id) {
		parent::delete($id);
		$stmt = $this->db->prepare('DELETE FROM admin_access WHERE admin_id = :id');
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		$stmt->execute();
	}

	public function get_by_username($username) {
		$stmt = $this->db->prepare('SELECT ' . implode(array_keys($this->field_map), ', ') . ' FROM ' . $this->table . ' WHERE username = :un');
		$stmt->bindValue(':un', $username, PDO::PARAM_STR);
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
}
