<?php
/**
 * This Model handles Client Data
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class EventModel extends Model {
	protected $table     = 'events';
	protected $pk        = 'id';
	public $fields       = array('id'        => null,
                               'te_uid'      => null,
                               'te_performer_home_id'     => null,
                               'te_performer_visit_id'  => null,
                               'data_event'    => null,);
	protected $field_map = array('id'              => array('name' => 'id',
                                                          'type' => 'int'),
                               'te_uid'            => array('name' => 'name',
                                                          'type' => 'int'),
                               'te_performer_home_id'           => array('name' => 'email',
                                                          'type' => 'int'),
                               'te_performer_visit_id'        => array('name' => 'password',
                                                          'type' => 'int'),
                               'data_event'          => array('name' => 'te_uid',
                                                          'type' => 'string'));
	public function __construct() {
		parent::__construct();
	}
}
