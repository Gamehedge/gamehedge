<?php
/**
 * This Model handles Events Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class EventModel extends Model {
	protected $table     = 'events';
	protected $pk        = 'id';
  protected $sequence  = 'events_sequence2';
	public $fields       = array('id'                     => null,
                               'te_uid'                   => null,
                               'te_performer_home_id'     => null,
                               'te_performer_visit_id'    => null,
                               'data_event'               => null,
                               'te_date'                  => null,);
	protected $field_map = array('id'                     => array('name'  => 'id',
                                                                   'type'  => 'int'),
                               'te_uid'                   => array('name'  => 'te_uid',
                                                                   'type'  => 'int'),
                               'te_performer_home_id'     => array('name'  => 'te_performer_home_id',
                                                                   'type'  => 'int'),
                               'te_performer_visit_id'    => array('name'  => 'te_performer_visit_id',
                                                                   'type'  => 'int'),
                               'data_event'               => array('name'  => 'data_event',
                                                                   'type'  => 'string'),
                               'te_date'                  => array('name'  => 'te_date',
                                                                   'type'  => 'datetime'));
	public function __construct() {
		parent::__construct();
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
      public function get_list($query) {
            $page = $query["page"];
            $per_page = $query["per_page"];
            $id = $query["performer_id"];
            $ldate = date('Y-m-d H:i:s', strtotime(str_replace('-', '/',  $query["occurs_at.gte"])));
            $llimit = $per_page * ($page - 1);
            $hlimit = $llimit + $per_page;
            $delta_limit = $hlimit - $llimit;
            if(array_key_exists("primary_performer",$query)){
                  if($query["primary_performer"] == true){
                        $stmt = $this->db->prepare('SELECT data_event FROM events WHERE te_performer_home_id = :teid AND te_date > :ldate ORDER BY te_date ASC LIMIT :delta_limit OFFSET :llimit');
                        $total_query = $this->db->prepare('SELECT COUNT(*) FROM events WHERE te_performer_home_id = :teid AND te_date > :ldate');
                        $stmt->bindValue(':teid', $id, PDO::PARAM_INT);
                        $total_query->bindValue(':teid', $id, PDO::PARAM_INT);
                  }
                  else{
                        $stmt   = $this->db->prepare('SELECT data_event FROM events WHERE (te_performer_home_id = :teid OR te_performer_visit_id = :teid2) AND te_date > :ldate ORDER BY te_date ASC LIMIT :delta_limit OFFSET :llimit');
                        $total_query = $this->db->prepare('SELECT COUNT(*) FROM events WHERE (te_performer_home_id = :teid OR te_performer_visit_id = :teid2) AND te_date > :ldate');
                        $stmt->bindValue(':teid', $id, PDO::PARAM_INT);
                        $stmt->bindValue(':teid2', $id, PDO::PARAM_INT);
                        $total_query->bindValue(':teid', $id, PDO::PARAM_INT);
                        $total_query->bindValue(':teid2', $id, PDO::PARAM_INT);
                  }
            }
            else{
                  $stmt   = $this->db->prepare('SELECT data_event FROM events WHERE (te_performer_home_id = :teid OR te_performer_visit_id = :teid2) AND te_date > :ldate ORDER BY te_date ASC LIMIT :delta_limit OFFSET :llimit');
                  $total_query = $this->db->prepare('SELECT COUNT(*) FROM events WHERE (te_performer_home_id = :teid OR te_performer_visit_id = :teid2) AND te_date > :ldate');
                  $stmt->bindValue(':teid', $id, PDO::PARAM_INT);
                  $stmt->bindValue(':teid2', $id, PDO::PARAM_INT);
                  $total_query->bindValue(':teid', $id, PDO::PARAM_INT);
                  $total_query->bindValue(':teid2', $id, PDO::PARAM_INT);
                  
            }
            $stmt->bindValue(':llimit', $llimit);
            $stmt->bindValue(':ldate', $ldate);
            $stmt->bindValue(':delta_limit', $delta_limit);
            $total_query->bindValue(':ldate', $ldate);
            $stmt->execute();
            $total_query->execute();
            $total_records = $total_query->fetch(PDO::FETCH_ASSOC);
            $total_records = $total_records["count"];
            if($stmt->rowCount() > 0) {
                  $events = array();
                  while($event = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        array_push($events, json_decode($event["data_event"]));
                  }
                  return array(
                        'current_page'   => $page,
                        'per_page'   => $per_page,
                        'events' => $events,
                        'total_entries'   => $total_records,
                  );
            } else {
                  return false;
            }
      }
}
