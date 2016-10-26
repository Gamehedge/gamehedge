class FaqController < ApplicationController
  def index
  	require 'date'
	@year = Date.today.strftime("%Y")
	@leagueList = Sport.where(active: true)
	@divisions_menu = Division.all
	@performers_menu = Performer.all
  end
end
