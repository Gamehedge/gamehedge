<?php
class Utility {
	public function __construct() {
	}

	public static function strip_team_city($name) {
		$teams = Config::get_team_data();
		return isset($teams[$name]['name']) ? $teams[$name]['name'] : false;
	}

	public static function get_team_data($name) {
		$teams = Config::get_team_data();
		return isset($teams[$name]) ? $teams[$name] : false;
	}

	public static function clean_inputs($data) {
		$cleanInput = Array();
		if(is_array($data)) {
			foreach($data as $k => $v) {
				$cleanInput[$k] = Utility::clean_inputs($v);
			}
		} else {
			$cleanInput = trim(strip_tags($data));
		}
		return $cleanInput;
	}

	public static function create_sess_id($system = 'site') {
		$sess_id = md5(Utility::get_ip_address() . '-' . getmypid() . '-' . time() . '-' . bin2hex(openssl_random_pseudo_bytes(5)));
		if($system == 'site')
			setcookie('sess_id', $sess_id, time() + (86400 * 7), '/');
		else
			setcookie('admin_sess_id', $sess_id, time() + (86400 * 7), '/');
		return $sess_id;
	}

	public static function exec_curl($url, $post_vars = '', $cookie_vars = '', $add_userpwd = false, $add_header = false) {
		// Do the CURL thing
		$session = curl_init($url);
		curl_setopt($session, CURLOPT_RETURNTRANSFER, true); // return values as a string - not to std out
		curl_setopt($session, CURLOPT_FOLLOWLOCATION, false);
		curl_setopt($session, CURLOPT_TIMEOUT, 10); // -m 60
		curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($session, CURLOPT_SSL_VERIFYHOST, false);
		if($add_userpwd) {
			curl_setopt($session, CURLOPT_USERPWD, 'username:password');
		}
		if($add_header)
			curl_setopt($session, CURLOPT_HEADER, true);
		if(is_array($post_vars)) {
			curl_setopt($session, CURLOPT_POST, true);
			curl_setopt($session, CURLOPT_POSTFIELDS, http_build_query($post_vars));
		}
		if(is_array($cookie_vars)) {
			$cookie_list = array();
			if(is_array($cookie_vars)) {
				foreach($cookie_vars as $label => $val)
					$cookie_list[] = urlencode($label) . '=' . urlencode(trim($val));
			}
			$cookie_list = join('; ', $cookie_list);
			curl_setopt($session, CURLOPT_COOKIE, $cookie_list);
		}
		$ret_val = curl_exec($session); // send the request
		curl_close($session);
		return $ret_val;
	}

	public static function get_ip_address() {
		$ip = '127.0.0.1';
		if(isset($_SERVER['REMOTE_ADDR']))
			$ip = $_SERVER['REMOTE_ADDR'];
		// Handle redirections
		if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		return $ip;
	}

	public static function get_origin() {
		if(!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
			$_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
		}
		$urlParts = parse_url($_SERVER['HTTP_ORIGIN']);
		if(isset($urlParts['host'])) {
			$origin = $urlParts['host'];
		} else {
			$origin = $_SERVER['HTTP_ORIGIN'];
		}
		return $origin;
	}

	public static function get_cc_company($ccNum) {
		/*
		 * Mastercard: Must have a prefix of 51 to 55, and must be 16 digits in length.
		 * Visa: Must have a prefix of 4, and must be either 13 or 16 digits in length.
		 * American Express: Must have a prefix of 34 or 37, and must be 15 digits in length.
		 * Diners Club: Must have a prefix of 300 to 305, 36, or 38, and must be 14 digits in length.
		 * Discover: Must have a prefix of 6011, and must be 16 digits in length.
		 * JCB: Must have a prefix of 3, 1800, or 2131, and must be either 15 or 16 digits in length.
		 */
		$matchingPatterns = array('visa'       => '/^4[0-9]{12}(?:[0-9]{3})?$/',
                              'mastercard' => '/^5[1-5][0-9]{14}$/',
                              'amex'       => '/^3[47][0-9]{13}$/',
                              'diners'     => '/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/',
                              'discover'   => '/^6(?:011|5[0-9]{2})[0-9]{12}$/',
                              'jcb'        => '/^(?:2131|1800|35\d{3})\d{11}$/',
                              'any'        => '/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/');
		foreach($matchingPatterns as $key => $pattern) {
			if(preg_match($pattern, $ccNum)) {
				return $key;
			}
		}
		return 'INVALID';
	}

	public static function is_json($string) {
		if(!is_string($string)) {
			return false;
		}
		$string    = trim($string);
		$firstChar = substr($string, 0, 1);
		$lastChar  = substr($string, -1);
		if(!$firstChar || !$lastChar) {
			return false;
		}
		if($firstChar !== '{' && $firstChar !== '[') {
			return false;
		}
		if($lastChar !== '}' && $lastChar !== ']') {
			return false;
		}
		json_decode($string);
		return json_last_error() === JSON_ERROR_NONE;
	}
}