<?php
/**
 * This Model handles Performers Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class PerformerModel extends Model {
	protected $table     = 'performers';
	protected $pk        = 'id';
	public $fields       = array('id'               => null,
                               'te_uid'               => null,
                               'te_name'              => null,
                               'te_slug'              => null,
                               );
	protected $field_map = array('id'               => array('name'  => 'id',
                                                                   'type'  => 'int'),
                               'te_uid'               => array('name'  => 'te_uid',
                                                                   'type'  => 'int'),
                               'te_name'              => array('name'  => 'te_name',
                                                                   'type'  => 'string'),
                               'te_slug'              => array('name'  => 'te_slug',
                                                                   'type'  => 'string'));
	public function __construct() {
		parent::__construct();
	}
      public function get_by_teid($id) {
            $stmt = $this->db->prepare("SELECT * FROM " . $this->table . " WHERE te_uid = :teid");
            $stmt->bindValue(':teid', $id, PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount() < 1) {
                  return false;
            } else {
                  $row = $stmt->fetch(PDO::FETCH_ASSOC);
                  $uid = array('id' => $row['id'],
                        'te_uid' => $row['te_uid'],
                        'name' => $row['te_name'],
                        'slug' => $row['te_slug'],
                        );
                  return $uid;
            }
      }
}
