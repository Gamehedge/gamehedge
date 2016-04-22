<?php
class Crypt {
	private $key;
	private $iv;

	public function __construct() {
		$this->key = Config::get_crypt_key();
		$this->key = hash('sha256', $this->key, true);
		$this->iv  = mcrypt_create_iv(32, MCRYPT_RAND);
	}

	public function encrypt($text) {
		return base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $this->key, $text, MCRYPT_MODE_ECB, $this->iv));
	}

	public function decrypt($text) {
		return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $this->key, base64_decode($text), MCRYPT_MODE_ECB, $this->iv));
	}
}