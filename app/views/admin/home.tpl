{$header}
<section id="order-stats">
	<h2>Order Stats</h2>
	<div class="row">
		<div class="col-md-3">
			<div class="stat-item">
				<h3>Today</h3>
				<span>{$stats.today}</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Week</h3>
				<span>{$stats.week}</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Month</h3>
				<span>{$stats.month}</span>
			</div>
		</div>
		<div class="col-md-3">
			<div class="stat-item">
				<h3>This Year</h3>
				<span>{$stats.year}</span>
			</div>
		</div>
	</div>
</section>
{$footer}