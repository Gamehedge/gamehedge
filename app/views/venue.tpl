{$header}
<section id="venue-header">
	<div class="container">
		<h1>{$name}</h1>
		<div id="venue-location">{$location}</div>
	</div>
</section>
<main>
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<!--
				<div class="filter">
					<form name="ticketFilter" class="form-inline" ng-submit="filterTickets()">
						<div class="form-group">
							<label for="qty" class="control-label">QTY</label>
							<select name="qty" class="form-control" ng-model="qty" ng-options="n for n in [] | range:1:9"></select>
						</div>
						<input type="submit" class="btn btn-default" value="Find Tickets" ng-show="!loading" /><span ng-show="loading"><i class="fa fa-circle-o-notch fa-lg fa-spin"></i> Finding best seats available...</span>
					</form>
				</div>
				-->
				<section id="games">
					{if $events|@count gt 0}
					<ul>
						{foreach $events as $edata}
						<li class="clearfix">
							<div class="date">
								<div class="month">{$edata.occurs_at|date_format:"F"}</div>
								<div class="day">{$edata.occurs_at|date_format:"j"}</div>
								<div class="time">{$edata.occurs_at|date_format:"D. h:i A"}</div>
							</div>
							<div class="event">
								<div class="name">{$edata.name}</div>
								<div class="location"><a href="/venue/{$edata.venue.id}/{$edata.venue.slug}">{$edata.venue.name}</a> - {$edata.venue.location}</div>
							</div>
							<div class="tickets-link">
								<a href="/ticket/{$edata.id}" class="btn-green-gradient">from <span>${$edata.low_price} <i class="fa fa-angle-right"></i></a>
								{if $edata.available_count < 20}
									<div class="text-center alert-text">NOT MANY LEFT</div>
								{/if}
							</div>
						</li>
						{/foreach}
					</ul>
					{else}
					<p>There are no games available at this time.</p>
					{/if}
				</section>
				{if $pages > 1}
				<nav role="navigation" class="clearfix">
					<ul class="pagination pull-right">
						{for $i = 1 to $pages}
						<li{if $i eq $page} class="active"{/if}><a href="{$url}?page={$i}">{$i}</a></li>
						{/for}
					</ul>
				</nav>
				{/if}
			</div>
			<div class="col-md-3">
				<aside id="gamehedge-about">
					<p>Your Team. Your Tickets.</p>
					<img src="/assets/img/logo.png" alt="GameHedge" />
					<h2>Here's How it Works</h2>
					<ul>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-tickets.png" alt="Tickets" /></div>
							<p>Find your game &amp; purchase your tickets from GameHedge. Every ticket comes with our Good Game Guarantee!</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-stadium.png" alt="Stadium" /></div>
							<p>Attend the game &amp; enjoy your team with no worries.</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-scoreboard.png" alt="Scoreboard" /></div>
							<p>If the home team loses by five or more runs, you get 50% of the ticket price back.</p>
						</li>
						<li><i class="fa fa-angle-down"></i></li>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-handshake.png" alt="Handshake" /></div>
							<p>Just come back to GameHedge.com for your refund!</p>
						</li>
					</ul>
				</aside>
			</div>
		</div>
	</div>
</main>
{$footer}