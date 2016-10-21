class LeagueController < ApplicationController
  def show
  	require 'date'
	@year = Date.today.strftime("%Y")
  	@league = Sport.find_by_id(params[:id])
  	@divisions = Division.where(sport_id: params[:id])
  	@performers = Performer.where(sport_id: params[:id])
  	@id = params[:id]
  	@leagueList = Sport.where(active: true)
	@divisions_menu = Division.all
	@performers_menu = Performer.all
  end
end
