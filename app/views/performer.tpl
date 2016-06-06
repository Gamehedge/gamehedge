{$header}
{$menu}
<script type="application/javascript">
    var _id = {$performer_id};
    var _slug = "{$p_slug}";
</script>
<section id="team-header">
	<div class="container">
		<h1 style="color: #333333;text-transform: none;">{$title}</h1>
	</div>
</section>
<main>
	<div class="container">
		<div class="row">
			<div class="col-md-9">
                <div id="home-loading-data" class="row text-center">
                    <img src="/assets/img/loadinfo.gif">
                </div>
                
                <section id="games">
                
                </section>
                
				
                <section id="games_old">
                        
					{if $events|@count gt 0}
					<div style="margin-bottom: 10px"><label><input type="checkbox" id="only_home" value="1" {$only_home} /> Only show home games</label></div>
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
					<!--p>There are no games available at this time.</p-->
					{/if}
				</section>
				
				<nav role="navigation" class="clearfix" id="pag_navigation">
					<ul class="pagination pull-right">
						{for $i = 1 to $pages}
						<li{if $i eq $page} class="active"{/if}><a href="{$url}?page={$i}">{$i}</a></li>
						{/for}
					</ul>
				</nav>
				
				<p><strong>Please Note: Gamehedge is a resale ticket marketplace, not the ticket seller. Prices are set by third-party sellers and may be above or below face value.</p>
			</div>
			<div class="col-md-3">
				<aside id="gamehedge-about">
					<p>Your Team. Your Tickets.</p>
					<img src="/assets/img/logo-grey.png" alt="GameHedge" />
					<div class="sub-text">{$team.subtext}</div>
					<h2>Here's How it Works</h2>
					<ul>
						<li>
							<div class="img-holder"><img src="/assets/img/icon-tickets.png" alt="Tickets" /></div>
							<p>Find your game &amp; purchase your tickets. Every ticket comes with our Good Game Guarantee at no additional cost!</p>
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
