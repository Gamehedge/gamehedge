{$header}
<section id="customer-list">
	<h2>Search Customers</h2>
	<section id="customer-search">
		<form action="/admin/customers/search" method="GET">
			<div class="input-group">
				<input id="q" name="q" type="text" class="form-control" placeholder="Search by name or email...">
				<span class="input-group-btn"><input type="submit" class="btn btn-default" value="Search" /></span>
			</div>
		</form>
	</section>
	<h2>Customer List</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Register Date</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{foreach $clients as $client}
			<tr>
				<td>{$client.name}</td>
				<td>{$client.email}</td>
				<td>{$client.create_date|date_format:"m-d-Y"}</td>
				<td><a href="/admin/customers/view/{$client.id}">View</a></td>
			</tr>
			{/foreach}
		</tbody>
	</table>
	{if $pages > 1}
	<nav role="navigation" class="clearfix">
		<ul class="pagination pull-right">
			{for $i = 1 to $pages}
			<li{if $i eq $page} class="active"{/if}><a href="{$url}?page={$i}">{$i}</a></li>
			{/for}
		</ul>
	</nav>
	{/if}
</section>
{$footer}
