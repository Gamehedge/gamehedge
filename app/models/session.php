<?php
/**
 * This Model handles Session Data Management
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/models/model.php';

class SessionModel extends Model {
	protected $table     = 'session_data';
	protected $pk        = 'sess_id';
	protected $pk_auto   = false;
	public $fields       = array('id'       => null,
                               'data'     => null,
                               'created'  => null,
                               'modified' => null);
	protected $field_map = array('sess_id'       => array('name' => 'id',
                                                        'type' => 'string'),
                               'sess_data'     => array('name' => 'data',
                                                        'type' => 'string'),
                               'create_date'   => array('name' => 'created',
                                                        'type' => 'datetime'),
                               'modified_date' => array('name' => 'modified',
                                                        'type' => 'timestamp'));
	public function __construct() {
		parent::__construct();
	}
}