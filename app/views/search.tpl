{$header}
{$menu}
<main ng-controller="SearchCtrl">
	<div class="container">
		<h1>{$title}</h1>
		<div id="full-search">
			<form id="form-search" name="formSearch" novalidate>
				<div class="form-group">
					<label for="query" class="sr-only">Search Team, Venue or Location</label>
					<div class="input-group">
						<input type="text" id="query" name="query" ng-model="query" class="form-control" placeholder="Search Team, Venue or Location" ng-required="true" />
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" ng-click="search()"><i class="fa fa-search"></i></button>
						</span>
					</div>
				</div>
			</form>
		</div>
		<!--
		<div id="advanced-search" class="hidden">
			<form id="form-search" name="formSearch" class="form-inline" ng-submit="search();" novalidate>
				<div class="form-group">
					<label for="city">City</label><br />
					<input type="text" id="form-search-city" name="city" class="form-control" ng-model="city" ng-required="true" />
				</div>
				<div class="form-group">
					<label for="state">State</label><br />
					<select id="form-search-state" name="state" class="form-control" ng-model="state" ng-required="true">
						<option value="">Please Select a State</option>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
						<option value="AS">American Samoa</option>
						<option value="GU">Guam</option>
						<option value="MP">Northern Mariana Islands</option>
						<option value="PR">Puerto Rico</option>
						<option value="UM">United States Minor Outlying Islands</option>
						<option value="VI">Virgin Islands</option>
					</select>
				</div>
				<input type="submit" class="btn btn-default" value="Search" />
			</form>
		</div>
		-->
		<div ng-if="searching"><i class="fa fa-circle-o-notch fa-lg fa-spin"></i> Searching tickets for -!last_query!-...</div>
		<div ng-if="!searching && searched && num_events == 0">No tickets matched -!last_query!-. Please check your spelling or search for something else.</div>
		<div id="results" ng-if="!searching && searched && num_events > 0">
			<section id="games">
				<ul>
					<li class="clearfix" ng-repeat="e in events">
                        <a href="/ticket/-!e.id!-">
                            <div class="date col-md-2 col-xs-3">
                                <div class="month">-!e.occurs_at | date:'MMMM'!-</div>
                                <div class="day">-!e.occurs_at | date:'d'!-</div>
                                <div class="time">-!e.occurs_at | date:'EEE. hh:mm a':'+0000'!-</div>
                            </div>
                            <div class="event col-md-8 col-xs-9">
                                <div class="name" ng-bind-html="e.name"></div>
                                <div class="location">-!e.venue.name!- - -!e.venue.location!-</div>
                            </div>
                            <div class="tickets-link col-md-2 col-xs-12">
                                <!--<a href="/ticket/-!e.id!-" class="btn-green-gradient">from <span>-!e.low_price|currency!- <i class="fa fa-angle-right"></i></a>-->
                                <button style="text-transform:none" class="button green ">View Tickets <i class="fa fa-angle-right"></i></button>
                                <div class="text-center alert-text" ng-show="e.available_count < 20">NOT MANY LEFT</div>
                            </div>
                        </a>
					</li>
				</ul>
			</section>
		</div>
	</div>
</main>
{$footer}
