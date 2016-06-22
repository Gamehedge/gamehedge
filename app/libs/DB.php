<?php
class DB {
	private static $objInstance;

	/*
	 * Class Constructor - Create a new database connection if one doesn't exist
	 * Set to private so no-one can create a new instance via ' = new DB();'
	 */
	private function __construct() {}

	/*
	 * Like the constructor, we make __clone private so nobody can clone the instance
	 */
	private function __clone() {}

	/*
	 * Returns DB instance or create initial connection
	 * @param
	 * @return $objInstance;
	 */
	public static function getInstance() {
		if(!self::$objInstance) {
			$dbData = Config::get_db_login();
			// self::$objInstance = new PDO('mysql:host=' . $dbData['db_host'] . ';dbname=' . $dbData['db_name'] . ';charset=utf8', $dbData['db_user'], $dbData['db_pass']);
			self::$objInstance = new PDO('pgsql:host=' . $dbData['db_host'] . ';dbname=' . $dbData['db_name'] , $dbData['db_user'], $dbData['db_pass']);
			self::$objInstance->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			self::$objInstance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		return self::$objInstance;
	}

	/*
	 * Passes on any static calls to this class onto the singleton PDO instance
	 * @param $chrMethod, $arrArguments
	 * @return $mix
	 */
	final public static function __callStatic($chrMethod, $arrArguments) {
		$objInstance = self::getInstance();
		return call_user_func_array(array($objInstance, $chrMethod), $arrArguments);
	}
}