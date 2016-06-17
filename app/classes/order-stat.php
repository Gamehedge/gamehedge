<?php
/**
 * Handles Order Statistics
 *
 * @author joey <joey@faintllc.com>
 * @since v0.0.1
 */
require_once 'app/libs/DB.php';

class OrderStat {
	private $db;

	public function __construct($id = null) {
		$this->db = DB::getInstance();
	}

	public function add() {
		$stmt = $this->db->prepare("INSERT INTO order_stats (num, stat_date) VALUES (1, NOW()) ON CONFLICT (" . $this->db->pk . ") DO UPDATE SET num = EXCLUDED.num + 1");
		return $stmt->execute();
	}

	public function get_stats() {
		$stats = array();
		$stmt  = $this->db->prepare("SELECT SUM(num) AS num FROM order_stats WHERE stat_date = DATE(NOW())");
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$result         = $stmt->fetch(PDO::FETCH_ASSOC);
			$stats['today'] = !empty($result['num']) ? $result['num'] : 0;
		} else {
			$stats['today'] = 0;
		}
		$stmt = $this->db->prepare("SELECT SUM(num) AS num FROM order_stats WHERE DATE_PART('week', stat_date::timestamp) = DATE_PART('week', NOW()::timestamp) AND DATE_PART('year', stat_date::timestamp) = DATE_PART('year', NOW()::timestamp)");
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$result        = $stmt->fetch(PDO::FETCH_ASSOC);
			$stats['week'] = !empty($result['num']) ? $result['num'] : 0;
		} else {
			$stats['week'] = 0;
		}
		$stmt = $this->db->prepare("SELECT SUM(num) AS num FROM order_stats WHERE DATE_PART('month', stat_date::timestamp) = DATE_PART('month', NOW()::timestamp) AND DATE_PART('year', stat_date::timestamp) = DATE_PART('year', NOW()::timestamp)");
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$result         = $stmt->fetch(PDO::FETCH_ASSOC);
			$stats['month'] = !empty($result['num']) ? $result['num'] : 0;
		} else {
			$stats['month'] = 0;
		}
		$stmt = $this->db->prepare("SELECT SUM(num) AS num FROM order_stats WHERE DATE_PART('year', stat_date::timestamp) = DATE_PART('year', NOW()::timestamp)");
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			$result        = $stmt->fetch(PDO::FETCH_ASSOC);
			$stats['year'] = !empty($result['num']) ? $result['num'] : 0;
		} else {
			$stats['year'] = 0;
		}
		return $stats;
	}
}