<section id="hero">
	<div id="shader"></div>
	<div id="wrapper">
		{$header}
		<div id="content">
			<div class="container">
				<p>Every Ticket Comes With Our Good Game Guarantee!</p>
				<div id="hero-search">
					<form id="form-home-search" name="formSearch" method="POST" action="/search">
						<input type="hidden" name="type" value="full" />
						<div class="form-group">
							<label for="query" class="sr-only">Search Team, Stadium or City</label>
							<div class="input-group">
								<input type="text" id="home-query" name="query" class="form-control" placeholder="Search by Team, Stadium or City..." />
								<span class="input-group-btn">
									<button class="btn btn-default" type="button" onclick="$('#form-home-search').submit();"><i class="fa fa-search"></i></button>
								</span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
<main>
	<div class="container">
		<div id="results" ng-if="events.length > 0">
			<h2>How Does the Good Game Guarantee Work?</h2>
			<div class="row">
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-tickets.png" alt="Tickets" /></div>
						<p>Find your game &amp; purchase your tickets from GameHedge. Every ticket comes with our Good Game Guarantee!</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-stadium.png" alt="Stadium" /></div>
						<p>Attend the game &amp; enjoy your team with no worries.</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-scoreboard.png" alt="Scoreboard" /></div>
						<p>If the home team loses by five or more runs, you get 50% of the ticket price back.</p>
					</div>
				</div>
				<div class="col-md-3">
					<div class="guarantee-item margin-divider-half">
						<div class="img-holder"><img src="/assets/img/icon-handshake.png" alt="Handshake" /></div>
						<p>Just come back to GameHedge.com for your refund!</p>
					</div>
				</div>
			</div>
			<h2 id="upcoming_title">Upcoming Games Near You</h2>
            <div id="home-loading-data" class="row text-center">
                <img src="/assets/img/loadinfo.gif">
            </div>
			<div id="upcoming-games" class="row">
				{foreach $events as $edata}
					<div class="col-md-3">
						<div class="game-item">
							<div class="date">{$edata.occurs_at|date_format:"l, M j"}</div>
							<div class="name margin-divider-half">
								{$edata.performances[0].performer.name}<br />
								<span>vs</span><br />
								{$edata.performances[1].performer.name}
							</div>
							<div class="location margin-divider-half"><i class="fa fa-map-marker"></i> <a href="/venue/{$edata.venue.id}/{$edata.venue.slug}">{$edata.venue.name}</a></div>
							<div class="tickets margin-divider-half"><a href="/ticket/{$edata.id}">Buy Tickets</a></div>
						</div>
					</div>
				{/foreach}
			</div>
			<div id="team-divisions">
				<div class="row">
					<div class="col-md-6">
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/16425/baltimore-orioles">Baltimore Orioles</a></li>
									<li><a href="/performer/15532/boston-red-sox">Boston Red Sox</a></li>
									<li><a href="/performer/15533/new-york-yankees">New York Yankees</a></li>
									<li><a href="/performer/15534/tampa-bay-rays">Tampa Bay Rays</a></li>
									<li><a href="/performer/15535/toronto-blue-jays">Toronto Blue Jays</a></li>
								</ul>
							</nav>
							<h2>American League: East</h2>
						</div>
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/15536/chicago-white-sox">Chicago White Sox</a></li>
									<li><a href="/performer/15537/cleveland-indians">Cleveland Indians</a></li>
									<li><a href="/performer/15538/detroit-tigers">Detroit Tigers</a></li>
									<li><a href="/performer/15539/kansas-city-royals">Kansas City Royals</a></li>
									<li><a href="/performer/15540/minnesota-twins">Minnesota Twins</a></li>
								</ul>
							</nav>
							<h2>American League: Central</h2>
						</div>
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/15552/houston-astros">Houston Astros</a></li>
									<li><a href="/performer/15541/los-angeles-angels">Los Angeles Angels</a></li>
									<li><a href="/performer/15542/oakland-athletics">Oakland Athletics</a></li>
									<li><a href="/performer/15543/seattle-mariners">Seattle Mariners</a></li>
									<li><a href="/performer/15544/texas-rangers">Texas Rangers</a></li>
								</ul>
							</nav>
							<h2>American League: West</h2>
						</div>
					</div>
					<div class="col-md-6">
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/15545/atlanta-braves">Atlanta Braves</a></li>
									<li><a href="/performer/15546/miami-marlins">Miami Marlins</a></li>
									<li><a href="/performer/15547/new-york-mets">New York Mets</a></li>
									<li><a href="/performer/15548/philadelphia-phillies">Philadelphia Phillies</a></li>
									<li><a href="/performer/15549/washington-nationals">Washington Nationals</a></li>
								</ul>
							</nav>
							<h2>National League: East</h2>
						</div>
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/15550/chicago-cubs">Chicago Cubs</a></li>
									<li><a href="/performer/15551/cincinnati-reds">Cincinnati Reds</a></li>
									<li><a href="/performer/15553/milwaukee-brewers">Milwaukee Brewers</a></li>
									<li><a href="/performer/15554/pittsburgh-pirates">Pittsburgh Pirates</a></li>
									<li><a href="/performer/15555/st-louis-cardinals">St. Louis Cardinals</a></li>
								</ul>
							</nav>
							<h2>National League: Central</h2>
						</div>
						<div class="division-item">
							<nav role="navigation">
								<ul>
									<li><a href="/performer/15556/arizona-diamondbacks">Arizona Diamondbacks</a></li>
									<li><a href="/performer/15557/colorado-rockies">Colorado Rockies</a></li>
									<li><a href="/performer/15558/los-angeles-dodgers">Los Angeles Dodgers</a></li>
									<li><a href="/performer/15559/san-diego-padres">San Diego Padres</a></li>
									<li><a href="/performer/15560/san-francisco-giants">San Francisco Giants</a></li>
								</ul>
							</nav>
							<h2>National League: West</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<section id="home-why">
		<div class="container">
			<div class="row">
				<div class="col-md-4"><img src="/assets/img/icon-fans.png" alt="Fans" /></div>
				<div class="col-md-8">
					<h2>The GameHedge Story</h2>
					<p>We are fans like you.</p>
					<p>We invest our time, our passion and our cash supporting our teams. Sometimes things are amazing! Our favorite hitter launches a walk-off rocket to the upper deck; our QB throws a TD to the back of the end zone with 12 ticks left; or our rookie sharp-shooter hits a fade away 3 at the buzzer. Woo hoo!!</p>
					<p>But ... sometimes the team just doesn't return the love. You spend $400 on tix for the family, fight traffic for 3 hours and then ... well it's 6-0 in the fourth and your ace flame thrower heads to the showers with a tweaked hammie. If you're a true fan, you've been there.</p>
					<p>That's why we created GameHedge.</p>
					<p>When you bleed for your team ... GameHedge has a Band-Aid.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4"><img src="/assets/img/badge-gamehedge.png" alt="GameHedge" /></div>
				<div class="col-md-8"><a href="/faq">Still Have Questions?</a></div>
			</div>
		</div>
	</section>
</main>
{$footer}
