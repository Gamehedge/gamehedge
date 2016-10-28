class VenueController < ApplicationController
  def show
  	require 'date'
	@year = Date.today.strftime("%Y")
  	@venue = Venue.where(te_uid: params[:id]).first
  	@leagueList = Sport.where(active: true)
	@divisions_menu = Division.all
	@performers_menu = Performer.all
	@id = @venue.id
  end
end
