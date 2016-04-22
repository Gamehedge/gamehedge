<?php
/**
 * Our Base Model Class
 *
 * created is a reserved field name for 'create_date'
 * modified is a reserved field name for 'modified_date'
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/libs/DB.php';

class Model {
	protected $db;
	protected $table;
	protected $pk;
	protected $pk_auto   = true;
	public $fields       = array();
	protected $field_map = array();

	public function __construct() {
		$this->db = DB::getInstance();
	}

	public function get($id) {
		$stmt = $this->db->prepare('SELECT ' . implode(array_keys($this->field_map), ', ') . ' FROM ' . $this->table . ' WHERE ' . $this->pk . ' = :id');
		$stmt->bindValue(':id', $id, PDO::PARAM_STR);
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
		$ifields = $this->field_map;
		if($this->pk_auto)
			unset($ifields[$this->pk]);
		unset($ifields['modified_date']);
		$sql = 'INSERT INTO ' . $this->table . ' (' . implode(array_keys($ifields), ', ') . ') VALUES (';
		foreach($ifields AS $dbk => $fdata) {
			if($fdata['name'] != 'modified') {
				if($fdata['name'] == 'created' || $fdata['name'] == 'last_date') {
					$sql .= 'NOW(), ';
				} else {
					$sql .= ':' . $fdata['name'] . ', ';
				}
			}
		}
		$sql = rtrim($sql, ', ') . ') ON DUPLICATE KEY UPDATE ';
		foreach($this->field_map AS $dbk => $fdata) {
			if($fdata['name'] != 'created' && $fdata['name'] != 'modified') {
				if($dbk == $this->pk && $this->pk_auto) {
					$sql .= $dbk . ' = LAST_INSERT_ID(' . $dbk . '), ';
				} else if($fdata['name'] == 'last_date') {
					$sql .= $dbk . ' = NOW(), ';
				} else {
					$sql .= $dbk . ' = :u' . $fdata['name'] . ', ';
				}
			}
		}
		$sql  = rtrim($sql, ', ');
		$stmt = $this->db->prepare($sql);
		foreach($ifields AS $dbk => $fdata) {
			if($fdata['name'] != 'created' && $fdata['name'] != 'modified' && $fdata['name'] != 'last_date') {
				if(isset($data[$fdata['name']])) {
					switch($fdata['type']) {
					case 'int':
						$stmt->bindValue(':' . $fdata['name'], $data[$fdata['name']], PDO::PARAM_INT);
						$stmt->bindValue(':u' . $fdata['name'], $data[$fdata['name']], PDO::PARAM_INT);
						break;
					case 'string':
						$stmt->bindValue(':' . $fdata['name'], $data[$fdata['name']], PDO::PARAM_STR);
						$stmt->bindValue(':u' . $fdata['name'], $data[$fdata['name']], PDO::PARAM_STR);
						break;
					}
				} else {
					$stmt->bindValue(':' . $fdata['name'], null, PDO::PARAM_INT);
					$stmt->bindValue(':u' . $fdata['name'], null, PDO::PARAM_INT);
				}
			}
		}
		$stmt->execute();
		return $this->db->lastInsertId();
	}

	public function delete($id) {
		$stmt = $this->db->prepare("DELETE FROM " . $this->table . " WHERE " . $this->pk . " = :id");
		if($this->field_map[$this->pk]['type'] == 'int') {
			$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		} else {
			$stmt->bindValue(':id', $id, PDO::PARAM_STR);
		}
		return $stmt->execute();
	}
}