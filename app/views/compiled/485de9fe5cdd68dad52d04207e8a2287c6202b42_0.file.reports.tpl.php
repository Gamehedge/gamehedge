<?php
/* Smarty version 3.1.29, created on 2016-04-04 23:33:53
  from "/home/gamehedg/app/views/admin/reports.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_57034e41a5b441_59272934',
  'file_dependency' => 
  array (
    '485de9fe5cdd68dad52d04207e8a2287c6202b42' => 
    array (
      0 => '/home/gamehedg/app/views/admin/reports.tpl',
      1 => 1459217524,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_57034e41a5b441_59272934 ($_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['header']->value;?>

<section id="reports-form">
	<h2>Sales Summary Reports</h2>
	<div class="form-wrapper">
		<form action="/admin/reports/sales-summary" method="POST">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="order-date-start-r1">Sales Date Start Range</label>
						<input type="text" id="order-date-start-r1" name="order-date-start" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="order-date-end-r1">Sales Date End Range</label>
						<input type="text" id="order-date-end-r1" name="order-date-end" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="event-date-start-r1">Event Date Start Range</label>
						<input type="text" id="event-date-start-r1" name="event-date-start" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="event-date-end-r1">Event Date End Range</label>
						<input type="text" id="event-date-end-r1" name="event-date-end" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="home-team-r1">Home team</label>
						<input type="text" id="home-team-r1" name="home-team" class="form-control" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="venue-r1">Venue</label>
						<input type="text" id="venue-r1" name="venue" class="form-control" />
					</div>
				</div>
			</div>
			<div class="text-right"><input type="submit" class="btn btn-default" value="Run Report" /></div>
		</form>
	</div>
	<h2>Sales Detail Report - SCA</h2>
	<div class="form-wrapper">
		<form action="/admin/reports/sales-detail" method="POST">
			<div class="form-group">
				<label for="event-date-r2">Event Date</label>
				<input type="text" id="event-date-r2" name="event-date" class="form-control" placeholder="YYYY-MM-DD" />
			</div>
			<div class="text-right"><input type="submit" class="btn btn-default" value="Run Report" /></div>
		</form>
	</div>
	<h2>Sales Profit Report</h2>
	<div class="form-wrapper">
		<form action="/admin/reports/sales-profit" method="POST">
			<div class="form-group">
				<label for="event-date-r3">Event Date</label>
				<input type="text" id="event-date-r3" name="event-date" class="form-control" placeholder="YYYY-MM-DD" />
			</div>
			<div class="text-right"><input type="submit" class="btn btn-default" value="Run Report" /></div>
		</form>
	</div>
	<h2>Customer Report</h2>
	<div class="form-wrapper">
		<form action="/admin/reports/customer-report" method="POST">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="order-date-start-r4">Sales Date Start Range</label>
						<input type="text" id="order-date-start-r4" name="order-date-start" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="order-date-end-r4">Sales Date End Range</label>
						<input type="text" id="order-date-end-r4" name="order-date-end" class="form-control" placeholder="YYYY-MM-DD" />
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="customer-name-r4">Customer Name</label>
				<input type="text" id="customer-name-r4" name="customer-name" class="form-control" />
			</div>
			<div class="text-right"><input type="submit" class="btn btn-default" value="Run Report" /></div>
		</form>
	</div>
</section>
<?php echo $_smarty_tpl->tpl_vars['footer']->value;
}
}
