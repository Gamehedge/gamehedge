<?php
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__) . '/../');
$serverInfo = posix_uname();
define('API', 'v1');
if(strpos($serverInfo['nodename'], 'gamehedge.com') > -1) {
	define('MODE', 'live');
} else {
	define('MODE', 'live');
}
if(MODE == 'dev') {
} else {
}
require_once 'vendor/autoload.php';
require_once 'app/libs/API.php';
try {
	$api = new API($_REQUEST['request']);
	echo $api->process_api();
} catch(Exception $e) {
	echo json_encode(Array('status'     => 0,
                         'error'      => $e->getMessage(),
                         'error_code' => $e->getCode()));
}
?>