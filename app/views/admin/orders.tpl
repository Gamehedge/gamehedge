{$header}
<main ng-controller="AdminOrderController">
<div ng-if="searching"><i class="fa fa-circle-o-notch fa-lg fa-spin"></i>Loading records...</div>
<section ng-if="!searching" id="order-list">
	<h2>Order List</h2>
	<div class="row">
		<div class="col-md-3"><label>Search (by Name and Event)</label></div>
		<div class="col-md-3"><input type="text" ng-model="searchText" ng-change="textFilter()"></div>
	</div>
	<div class="row">
		<div class="col-md-3"><label>Initial event date</label></div>
		<div class="col-md-3"><input type="date" ng-model="initDate" ng-change="textFilter()"></div>
	</div>
	<div class="row">
		<div class="col-md-3"><label>End event date date</label></div>
		<div class="col-md-3"><input type="date" ng-model="endDate" ng-change="textFilter()"></div>
	</div>
	{literal}
	<nav role="navigation" class="clearfix" ng-if="totalItems > pageSize">
		<ul class="pagination pull-right">
			<li ng-repeat="n in pages track by $index" ng-class="{'active':$index == currentPage}" ng-click="changePage($index)"><a href="">-!$index + 1!-</a></li>
		</ul>

	</nav>
	{/literal}
	<p style="text-align:right;">-!filtered.length!- total records</p>
	<table class="table table-striped">
		<thead>
			<tr>
				<th ng-click="order('id')">Order ID<span ng-if="orderby == 'id'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span ng-if="orderby == '-id'"  class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>
				<th ng-click="order('create_date')">Order Date<span ng-if="orderby == 'create_date'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span ng-if="orderby == '-create_date'"  class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>
				<th ng-click="order('name')">Customer<span ng-if="orderby == 'name'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span ng-if="orderby == '-name'"  class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>
				<th ng-click="order('event_date')">Event<span ng-if="orderby == 'event_date'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span ng-if="orderby == '-event_date'"  class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>
				<th ng-click="order('refund_status')">Refund Status<span ng-if="orderby == 'refund_status'" class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span ng-if="orderby == '-refund_status'"  class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="order in orders.orders | orderBy:orderby | searchFilter:searchText | dateFilter:initDate:endDate | startFrom:currentPage*pageSize | limitTo:pageSize">
				<td>-!order.te_order_id!-</td>
				<td>-!order.create_date | timeformat | date:'MM-dd-yyyy'!-</td>
				<td>
					-!order.name!-<br />
					-!order.email!-
				</td>
				<td>
					-!order.event_name!-<br />
					-!order.event_date | date:'MM-dd-yyyy hh:mm a'!-
				</td>
				<td>
					<select id="refund_status-!order.id!-">
					<option value="-!ref.value!-" ng-repeat="ref in refund_op">-!ref.name!-</option>
					</select><br />
					<button class="change_refund" data-rel="-!order.id!-">Update</button>
				</td>
				<td><a href="/admin/orders/view/-!order.id!-">View</a></td>
			</tr>
		</tbody>
	</table>
	{literal}
	<nav role="navigation" class="clearfix" ng-if="totalItems > pageSize">
		<ul class="pagination pull-right">
			<li ng-repeat="n in pages track by $index" ng-class="{'active':$index == currentPage}" ng-click="changePage($index)"><a href="">-!$index + 1!-</a></li>
		</ul>
	</nav>
	{/literal}
</section>
</main>
{$footer}

